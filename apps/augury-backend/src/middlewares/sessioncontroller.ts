import { FilterQuery, ObjectId, QueryOptions, UpdateQuery } from 'mongoose';
import UserSchema from '../config/schemas/User';
import User from '../config/interfaces/User';
import { CookieOptions, Request, Response } from 'express';
import axios from 'axios';
import qs from 'querystring';
import ApiError from '../errors/ApiError';
import ClientError from '../errors/ClientError';
import jwt from 'jsonwebtoken';
import SessionSchema from '../config/schemas/Session';

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

export async function findAndUpdateUser(
  query: FilterQuery<User>,
  update: UpdateQuery<User>,
  options: QueryOptions = {}
) {
  return UserSchema.findOneAndUpdate(query, update, options);
}

export async function createSession(userId: any, userAgent: string) {
  const session = await SessionSchema.create({ user: userId, userAgent });

  return session.toJSON();
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
  //upsert the user
  const user = await findAndUpdateUser(
    {
      email: googleUser.email,
    },
    {
      email: googleUser.email,
      password: googleUser.id,
      firstName: googleUser.given_name,
      lastName: googleUser.family_name,
    },
    {
      upsert: true,
      new: true,
    }
  );
  console.log(user);
  //create a session

  //create access & refressh token

  //set cookie

  //redirect back to client
}
