import { FC, useState } from 'react';
import classes from './Header.module.css';
import { useUserIdStore } from '../../../store/userStorage';

export interface HeaderProps {
  name: string;
  id: any;
}

export const Header: FC<HeaderProps> = ({ name, id }) => {
  const currentOnlineUsers = useUserIdStore((state) => state.onlineUsers);
  let status = currentOnlineUsers.find((el: any) => el === id);

  return (
    <div>
      <div className={classes.header}>
        <p className={classes.name}>{name}</p>
        {status ? (
          <p className={classes.status}>online</p>
        ) : (
          <p className={classes.status}>offline</p>
        )}
      </div>
    </div>
  );
};
