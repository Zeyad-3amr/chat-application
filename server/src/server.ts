import mongoose from 'mongoose';
import * as http from 'http';
import app from './app';
import dotenv from 'dotenv';
import * as socketio from 'socket.io';

import Room from './model/Room';

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

let users = new Set();

io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    socket.join(data);
  });

  socket.on('online', async (data) => {
    users.add(data);
    io.emit('online_users', [...users]);
  });

  socket.on('logout', async (data) => {
    users.delete(data);
    io.emit('offline', [...users]);
  });

  socket.on('send_message', async (data) => {
    socket.to(data.roomId).emit('receive_message', data);

    console.log(data);

    await Room.findByIdAndUpdate(data.roomId, {
      $push: {
        messages: {
          text: data.text,
          from: data.from,
          to: data.to,
          createdAt: data.createdAt,
        },
      },
    });
  });
});

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
