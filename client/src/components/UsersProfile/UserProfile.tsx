import { FC, useState } from 'react';
import classes from './UserProfile.module.css';
import { useUserIdStore } from '../../store/userStorage';

export interface UserProfileProps {
  name: string;
  status: boolean;
  id: string;
}

export const UserProfile: FC<UserProfileProps> = ({ name, status, id }) => {
  const setOnlineUsers = useUserIdStore((state) => state.setOnlineUsers);
  const removeOnlineUser = useUserIdStore((state) => state.removeOnlineUser);

  if (status) {
    setOnlineUsers(id);
  } else {
    removeOnlineUser(id);
  }
  // if (!status) {
  //   removeOnlineUser(id);
  // }

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
