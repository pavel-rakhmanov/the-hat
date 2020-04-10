import fs from 'fs';
import bodyParser from 'body-parser';
import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import upload from 'express-fileupload';

import { RestEndpoints } from '@/enums';
import { UsersService } from '@/services';

export function createApp(): Express {
  const app = express();

  app.use(upload());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.get('/', (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8'));
  });

  app.post(`/${RestEndpoints.SignUp}`, (req, res) => {
    const { baseUser } = UsersService.addUser(req.body);

    res.status(200).send(baseUser);
  });

  app.get(`/${RestEndpoints.SignIn}?:userId`, (req, res) => {
    const { query } = req;

    if (!query.userId && typeof query.userId !== 'string') {
      res.status(400).send('\'userId\' query param was not passed');
    }

    const userId = query.userId as string;

    const baseUser = UsersService.getUser(userId)?.baseUser;

    if (!baseUser) {
      res.status(404).send(`User with id='${userId}' was not found`);
    }

    res.status(200).send(baseUser);
  });

  app.post(`/${RestEndpoints.UploadImage}`, (req, res) => {
    // @ts-ignore
    const image = req.files?.image;

    if (!image) return;

    // @ts-ignore
    const imagePath = `public/img/${image.name}`;

    // @ts-ignore
    photo.mv(path.join(__dirname, imagePath), (err) => {
      if (err) {
        res.status(500).send(`error: ${err}`);
      } else {
        res.status(200).send({
          imagePath,
        });
      }
    });
  });

  return app;
}
