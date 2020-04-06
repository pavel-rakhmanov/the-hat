import fs from 'fs';
import http from 'http';
import path from 'path';
import chalk from 'chalk';
import { Server as WebSocketServer} from 'ws';

import { uuid } from './utils';

const SERVER_PORT = 8000;
const INDEX_PAGE = fs.readFileSync(path.join(__dirname,'index.html'), 'utf8');

const httpServer = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(INDEX_PAGE);
})

httpServer.listen(SERVER_PORT, () => {
  console.log(`The server is running on ${chalk.blueBright.underline(`http://localhost:${SERVER_PORT}`)}`)
})

const webSocketServer = new WebSocketServer({
  server: httpServer,
});

webSocketServer.on('connection', (ws)  => {
  const connectionId = uuid();

  ws.on('open', () => {
    console.log(`[open]: соединение открыто '${connectionId}'`)
  });

  ws.on('message', (message) => {
    console.log(`[message]: получено сообщение '${message}'`);
    ws.send(message);
  })

  ws.on('close', () => {
    console.log(`[close]: соединение закрыто '${connectionId}'`)
  })
})
