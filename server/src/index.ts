import fs from 'fs';
import http from 'http';
import path from 'path';
import chalk from 'chalk';
import socketIo from 'socket.io';

const SERVER_PORT = 8000;

const httpServer = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(fs.readFileSync(path.join(__dirname,'index.html'), 'utf8'));
})

httpServer.listen(SERVER_PORT, () => {
  console.log(`The server is running on ${chalk.blueBright.underline(`http://localhost:${SERVER_PORT}`)}`)
})

const io = socketIo(httpServer)

io.on('connection', (socket) => {
  console.log(`[connection]: новое соединение '${socket.id}'`)

  socket.on('test', (data) => {
    console.log(`[test      ]: server got test sting '${data}'`)
    socket.emit('customEmit', 'server got test sting: ' + data)
  });

  socket.on('disconnect', () => {
    console.log(`[disconnect]: соединение закрыто '${socket.id}'`)
  });
});