import { FC, useEffect, useState } from 'react';
import classes from './LeftNav.module.css';
import { UserProfile } from '../UsersProfile/UserProfile';
import { Link, useNavigate } from 'react-router-dom';
import { RiChatSmileFill } from 'react-icons/ri';
import instance from '../../instance';
import { useUserIdStore } from '../../store/userStorage';

export interface LeftNavProps {}

interface User {
  _id: string;
  userName: string;
  name: string;
  email: string;
}
export const LeftNav: FC<LeftNavProps> = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const setUser = useUserIdStore((state) => state.setUser);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const res = await instance.get('/user/getAllUsers');
      setAllUsers(res.data.data);
    };
    fetchAllUsers();
  }, []);

  const logOutHandler = async () => {
    const res = await instance.post('/user/logout');
    if (res.data.status === 'success') {
      setUser({});
      navigate('/sign-in', { replace: true });
    }
    console.log(res.data);
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
              <UserProfile name={user.name} />
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
