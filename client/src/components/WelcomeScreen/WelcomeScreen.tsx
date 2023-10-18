import { FC } from 'react';
import classes from './WelcomeScreen.module.css';

import { RiChatSmileFill } from 'react-icons/ri';
export interface WelcomeScreenProps {}

export const WelcomeScreen: FC<WelcomeScreenProps> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>Welcom To Chatify </h1>
        <RiChatSmileFill size={40} />
      </div>
      <h2>Start Chatting with Your Friends</h2>
    </div>
  );
};
