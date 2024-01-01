import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth()


  if(loading){
      return <div>loading</div>
  }

  else if (user) {
      return children;
  }



    return ( 
    <Navigate to="/login"></Navigate>
    
    );
};

export default PrivateRoutes;