import { FC, useEffect, useState } from 'react';
import classes from './LeftNav.module.css';
import { UserProfile } from '../UsersProfile/UserProfile';
import { Link } from 'react-router-dom';
import { RiChatSmileFill } from 'react-icons/ri';
import instance from '../../instance';

export interface LeftNavProps {}

export const LeftNav: FC<LeftNavProps> = () => {
  const [allUsers, setAllUsers] = useState<
    { _id: string; userName: string; name: string; email: string }[]
  >([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const res = await instance('/user/getAllUsers');
      setAllUsers(res.data.data);
    };
    fetchAllUsers();
  }, []);

  console.log(allUsers);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>Chats </h1>
        <RiChatSmileFill size={40} />
      </div>
      <div className={classes.leftNav}>
        {allUsers.map((user) => (
          <Link className={classes.link} to={`/${user.userName}  `}>
            <UserProfile name={user.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};
