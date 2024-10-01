/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import mongoose from 'mongoose';
import compression from 'compression';
import { errorController } from './middlewares/errorController';
import {
  googleOauthHandler,
  verifyGoogleOauth,
} from './middlewares/sessioncontroller';
// Security middleware
import helmet from 'helmet';
import cors from 'cors';
import { userRouter } from './routes/UserRoutes';

const app = express();

// Using Express built-in middleware to parse JSON body and URL encoded parameters available since 4.16
// https://expressjs.com/en/guide/using-middleware.html#middleware.built-in
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    //TODO: update with production domain
    origin: 'http://localhost:4200', // Frontend URL
    credentials: true, // Allows cookies to be sent with the requests
  })
);
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(verifyGoogleOauth);
// Bind assets folder to static path under "example.com/assets"
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/', userRouter);

// API Routes
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to augury-backend!' });
});
app.get('/google/callback', googleOauthHandler);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(`${process.env.MONGO_URL}`).catch(() => {
    console.error(
      "Initial Connection Failed - Ensure you've configured your environment's MONGO_URL!"
    );
  });

  const db = mongoose.connection;
  db.on('error', () => {
    console.error('Could not connect to Mongo - restart the server.');
  });
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

app.use(errorController);
