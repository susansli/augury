import { CookieOptions, Request, Response, NextFunction } from 'express';
import axios from 'axios';
import qs from 'querystring';
import ApiError from '../errors/ApiError';
import User from '../config/interfaces/User';
import UserModel from '../models/auth/UserModel';
import Session from '../config/interfaces/Session';
import SessionModel from '../models/auth/SessionModel';
import mongoose from 'mongoose';
import { signJwt, verifyJwt } from '../config/utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import StatusCode from '../config/enums/StatusCode';
import Severity from '../config/enums/Severity';

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

interface GoogleTokensResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export async function getGoogleOAuthTokens({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> {
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
  } catch (error: any) {
    console.error(error.response.data.error);
    throw new Error(error.message);
  }
}

export async function getGoogleUser({ id_token, access_token }) {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getUser(googleUser: any) {
  let response;
  try {
    response = await UserModel.getUserByGoogleId(googleUser.id);
  } catch (error: any) {
    if (error instanceof ApiError) {
      const user: User = {
        email: googleUser.email,
        googleId: googleUser.id,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        balance: 0,
      };
      response = await UserModel.createUser(user);
    } else {
      throw error;
    }
  }

  return response;
}

export async function getSession(id: string, token: string) {
  const userId = new mongoose.Types.ObjectId(id);
  const session: Session = {
    userId: userId,
    token: token,
  };

  let response;
  try {
    response = await SessionModel.updateSession(session);
    console.log('Updating session...\n' + session);
  } catch (error: any) {
    if (error instanceof ApiError) {
      const session: Session = {
        userId: userId,
        token: token,
      };
      response = await SessionModel.createSession(session);
      console.log('Creating session...\n' + session);
    } else {
      throw error;
    }
  }

  return response;
}

export async function googleOauthHandler(req: Request, res: Response) {
  //get code from query string
  const code = req.query.code as string;
  const { id_token, access_token } = await getGoogleOAuthTokens({ code });
  console.log({ id_token, access_token });
  //get the id and access token

  //get user with tokens
  const googleUser = await getGoogleUser({ id_token, access_token });
  console.log(googleUser);

  const user = await getUser(googleUser);
  console.log(user);

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

export async function verifyGoogleOauth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('req.cookies: ' + JSON.stringify(req.cookies));
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    throw new ApiError(
      'No access token found.',
      StatusCode.UNAUTHORIZED,
      Severity.MED
    );
  }

  let verificationResult: any;

  try {
    // Verify and decode the JWT
    verificationResult = verifyJwt(accessToken);
  } catch (error) {
    throw new ApiError(
      'Invalid token structure.',
      StatusCode.FORBIDDEN,
      Severity.MED
    );
  }

  if (
    typeof verificationResult != 'object' ||
    verificationResult == null ||
    typeof verificationResult.decoded === 'string' ||
    !verificationResult.decoded?.session
  ) {
    throw new ApiError(
      'Invalid token structure.',
      StatusCode.FORBIDDEN,
      Severity.MED
    );
  }

  const token = (verificationResult.decoded as JwtPayload).session;

  const session: Session = await SessionModel.getSessionByToken(token);
  req.user = await UserModel.getUser(session.userId);
  console.log('req.user: ' + JSON.stringify(req.user));
  next(); // Pass control to the next middleware
}