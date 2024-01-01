import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

const Navbar = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);


  const {user, logout} = useAuth();

    const navlinks = <>
        <li><NavLink className='mr-1' to={'/'}>Home</NavLink></li>
        {
          user ? <></> : <li><NavLink to={'/login'}>Login</NavLink></li>
        }
        <li><NavLink to={'/products'}>Products</NavLink></li>
    </>

const handleLogout = () => {
    logout()
    if(!user) {
      navigate('/login');
    }
  };

    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navlinks}
      </ul>
    </div>
    <a className=""><img src="./react-logo.png" alt="" /></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {navlinks}
    </ul>
  </div>
  <div className="navbar-end">
  {
      user ? <>
      <a onClick={handleLogout} className="btn btn-sm capitalize hover:bg-orange-600 hover:text-white">Log Out</a>
      </>
      : <>
      <NavLink to="/login" className="btn capitalize btn-sm dark:border-none text-black dark:bg-primary bg-cyan-200 dark:text-white">Login</NavLink>
      
      </>
      
    }
  </div>
</div>
    );
};

export default Navbar;