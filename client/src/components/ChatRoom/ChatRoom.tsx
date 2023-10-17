import { FC, useEffect, useState } from 'react';
import classes from './ChatRoom.module.css';
import { Header } from './Header/Header';
import { Message } from './Message/Message';
import { TypeField } from './TypeField/TypeField';
import io from 'socket.io-client';

export interface ChatRoomProps {}

const socket = io('http://localhost:8000');

export const ChatRoom: FC<ChatRoomProps> = () => {
  const [message, setMessage] = useState('');
  const [messagesArray, setMessagesArray] = useState<
    { message: string; type: boolean }[]
  >([]);

  // const [messageType,setMessageType]

  const sendMessageHandler = () => {
    if (message === '') return;

    socket.emit('send_message', { message });
    setMessagesArray((prev) => [...prev, { message, type: true }]);
    console.log(message);
  };

  useEffect(() => {
    socket.on('receive_message', (data: string) => {
      console.log(data);
      setMessagesArray((prev) => [...prev, { message: data, type: false }]);
    });
  }, [socket]);

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
