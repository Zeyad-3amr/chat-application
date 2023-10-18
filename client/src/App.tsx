import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LeftNavLayout } from './components/LeftNavLayout/LeftNavLayout';
import { WelcomeScreen } from './components/WelcomeScreen/WelcomeScreen';
import { ChatRoom } from './components/ChatRoom/ChatRoom';
import { io } from 'socket.io-client';
import { Routes, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<LeftNavLayout />}>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/page" element={<ChatRoom />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
