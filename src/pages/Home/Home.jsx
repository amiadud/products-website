import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import Products from '../../Components/Products/Products';

const Home = () => {

    const {user, login} = useAuth();
    console.log(user)

    return (

        <>
        <Products/>
        </>
    );
};

export default Home;