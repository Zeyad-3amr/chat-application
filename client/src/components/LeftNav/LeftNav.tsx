import { FC } from 'react';
import classes from './LeftNav.module.css';
import { UserProfile } from '../UsersProfile/UserProfile';
export interface LeftNavProps {}

export const LeftNav: FC<LeftNavProps> = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>Chats 📨</h1>
      </div>
      <div className={classes.leftNav}>
        <UserProfile />
        <UserProfile />
        <UserProfile />
      </div>
    </div>
  );
};
