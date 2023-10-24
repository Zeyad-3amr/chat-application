import { FC, useState, useEffect } from 'react';
import classes from './UserProfile.module.css';
import { useUserIdStore } from '../../store/userStorage';
import instance from '../../instance';

export interface UserProfileProps {
  name: string;
  status: boolean;
  id: string;
}

export const UserProfile: FC<UserProfileProps> = ({ name, status, id }) => {
  const setOnlineUsers = useUserIdStore((state) => state.setOnlineUsers);
  const removeOnlineUser = useUserIdStore((state) => state.removeOnlineUser);
  const user = useUserIdStore((state) => state.userProfile);
  const [lastMessage, setLastMessage] = useState('');

  if (status) {
    setOnlineUsers(id);
  } else {
    removeOnlineUser(id);
  }

  useEffect(() => {
    const fetchAllChats = async () => {
      const res = await instance.get('/room/getChats');
      const data: any = res.data.data;
      const message = data.find(
        (el: any) =>
          (el.from === id && el.to === user._id) || (el.to === id && el.from === user._id)
      );
      if (message) {
        setLastMessage(message.text);
      }
    };
    fetchAllChats();
  }, []);

  return (
    <div className={status ? classes.userDetailsOn : classes.userDetailsOff}>
      <div className={classes.photo}></div>
      <div className={classes.details}>
        <p className={classes.userName}>{name}</p>

        <p className={classes.userMessage}>{lastMessage}</p>
      </div>
    </div>
  );
};
