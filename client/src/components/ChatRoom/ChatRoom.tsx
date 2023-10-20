import { FC, useEffect, useState } from 'react';
import classes from './ChatRoom.module.css';
import { Header } from './Header/Header';
import { Message } from './Message/Message';
import { TypeField } from './TypeField/TypeField';
import io from 'socket.io-client';
import instance from '../../instance';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserIdStore } from '../../store/userStorage';

export interface ChatRoomProps {}

const socket = io('http://localhost:8000');

interface IMessage {
  text: string;
  from: string;
  to: string;
  createdAt: string;
}
interface IMessages {
  messages: IMessage[];
}

export const ChatRoom: FC<ChatRoomProps> = () => {
  const { to } = useParams();
  const [message, setMessage] = useState('');
  const from = useUserIdStore((state) => state.userProfile._id);

  const [messagesArray, setMessagesArray] = useState<IMessage[]>([]);

  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    const roomHandler = async () => {
      const res = await instance.get(`/room/roomCheck/${to}`);
      setRoomId(res.data.room._id);
      const messages = res.data.room.messages;
      setMessagesArray(messages);

      socket.emit('join_room', res.data.room._id);
    };

    roomHandler();
  }, [to]);

  useEffect(() => {
    socket.on('receive_message', (data: IMessage) => {
      console.log(data);
      setMessagesArray((prev: any) => [...prev, { text: data.text, from: data.from }]);
    });
  }, [socket]);

  const sendMessageHandler = () => {
    if (message === '') return;

    socket.emit('send_message', { text: message, roomId, from, to });

    setMessagesArray((prev: any) => [...prev, { text: message, from }]);
  };

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.chatBody}>
        {messagesArray?.map((el: IMessage) => (
          <>
            {el.from !== from ? (
              <Message text={el.text} messageType={false} />
            ) : (
              <Message text={el.text} messageType={true} />
            )}
          </>
        ))}
      </div>

      <TypeField
        setMessage={setMessage}
        message={message}
        sendMessageHandler={sendMessageHandler}
      />
    </div>
  );
};
