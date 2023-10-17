import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LeftNavLayout } from './components/LeftNavLayout/LeftNavLayout';
import { WelcomeScreen } from './components/WelcomeScreen/WelcomeScreen';
import classes from './App.module.css';
import { ChatRoom } from './components/ChatRoom/ChatRoom';
import { io } from 'socket.io-client';

const router = createBrowserRouter([
  {
    element: <LeftNavLayout />,
    children: [
      {
        path: '/welcome',
        element: <WelcomeScreen />,
      },
      {
        path: '/',
        element: <ChatRoom />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <div className={classes.app}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
