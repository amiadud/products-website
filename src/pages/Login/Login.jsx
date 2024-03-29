import React, { useState } from 'react';
import { TEInput, TERipple } from 'tw-elements-react';
import { useAuth } from '../../providers/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
const Login = () => {

  const {login} = useAuth();

  const navigate = useNavigate();

    const handleLogin = async (event) => {
        try {

            event.preventDefault();
            const username = event.target.username.value
            const password = event.target.password.value
            console.log(username, password);
            const loginInfo = login(username, password)
            console.log(loginInfo)
            if(loginInfo){
              navigate('/')
            }


        } catch (error) {
          console.error('Login failed:', error.message);
        }
      };

    
    return (
        <>
      <section >
      <div className="container mx-auto h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* <!-- Left column container with background--> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>

          {/* <!-- Right column container with form --> */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form onSubmit={handleLogin }>
              {/* <!-- Email input --> */}
              <TEInput
                type="text"
                name='username'
                label="Username"
                size="lg"
                className="mb-6"
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
                type="password"
                name='password'
                label="Password"
                className="mb-6"
                size="lg"
              ></TEInput>

              {/* <!-- Submit button --> */}

              <TERipple rippleColor="light" className="w-full">
                <button
                  type="submit"
                  className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Sign in
                </button>
              </TERipple>
            </form>
          </div>
        </div>
      </div>
    </section>
        </>
    );
};

export default Login;