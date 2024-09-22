/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'dotenv/config';
import express from 'express';
import * as path from 'path';
import mongoose from 'mongoose';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to augury-backend!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(`${process.env.MONGO_URL}`)
    .catch(() =>
      console.error("Please configure your environment's MONGO_URL!")
    );

  const db = mongoose.connection;
  db.on('error', () =>
    console.error('Could not connect to Mongo - restart the server.')
  );
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
