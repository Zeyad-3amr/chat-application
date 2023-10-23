import { FC } from 'react';
import classes from './Header.module.css';

export interface HeaderProps {
  name: string;
}

export const Header: FC<HeaderProps> = ({ name }) => {
  return (
    <div>
      <div className={classes.header}>
        <p className={classes.name}>{name}</p>

        <p className={classes.status}>online</p>
      </div>
    </div>
  );
};
