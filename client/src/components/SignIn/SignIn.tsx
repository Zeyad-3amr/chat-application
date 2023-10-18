import { FC } from 'react';
import classes from './SignIn.module.css';
import { Link } from 'react-router-dom';

export interface SignInProps {}

export const SignIn: FC<SignInProps> = (props) => {
  return (
    <div className={classes.container}>
      <h1>Login to Chatify</h1>
      <div className={classes.inputs}>
        <input className={classes.email} type="email" placeholder="email" />
        <input className={classes.password} type="password" placeholder="password" />
      </div>
      <div className={classes.buttons}>
        {/* <button className={classes.signup}>Sign up</button> */}
        <button className={classes.Login}>Login</button>
      </div>
      <p>
        Don't have account{' '}
        <Link to="/signup" className={classes.link}>
          {' '}
          Sign up ?
        </Link>{' '}
      </p>
    </div>
  );
};
