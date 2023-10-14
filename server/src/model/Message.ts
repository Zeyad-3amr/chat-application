import mongoose, { Schema } from 'mongoose';

interface IMessage {
  text: string;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
  text: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Message = mongoose.model('messages', messageSchema);
export default Message;
