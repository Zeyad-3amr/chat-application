import { FC } from 'react';
import classes from './UserProfile.module.css';

export interface UserProfileProps {
  name: string;
}

export const UserProfile: FC<UserProfileProps> = ({ name }) => {
  return (
    <div className={classes.userDetails}>
      <div className={classes.photo}></div>
      <div className={classes.details}>
        <p className={classes.userName}>{name}</p>
        <p className={classes.userMessage}>hey</p>
      </div>
    </div>
  );
};
