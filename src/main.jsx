import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './Routes/Routes.jsx';
import {
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './providers/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={Routes} />
      </AuthProvider>
  </React.StrictMode>,
)
