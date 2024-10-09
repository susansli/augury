import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import mongoose from 'mongoose';
import compression from 'compression';
import customErrorHandler from './middlewares/CustomErrorHandler';
import googleOauthHandler from './middlewares/GoogleOAuthHandler';
// Security middleware
import helmet from 'helmet';
import cors from 'cors';
import userRouter from './routes/UserRoutes';
import asyncErrorHandler from './middlewares/AsyncErrorHandler';
import { CLIENT_URL, SERVER_PORT } from './config/constants';

const app = express();

// Using Express built-in middleware to parse JSON body and URL encoded parameters available since 4.16
// https://expressjs.com/en/guide/using-middleware.html#middleware.built-in
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: CLIENT_URL, // Frontend URL
    credentials: true, // Allows cookies to be sent with the requests
  })
);
app.use(helmet());
app.use(compression());
app.use(cookieParser());
// Bind assets folder to static path under "example.com/assets"
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Application routers that register handlers
app.use('/', userRouter);

// API Routes
app.get('/google/callback', asyncErrorHandler(googleOauthHandler)); // Google Callback route that is used after OAuth redirect
app.get('/ping', (req, res) => {
  res.send({ message: '[augury-backend] Pong!' });
});

const server = app.listen(SERVER_PORT, () => {
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

  console.log(`Listening at http://localhost:${SERVER_PORT}/api`);
});
server.on('error', console.error);

app.use(customErrorHandler);
