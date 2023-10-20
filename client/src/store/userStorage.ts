import { create } from 'zustand';

interface User {
  name: string;
  userName: string;
  email: string;
  _id: string;
}

interface UserState {
  userProfile: User;
  setUser: (userProfile: User | {}) => void;
}

export const useUserIdStore = create<UserState>((set) => ({
  userProfile: {} as User,
  setUser: (userProfile: User | {}) =>
    set({
      userProfile: userProfile as User,
    }),
}));
