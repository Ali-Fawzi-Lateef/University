import { Button, TextField } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../services/axios'
import jwt_decode from "jwt-decode";
import useAuth from '../hooks/useAuth';

const LOGIN_URL = '/api/login';

const Login = () => {
  const { setAuth } = useAuth();
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current.focus();
}, [])

useEffect(() => {
    setErrMsg('');
}, [username, password])


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
          JSON.stringify({ username, password }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true // should work later
          }
      );
      const accessToken = response?.data?.access_token;
      const roles = jwt_decode(response?.data.access_token).user_category;
      setAuth({ username, password, roles, accessToken });
            switch(roles){
              case 'dean':
                navigate('../dashboard');
            }
            setusername('');
            setPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

  return(
        <section className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-2/3  p-6  m-auto bg-white rounded-md shadow-xl shadow-gray-600/40 ring-2 ring-blue-500 lg:max-w-xl">
              <h1 className="text-3xl font-semibold text-center text-blue-600 ">
                Login
              </h1>
              <p ref={errRef} className="text-red-500" aria-live="assertive">{errMsg}</p>
              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="mb-10">
                <TextField 
                autoComplete="off"
                id="username"
                label="Username" 
                ref={usernameRef}
                className="w-full rounded-md"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
                error = {errMsg !== ""}
                 />
                </div>
                
                <div className="mb-2">
                <TextField 
                id="password" 
                label="Password" 
                type="password" 
                className="w-full rounded-md" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error = {errMsg !== ""}
                />
                </div>
                
                <span
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forget Password?
                </span>
                <div className="mt-8 flex justify-center">
                <Button variant="outlined" className="bg-blue-700 text-white hover:text-blue-700" type="submit">
              <span>Login</span>
                </Button>
              </div>
              </form>

              <p className="mt-8 text-xs font-light text-center text-gray-700">
                {" "}
                Don't have an account?{" "}
                <span
                  className="font-medium text-blue-600 hover:underline">
                    Sign up
                </span>
              </p>
          </div>
      </section>
    )
} 

export default Login;