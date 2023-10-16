import { FC } from 'react';
import classes from './ChatRoom.module.css';
import { Header } from './Header/Header';
import { Sender } from './Sender/Sender';

export interface ChatRoomProps {}

export const ChatRoom: FC<ChatRoomProps> = (props) => {
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.chatBody}>
        <Sender text={'Hello'} />
        <Sender text={'Bye'} />
        <Sender text={'easy'} />
        <Sender text={'easy'} />
        <Sender text={'easy'} />
        <Sender text={'easy'} />
        <Sender text={'easy'} />
        <Sender text={'easy'} />
        <Sender text={'easy'} />
        <Sender text={'easy'} />
        <Sender text={'easy'} />
        <Sender text={'easy'} />
        <Sender text={'easy'} />
        <Sender text={'easy'} />
        <Sender text={'easy'} />
      </div>
    </div>
  );
};
