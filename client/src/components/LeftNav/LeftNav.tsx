import { FC } from 'react';
import classes from './LeftNav.module.css';
import { UserProfile } from '../UsersProfile/UserProfile';
import { Link } from 'react-router-dom';
export interface LeftNavProps {}

export const LeftNav: FC<LeftNavProps> = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>Chats 📨</h1>
      </div>
      <div className={classes.leftNav}>
        <Link className={classes.link} to="/">
          <UserProfile />
        </Link>
        <Link className={classes.link} to="/">
          <UserProfile />
        </Link>
        <Link className={classes.link} to="/">
          <UserProfile />
        </Link>
      </div>
    </div>
  );
};
