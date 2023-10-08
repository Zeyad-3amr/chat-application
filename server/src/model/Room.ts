import mongoose, { Schema, SchemaType } from 'mongoose';

interface IRoom {
  users: string[];
  messages: string[];
}

const roomSchema = new Schema<IRoom>({
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
    },
  ],
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'messages',
    },
  ],
});

const Room = mongoose.model('room', roomSchema);

export default Room;
