import { FC } from 'react';
import classes from './UserProfile.module.css';

export interface UserProfileProps {}

export const UserProfile: FC<UserProfileProps> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.photo}></div>
      <div className={classes.details}>
        <p className={classes.userName}>Zeyad</p>
        <p className={classes.userMessage}>hey</p>
      </div>
    </div>
  );
};
