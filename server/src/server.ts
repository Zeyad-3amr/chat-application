import mongoose from 'mongoose';
import * as http from 'http';
import app from './app';
import dotenv from 'dotenv';
import * as socketio from 'socket.io';
import Message from './model/Message';
import { sendMessage } from './controllers/messageController';
import { send } from 'process';

const port = 8000;

dotenv.config();

const mongoDB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const server: http.Server = http.createServer(app);

mongoose.connect(mongoDB).then(() => console.log('DB connection successfull !'));

const io: socketio.Server = new socketio.Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('USER Connected : ', socket.id);

  socket.on('send_message', (data) => {
    const message: string = data.message;
    console.log(message);

    socket.broadcast.emit('receive_message', data.message);
  });
});

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
