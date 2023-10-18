import { FC } from 'react';
import classes from './SignUp.module.css';
import { RiChatSmileFill } from 'react-icons/ri';

export interface SignUpProps {}

export const SignUp: FC<SignUpProps> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1> Chatify </h1>

        <RiChatSmileFill size={50} />
      </div>
      <div className={classes.inputs}>
        <input className={classes.email} type="text" placeholder="name" />
        <input className={classes.email} type="email" placeholder="email" />
        <input className={classes.password} type="password" placeholder="password" />
        <input
          className={classes.password}
          type="password"
          placeholder="confirm password"
        />
      </div>
      <div className={classes.buttons}>
        <button className={classes.signup}>Sign up</button>
      </div>
    </div>
  );
};
