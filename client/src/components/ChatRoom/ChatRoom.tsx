import { FC, useEffect, useState } from 'react';
import classes from './ChatRoom.module.css';
import { Header } from './Header/Header';
import { Message } from './Message/Message';
import { TypeField } from './TypeField/TypeField';
import io from 'socket.io-client';
import instance from '../../instance';
import { useParams } from 'react-router-dom';
import { useUserIdStore } from '../../store/userStorage';
import { LinearProgress } from '@mui/material';

export interface ChatRoomProps {}

const socket = io('http://localhost:8000');

interface IMessage {
  text: string;
  from: string;
  to: string;
  createdAt: string;
}

export const ChatRoom: FC<ChatRoomProps> = () => {
  const { receiverId } = useParams();
  const [message, setMessage] = useState('');
  const from = useUserIdStore((state) => state.userProfile._id);
  const [isLoading, setIsLoading] = useState(true);
  const [receiver, setReceiver] = useState<string>('');
  const [messagesArray, setMessagesArray] = useState<IMessage[]>([]);
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    const roomHandler = async () => {
      setIsLoading(true);
      const res = await instance.get(`/room/roomCheck/${receiverId}`);
      setRoomId(res.data.room._id);

      setMessagesArray(res.data.room.messages);

      const [_id] = res.data.room.users.filter((el: any) => el._id === receiverId);

      setReceiver(_id.name);
      socket.emit('join_room', res.data.room._id);
      setIsLoading(false);
    };

    roomHandler();
  }, [receiverId]);

  useEffect(() => {
    socket.on('receive_message', (data: IMessage) => {
      console.log(data);
      setMessagesArray((prev: any) => [...prev, { text: data.text, from: data.from }]);
    });
  }, [socket]);

  const sendMessageHandler = () => {
    if (message === '') return;

    socket.emit('send_message', { text: message, roomId, from, to: receiverId });

    setMessagesArray((prev: any) => [...prev, { text: message, from }]);
    setMessage('');
  };

  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes.loading}>
          <h1>Loading...</h1>
          <LinearProgress color="inherit" />
        </div>
      ) : (
        <>
          <Header key={receiverId} name={receiver} id={receiverId as string} />

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
        </>
      )}
    </div>
  );
};
