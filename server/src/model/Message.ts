import mongoose, { Schema } from 'mongoose';

interface IMessage {
  text: string;
  user: mongoose.Schema.Types.ObjectId;
}

const messageSchema = new Schema<IMessage>({
  text: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
  },
});

const Message = mongoose.model('messages', messageSchema);
export default Message;
