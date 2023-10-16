import { FC } from 'react';
import classes from './Sender.module.css';

export interface SenderProps {
  text: string;
}

export const Sender: FC<SenderProps> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.messageContainer}>
        <p className={classes.text}>{props.text}</p>
      </div>
    </div>
  );
};
