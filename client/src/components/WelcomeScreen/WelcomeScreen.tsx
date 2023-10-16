import { FC } from 'react';
import classes from './WelcomeScreen.module.css';

export interface WelcomeScreenProps {}

export const WelcomeScreen: FC<WelcomeScreenProps> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.page}>
        <h1>Start Chatting with Your Friends</h1>
      </div>
    </div>
  );
};
