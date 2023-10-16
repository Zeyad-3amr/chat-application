import { FC } from 'react';
import classes from './Header.module.css';

export interface HeaderProps {}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <div>
      <div className={classes.header}>
        <p className={classes.username}>Zeyad</p>
        <p className={classes.status}>online</p>
      </div>
    </div>
  );
};
