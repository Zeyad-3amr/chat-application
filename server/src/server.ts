import mongoose from 'mongoose';
import * as http from 'http';
import app from './app';
import dotenv from 'dotenv';
import * as socketio from 'socket.io';

const port = 8000;

dotenv.config();

const mongoDB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const server: http.Server = http.createServer(app);

mongoose.connect(mongoDB).then(() => console.log('DB connection successfull !'));

// const io: socketio.Server = new socketio.Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log('USER Connected : ', socket.id);

//   socket.on('send_message', (data) => {
//     const message: string = data.message;
//     io.emit('receive_message', message);
//   });
// });

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
