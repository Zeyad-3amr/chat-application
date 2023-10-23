import { FC } from 'react';
import classes from './UserProfile.module.css';

export interface UserProfileProps {
  name: string;
  status: boolean;
}

export const UserProfile: FC<UserProfileProps> = ({ name, status }) => {
  return (
    <div className={status ? classes.userDetailsOn : classes.userDetailsOff}>
      <div className={classes.photo}></div>
      <div className={classes.details}>
        <p className={classes.userName}>{name}</p>

        {status ? (
          <p className={classes.userMessage}>online</p>
        ) : (
          <p className={classes.userMessage}>offline</p>
        )}
      </div>
    </div>
  );
};
