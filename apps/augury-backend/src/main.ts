import 'dotenv/config';
import express from 'express';
import * as path from 'path';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

// Using Express built-in middleware to parse JSON body and URL encoded parameters available since 4.16
// https://expressjs.com/en/guide/using-middleware.html#middleware.built-in
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(compression());

// Bind assets folder to static path under "example.com/assets"
app.use('/assets', express.static(path.join(__dirname, 'assets')));

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

// Routing
import {router as userRouter} from './routes/UserRoutes';

app.use('/api/user', userRouter);
