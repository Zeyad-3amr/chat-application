import React from 'react';
import { LeftNav } from './components/LeftNav/LeftNav';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LeftNavLayout } from './components/LeftNavLayout/LeftNavLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LeftNavLayout />,
    children: [<LeftNav />],
  },
]);

const App: React.FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
