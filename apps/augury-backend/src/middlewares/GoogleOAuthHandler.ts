import { CookieOptions, Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import qs from 'querystring';
import jwt from '../config/utils/jwt';
import ApiError from '../errors/ApiError';
import User from '../config/interfaces/User';
import UserModel from '../models/auth/UserModel';
import SessionController from '../controllers/auth/SessionController';
import ClientError from '../errors/ClientError';
import StatusCode from '../config/enums/StatusCode';
import Severity from '../config/enums/Severity';
import { CLIENT_URL, SERVER_URL } from '../config/constants';

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

/**
 * Request handler that is called once Google OAuth login flow has completed and
 * been redirected to the backend.
 * @param req Request with query string code
 * @param res Response is redirected back to front-end landing
 */
async function googleOauthHandler(req: Request, res: Response) {
  if (typeof req?.query?.code !== 'string') {
    throw new ClientError(
      'Invalid code provided with OAuth query!',
      StatusCode.BAD_REQUEST
    );
  }
  const code = req.query.code;
  const { id_token, access_token } = await getGoogleOAuthTokens(code);
  // console.log({ id_token, access_token });

  // Get Google & user data from tokens
  const googleUser = await getGoogleUser(id_token, access_token);
  // console.log(googleUser);
  const { newUser, data: user } = await getOrCreateUserByGoogleId(googleUser);
  console.log(user);

  // Get/Create a session
  const session = await SessionController.getCurrentSession(
    user._id,
    user.googleId
  );

  //create access & refressh token
  const accessToken = jwt.signJwt(
    { ...user._id, session: session.token },
    { expiresIn: '15m' } // 15 minutes
  );
  const refreshToken = jwt.signJwt(
    { ...user._id, session: session.token },
    { expiresIn: '1y' } // 1 year
  );
  //set cookie
  res.cookie('accessToken', accessToken, accessCookieOptions);
  res.cookie('refreshToken', refreshToken, refreshCookieOptions);

  //redirect back to client
  const url = CLIENT_URL + (newUser ? `/onboarding?id=${user._id.toString()}` : `/portfolio?id=${user._id.toString()}`);
  // const url = `${
  //   process.env.FRONTEND_URL || 'http://localhost'
  // }:${clientPort}/Test.html`;
  // const serverPort = process.env.SERVER_PORT || 3333;
  // const url = `${
  //   process.env.BACKEND_URL || 'http://localhost'
  // }:${serverPort}/User`;
  res.redirect(url);
}

/**
 * Retrieves the two Google OAuth tokens from the OAuth service based on the code
 * from the login flow.
 * @param code from OAuth login flow
 * @returns OAuth token information
 * @throws ApiError if there was an Axios or unknown error.
 */
async function getGoogleOAuthTokens(code: string): Promise<GoogleTokensResult> {
  const url = 'https://oauth2.googleapis.com/token';

  const values = {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: `${SERVER_URL}/google/callback`,
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

/**
 * Retrieves a Google User based on the provided tokens.
 * @param googleUser Data from Google OAuth response
 * @returns Minimalistic data about the Google Account (e.g. firstname, email)
 * @throws ApiError if there was an Axios or unknown error.
 */
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

/**
 * Retrieves a `User` doc for a Google User. If it is a new User, the account
 * will be automatically created in the database.
 * @param googleUser Data from Google OAuth response
 * @returns `User` document
 * @throws ApiError if there was an Axios or unknown error.
 */
async function getOrCreateUserByGoogleId(googleUser: GoogleUserResult) {
  try {
    const response = await UserModel.getUserByGoogleId(googleUser.id);
    return {
      newUser: false,
      data: response,
    };
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
      return {
        newUser: true,
        data: response,
      };
    } else {
      throwDetailedAxiosError(error);
    }
  }
}

/**
 * A simple function to throw a more detailed error message based on it's response.
 * @param error Error that was orginally thrown
 * @throws ApiError
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

export default googleOauthHandler;
