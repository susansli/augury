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

export async function createSession(id: string, token: string) {
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

  console.log(response);

  //create a session
  const session = await createSession(response._id, response.googleId);
  //JSON.stringify(response);
  //console.log(response);

  //create access & refressh token
  const accessToken = signJwt(
    { ...response._id, session: session.token },
    { expiresIn: '15m' } // 15 minutes
  );
  const refreshToken = signJwt(
    { ...response._id, session: session.token },
    { expiresIn: '1y' } // 1 year
  );
  //set cookie
  res.cookie('accessToken', accessToken, accessCookieOptions);

  res.cookie('refreshToken', refreshToken, refreshCookieOptions);
  //redirect back to client
  res.redirect('http://localhost:4200');
  //res.redirect('http://localhost:3333/User');
}

export async function verifyGoogleOauth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('verifyGoogleOauth');

  const refreshToken = req.cookies.refreshToken;
  console.log('Refresh Token: ' + refreshToken);
  if (!refreshToken) {
    return res.status(401).send('No refresh token found'); // Handle the absence of token
  }

  try {
    // Verify and decode the JWT
    const verificationResult = verifyJwt(refreshToken);
    //const decoded = jwt.decode(refreshToken, { complete: true });

    // Ensure that verificationResult is an object with a decoded property
    if (typeof verificationResult === 'object' && verificationResult !== null) {
      const decodedResult = verificationResult as {
        valid: boolean;
        expired: boolean;
        decoded: JwtPayload;
      };

      // Check if decoded has session property
      if (decodedResult.decoded && decodedResult.decoded.session) {
        const token = decodedResult.decoded.session; // Access session

        console.log('Session:', token);

        const session: Session = await SessionModel.getSessionByToken(token);
        req.query.id = session.userId; // Attach session to the request
        console.log('UserId: ' + req.query.id);
        next(); // Pass control to the next middleware
      } else {
        return res.status(403).send('Session not found in refresh token');
      }
    } else {
      return res.status(403).send('Invalid token structure');
    }
  } catch (error) {
    console.error('Invalid refresh token:', error);
    res.status(403).send('Invalid refresh token'); // Handle invalid token
  }
}
