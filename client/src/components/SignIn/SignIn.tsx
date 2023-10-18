import { FC, useState } from 'react';
import classes from './SignIn.module.css';
import { Link } from 'react-router-dom';
import { RiChatSmileFill } from 'react-icons/ri';
import instance from '../../instance';
// import { typographyClasses } from '@mui/material';
export interface SignInProps {}

export const SignIn: FC<SignInProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const data = { email: '', password: '' };

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setEmail(e.currentTarget.value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setPassword(e.currentTarget.value);
  };

  const signInHandler = async () => {
    if (!email || !password) {
      setIsError(true);
      setErrorMsg('Please provide email or password !');
      return;
    }
    data.email = email;
    data.password = password;
    const res = await instance.post('/user/login', data);
    const { user } = res.data.data;
    console.log(user);
    // console.log(data);
    //   try {
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1> Welcome To Chatify </h1>
        <RiChatSmileFill size={50} />
      </div>

      <div className={classes.inputs}>
        <input
          className={classes.email}
          type="email"
          placeholder="email"
          onChange={emailHandler}
        />
        <input
          className={classes.password}
          type="password"
          placeholder="password"
          onChange={passwordHandler}
        />
      </div>
      {isError && <p className={classes.errorMsg}>{errorMsg}</p>}

      <div className={classes.buttons}>
        <button className={classes.Login} onClick={signInHandler}>
          Login
        </button>
      </div>

      <p>
        Don't have account {''}
        <Link to="/signup" className={classes.link}>
          Sign up ?
        </Link>
      </p>
    </div>
  );
};
