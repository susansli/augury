import User from '../config/interfaces/User';
import { CookieOptions, Request, Response } from 'express';
import axios from 'axios';
import qs from 'querystring';
import ApiError from '../errors/ApiError';
//import jwt from 'jsonwebtoken';
import SessionSchema from '../config/schemas/Session';
import UserModel from '../models/auth/UserModel';
import SessionModel from '../models/auth/SessionModel';
import Session from '../config/interfaces/Session';
import mongoose from 'mongoose';

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

export async function createSession(id: string, userAgent: string) {
  const userId = new mongoose.Types.ObjectId(id);
  const session: Session = {
    userId: userId,
    token: userAgent,
  };

  const response = await SessionModel.createSession(session);

  return JSON.stringify(response);
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

  let response: User;
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

  //create access & refressh token

  //set cookie

  //redirect back to client
}
