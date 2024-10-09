import { CookieOptions, Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import qs from 'querystring';
import { signJwt } from '../config/utils/jwt';
import ApiError from '../errors/ApiError';
import User from '../config/interfaces/User';
import UserModel from '../models/auth/UserModel';
import { getSession } from '../controllers/auth/SessionController';
import ClientError from '../errors/ClientError';
import StatusCode from '../config/enums/StatusCode';
import Severity from '../config/enums/Severity';

interface GoogleTokensResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

const accessCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: 'localhost',
  path: '/',
  sameSite: 'lax',
  secure: false,
};

const refreshCookieOptions: CookieOptions = {
  ...accessCookieOptions,
  maxAge: 3.154e10, // 1 year
};

export async function googleOauthHandler(req: Request, res: Response) {
  if (typeof req?.query?.code !== 'string') {
    throw new ClientError(
      'Invalid code provided with OAuth query!',
      StatusCode.BAD_REQUEST
    );
  }
  //get code from query string
  const code = req.query.code;
  const { id_token, access_token } = await getGoogleOAuthTokens(code);
  // console.log({ id_token, access_token });
  //get the id and access token

  //get user with tokens
  const googleUser = await getGoogleUser(id_token, access_token);
  // console.log(googleUser);
  const user = await getUserByGoogleId(googleUser);
  // console.log(user);

  //create a session
  const session = await getSession(user._id, user.googleId);

  //create access & refressh token
  const accessToken = signJwt(
    { ...user._id, session: session.token },
    { expiresIn: '15m' } // 15 minutes
  );
  const refreshToken = signJwt(
    { ...user._id, session: session.token },
    { expiresIn: '1y' } // 1 year
  );
  //set cookie
  res.cookie('accessToken', accessToken, accessCookieOptions);
  res.cookie('refreshToken', refreshToken, refreshCookieOptions);

  //redirect back to client
  const clientPort = process.env.CLIENT_PORT || 4200;
  const url = `${process.env.FRONTEND_URL || 'http://localhost'}:${clientPort}`;
  // const url = `${
  //   process.env.FRONTEND_URL || 'http://localhost'
  // }:${clientPort}/Test.html`;
  // const serverPort = process.env.SERVER_PORT || 3333;
  // const url = `${
  //   process.env.BACKEND_URL || 'http://localhost'
  // }:${serverPort}/User`;
  res.redirect(url);
}

async function getGoogleOAuthTokens(code: string): Promise<GoogleTokensResult> {
  const url = 'https://oauth2.googleapis.com/token';

  const values = {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: 'http://localhost:3333/google/callback',
    grant_type: 'authorization_code',
  };

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return res.data;
  } catch (error: unknown) {
    throwDetailedAxiosError(error);
  }
}

async function getGoogleUser(
  id_token: string,
  access_token: string
): Promise<GoogleUserResult> {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error: unknown) {
    throwDetailedAxiosError(error);
  }
}

async function getUserByGoogleId(googleUser: GoogleUserResult) {
  try {
    const response = await UserModel.getUserByGoogleId(googleUser.id);
    return response;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      // Create the user on our end.
      const user: User = {
        email: googleUser.email,
        googleId: googleUser.id,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        balance: 0,
      };
      const response = await UserModel.createUser(user);
      return response;
    } else {
      throwDetailedAxiosError(error);
    }
  }
}

/**
 * A simple function to throw a more detailed error message based on it's response.
 * @param error Error that was orginally thrown
 */
function throwDetailedAxiosError(error: unknown) {
  if (error instanceof AxiosError) {
    throw new ApiError(error.message, StatusCode.INTERNAL_ERROR, Severity.LOW);
  } else {
    throw new ApiError(
      `Unknown error occurred! ${JSON.stringify(error)}`,
      StatusCode.INTERNAL_ERROR,
      Severity.HIGH
    );
  }
}
