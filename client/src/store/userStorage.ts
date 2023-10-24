import { create } from 'zustand';

interface User {
  name: string;
  userName: string;
  email: string;
  _id: string;
}
interface OnlineUser {
  _id: string;
}

interface UserState {
  userProfile: User;
  onlineUsers: OnlineUser[];

  removeOnlineUser: (id: string) => void;
  setOnlineUsers: (id: string) => void;
  setUser: (userProfile: User | {}) => void;
}

export const useUserIdStore = create<UserState>((set) => ({
  userProfile: {} as User,
  onlineUsers: [],

  setUser: (userProfile: User | {}) =>
    set({
      userProfile: userProfile as User,
    }),

  setOnlineUsers: (id: string | any) => {
    set((state) => {
      if (state.onlineUsers.includes(id)) {
        return state;
      }
      return { onlineUsers: [...state.onlineUsers, id] };
    });
  },
  removeOnlineUser: (id: string) => {
    set((state) => ({
      onlineUsers: state.onlineUsers.filter((ids: any) => ids !== id),
    }));
  },
}));
