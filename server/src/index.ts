import 'module-alias/register';
/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import http from 'http';

import { createApp } from '@/express';
import { createIo } from '@/sockets';

/** Express app with REST endpoints */
export const app = createApp();

/** http server */
export const server = http.createServer(app);

/** Socket.io server */
export const io = createIo(server);

const SERVER_PORT = 8000;

server.listen(SERVER_PORT, () => {
  /* eslint-disable no-console */
  console.log(`Running on ${chalk.blueBright.underline(`http://localhost:${SERVER_PORT}`)}`);
});
