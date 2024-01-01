import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import PrivateRoutes from './PrivateRoutes';
import Products from '../Components/Products/Products';

const Routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path: '/',
            element:<PrivateRoutes><Home/></PrivateRoutes>
        },
        {
          path: '/products',
          element:<PrivateRoutes><Products/></PrivateRoutes>
      },
        {
            path: '/login',
            element:<Login/>
        }
      ]
    },
  ]);

export default Routes;