import { Button, TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useRef, useState, useEffect } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import axios from '../services/axios'
import jwt_decode from "jwt-decode";
import useAuth from '../hooks/useAuth';
import "./../assets/backgroundStyles.css";

const LOGIN_URL = '/api/login';

const Login = () => {
  const { setAuth , persist , setPersist } = useAuth();
  
  const usernameRef = useRef();
  const errRef = useRef();
  
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
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
            withCredentials: true 
          }
      );
      const access_token = response?.data?.access_token;
      const roles = jwt_decode(response?.data.access_token).user_category;
      setAuth({ user:username, pwd:password, roles, access_token });
      navigate('../dashboard', { replace: true });
      switch(roles){
        case 'dean':
                // console.log(from)
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

    const togglePersist = () => {
      setPersist(prev => !prev);
    }

    useEffect(() => {
      window.localStorage.setItem("persist", persist);
    }, [persist])

  return(
        <section id="Login" className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full sm:max-w-xl p-6 m-auto bg-white rounded-md shadow-xl shadow-gray-600/40 ring-2 ring-sky-600 lg:max-w-xl">
              <h1 className="text-3xl font-semibold text-center text-blue-500 ">
                Welcome Back
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
                
                <div className="mb-4">
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
                
                <p className="text-xs mb-8 text-blue-500 hover:underline">
                  Forget Password?
                </p>
                <FormControlLabel control={<Checkbox />} 
                  label="Remeber me"
                  id="persist"
                  // onChange={togglePersist}
                  // checked={persist}
                /> 
                <div className="mt-12 flex justify-center">
                <Button variant="outlined" className="bg-sky-600 text-white hover:text-sky-600 w-full" type="submit">
              <span>Login</span>
                </Button>
              </div>
              </form>
          </div>
      </section>
    )
} 

export default Login;