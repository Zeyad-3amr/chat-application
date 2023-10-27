import { FC, useEffect, useState } from 'react';
import classes from './LeftNav.module.css';
import { UserProfile } from '../UsersProfile/UserProfile';
import { Link, useNavigate } from 'react-router-dom';
import { RiChatSmileFill } from 'react-icons/ri';
import instance from '../../instance';
import { useUserIdStore } from '../../store/userStorage';
import io from 'socket.io-client';

export interface LeftNavProps {}

interface User {
  _id: string;
  userName: string;
  name: string;
  email: string;
  lastMessage: string;
}
const socket = io('http://localhost:8000');

export const LeftNav: FC<LeftNavProps> = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const user = useUserIdStore((state) => state.userProfile);
  const update = useUserIdStore((state) => state.updatedUsers);
  const addOnlineUser = useUserIdStore((state) => state.setOnlineUsers);

  const setUser = useUserIdStore((state) => state.setUser);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const res = await instance.get('/user/getAllUsers');
      setAllUsers(res.data.data);
    };
    fetchAllUsers();
  }, [update]);

  useEffect(() => {
    socket.on('online_users', (data: any) => {
      setOnlineUsers(data);
      addOnlineUser(data);
    });
    socket.on('offline', (data) => {
      setOnlineUsers(data);
      addOnlineUser(data);
    });
    socket.emit('online', user._id);
  }, [socket]);

  const logOutHandler = async () => {
    const res = await instance.post('/user/logout');
    if (res.data.status === 'success') {
      socket.emit('logout', user._id);
      setUser({});
      navigate('/sign-in', { replace: true });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          <h1>Chats </h1>
          <RiChatSmileFill size={40} />
        </div>
        <div className={classes.leftNav}>
          {allUsers.map((user) => (
            <Link key={user._id} className={classes.link} to={`user/${user._id}  `}>
              <UserProfile
                id={user._id}
                name={user.name}
                status={onlineUsers.some((el: any) => user._id === el)}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className={classes.logoutDiv}>
        <button className={classes.logoutBtn} onClick={logOutHandler}>
          Log out
        </button>
      </div>
    </div>
  );
};
