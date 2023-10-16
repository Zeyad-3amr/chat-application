import { FC } from 'react';
import classes from './ChatRoom.module.css';
import { Header } from './Header/Header';
import { Message } from './Message/Message';

export interface ChatRoomProps {}

export const ChatRoom: FC<ChatRoomProps> = (props) => {
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.chatBody}>
        <Message text={'Hello'} messageType={true} />
        <Message text={'Bye'} messageType={false} />
        <Message text={'Hello'} messageType={true} />
        <Message text={'Bye'} messageType={false} />
        <Message text={'Hello'} messageType={true} />
        <Message text={'Bye'} messageType={false} />
        <Message text={'Hello'} messageType={true} />
        <Message text={'Bye'} messageType={false} />
        <Message text={'Hello'} messageType={true} />
        <Message text={'Bye'} messageType={false} />
        <Message text={'Bye'} messageType={false} />
        <Message text={'Bye'} messageType={false} />
      </div>
    </div>
  );
};
