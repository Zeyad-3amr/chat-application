import { FC, useEffect, useState } from 'react';
import classes from './ChatRoom.module.css';
import { Header } from './Header/Header';
import { Message } from './Message/Message';
import { TypeField } from './TypeField/TypeField';
import io from 'socket.io-client';
import instance from '../../instance';
import { useParams } from 'react-router-dom';
import { useUserIdStore } from '../../store/userStorage';

export interface ChatRoomProps {}

const socket = io('http://localhost:8000');

export const ChatRoom: FC<ChatRoomProps> = () => {
  const { to } = useParams();
  const [message, setMessage] = useState('');
  const from = useUserIdStore((state) => state.userProfile._id);

  console.log(from);

  const [messagesArray, setMessagesArray] = useState<
    { message: string; type: boolean }[]
  >([]);

  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    const roomHandler = async () => {
      const res = await instance.get(`/room/roomCheck/${to}`);
      console.log(res.data.room);
      setRoomId(res.data.room._id);

      socket.emit('join_room', res.data.room._id);
    };

    roomHandler();
  }, [to]);

  useEffect(() => {
    socket.on('receive_message', (data: string) => {
      console.log(data);
      setMessagesArray((prev) => [...prev, { message: data, type: false }]);
    });
  }, [socket]);

  const sendMessageHandler = () => {
    if (message === '') return;

    socket.emit('send_message', { message, roomId });

    setMessagesArray((prev) => [...prev, { message, type: true }]);
    console.log(message);
  };

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.chatBody}>
        {messagesArray.map((el) => (
          <Message text={el.message} messageType={el.type} />
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
