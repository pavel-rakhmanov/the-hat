import fs from 'fs';
import bodyParser from 'body-parser';
import path from 'path';
import express, { Express, RequestHandler } from 'express';
import cors from 'cors';
import upload from 'express-fileupload';

import { RestEndpoints } from '@/enums';
import { UsersService, RandomUserService, RandomWordService, RoomsService } from '@/services';

const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/dist');
const CLIENT_INDEX_PAGE = fs.readFileSync(path.join(CLIENT_BUILD_PATH, 'index.html'), 'utf8');

export function createApp(): Express {
  const app = express();

  app.use(upload());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('', express.static(CLIENT_BUILD_PATH));
  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.get('/', (req, res) => { res.send(CLIENT_INDEX_PAGE); });
  app.get(`/${RestEndpoints.SignIn}?:userId`, handlers[RestEndpoints.SignIn]);
  app.get(`/${RestEndpoints.GenerateRandomUser}`, handlers[RestEndpoints.GenerateRandomUser]);
  app.get(`/${RestEndpoints.GenerateRandomWords}?:count`, handlers[RestEndpoints.GenerateRandomWords]);

  app.post(`/${RestEndpoints.SignUp}`, handlers[RestEndpoints.SignUp]);
  app.post(`/${RestEndpoints.UploadImage}`, handlers[RestEndpoints.UploadImage]);
  app.post(`/${RestEndpoints.EnterRoom}`, handlers[RestEndpoints.EnterRoom]);
  app.post(`/${RestEndpoints.LeaveRoom}`, handlers[RestEndpoints.LeaveRoom]);

  return app;
}

const handlers: {[key in RestEndpoints]: RequestHandler } = {
  [RestEndpoints.SignUp]: (req, res) => {
    const { baseUser } = UsersService.addUser(req.body);

    res.status(200).send(baseUser);
  },
  [RestEndpoints.SignIn]: (req, res) => {
    const { query } = req;

    if (!query.userId && typeof query.userId !== 'string') {
      res.status(400).send('Correct \'userId\' query param was not passed');
      return;
    }

    const userId = query.userId as string;

    const baseUser = UsersService.getUser(userId)?.baseUser;

    if (!baseUser) {
      res.status(404).send(`User with id='${userId}' was not found`);
      return;
    }

    res.status(200).send(baseUser);
  },
  [RestEndpoints.UploadImage]: (req, res) => {
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
        res.status(200).send({ imagePath });
      }
    });
  },
  [RestEndpoints.GenerateRandomUser]: async (req, res) => {
    const randomUser = await RandomUserService.getRandomUser();

    res.status(200).send(randomUser);
  },
  [RestEndpoints.GenerateRandomWords]: async (req, res) => {
    const { query } = req;

    if (!query.count && typeof query.count !== 'number') {
      res.status(400).send('Correct \'count\' query param was not passed');
      return;
    }

    const count = query.count as number;
    const words = await RandomWordService.getRandomWords(count);

    res.status(200).send(words);
  },
  [RestEndpoints.EnterRoom]: (req, res) => {
    const { body } = req;

    if (!body.userId && typeof body.userId !== 'string') {
      res.status(400).send('Correct \'userId\' body param was not passed');
      return;
    }

    const userId = body.userId as string;

    if (!body.roomId && typeof body.roomId !== 'string') {
      res.status(400).send('Correct \'roomId\' body param was not passed');
      return;
    }

    const roomId = body.roomId as string;

    if (body.roomPassword && typeof body.roomId !== 'string') {
      res.status(400).send('Correct \'roomPassword\' body param was not passed');
      return;
    }

    const roomPassword = body.roomPassword as string || null;

    try {
      RoomsService.addRoomUser(roomId, userId, roomPassword);
      res.status(200).send();
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
  [RestEndpoints.LeaveRoom]: (req, res) => {
    const { body } = req;

    if (!body.userId && typeof body.userId !== 'string') {
      res.status(400).send('Correct \'userId\' body param was not passed');
      return;
    }

    const userId = body.userId as string;

    if (!body.roomId && typeof body.roomId !== 'string') {
      res.status(400).send('Correct \'roomId\' body param was not passed');
      return;
    }

    const roomId = body.roomId as string;

    try {
      RoomsService.removeRoomUser(roomId, userId);
      res.status(200);
    } catch(e) {
      res.status(500).send(e);
    }
  },
};
