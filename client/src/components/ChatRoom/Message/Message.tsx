import { FC } from 'react';
import classes from './Message.module.css';

export interface MessageProps {
  text: string;
  messageType: boolean;
}

export const Message: FC<MessageProps> = ({ text, messageType }) => {
  return (
    <div className={messageType ? classes.containerSender : classes.containerReceiver}>
      <div className={messageType ? classes.messageSender : classes.messageReceiver}>
        <p className={classes.text}>{text}</p>
      </div>
    </div>
  );
};
