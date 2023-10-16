import { FC } from 'react';
import classes from './ChatRoom.module.css';
import { Header } from './Header/Header';
import { Message } from './Message/Message';
import { TypeField } from './TypeField/TypeField';

export interface ChatRoomProps {}

export const ChatRoom: FC<ChatRoomProps> = () => {
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.chatBody}>
        <Message text={'Hello'} messageType={true} />
        <Message text={'Bye'} messageType={false} />
        <Message text={'Hello'} messageType={true} />

        <Message
          text={'oppenhimer is going to be a good movie  bal balaas '}
          messageType={false}
        />
        <Message text={'Bye'} messageType={false} />
        <Message text={'Are you going to watch oppenhimer'} messageType={true} />
        <Message text={'No iam going to watch barbie'} messageType={false} />

        <Message text={'Very bad decision'} messageType={true} />
        <Message text={'Please come with me to oppenhimer'} messageType={true} />
        <Message text={'Okay i will'} messageType={false} />
      </div>
      <TypeField />
    </div>
  );
};
