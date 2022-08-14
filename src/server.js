import express from 'express';
import logger from 'morgan';
import { Server } from 'socket.io';
import socketController from './socket-controller.js';
import events from './events.js';

const PORT = 4000;

const app = express();

app.use(logger('dev'));
app.use(express.static('static'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home', { events: JSON.stringify(events) });
});

const server = app.listen(PORT, () =>
  console.log(`✅ Listening on port: ${PORT}`)
);

const io = new Server(server);

io.on('connection', socket => socketController(socket, io));
