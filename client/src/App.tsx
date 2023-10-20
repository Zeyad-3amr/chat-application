import React from 'react';
import { useEffect, useState } from 'react';

import { LeftNavLayout } from './components/LeftNavLayout/LeftNavLayout';
import { WelcomeScreen } from './components/WelcomeScreen/WelcomeScreen';
import { ChatRoom } from './components/ChatRoom/ChatRoom';
import { Routes, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';

import { useUserIdStore } from './store/userStorage';
import instance from './instance';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useUserIdStore((state) => state.setUser);
  // const userProfile = useUserIdStore((state) => state.userProfile);

  useEffect(() => {
    const fetchUserHandler = async () => {
      try {
        setIsLoading(true);

        const res = await instance.get('user/getMe');
        const data = res.data.data;
        console.log(data);

        setUser(data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchUserHandler();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          element={
            <ProtectedRoute>
              <LeftNavLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <WelcomeScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:to"
            element={
              <ProtectedRoute>
                <ChatRoom />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
