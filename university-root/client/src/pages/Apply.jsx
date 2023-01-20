import { Button, TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import axios from '../utils/axios';

import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../assets/backgroundStyles.css";

const Login = () => {
  
  const emailRef = useRef();
  const errRef = useRef();
  
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

useEffect(() => {
    emailRef.current.focus();
}, [])

useEffect(() => {
    setErrMsg('');
}, [email, password])


  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("/login", JSON.stringify({ email, password }))
      .then((response) => {
          if (response.statusText === "OK") {
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("token", response.data.data.token);
              // setemail('');
              // setPassword('');
              switch (response.data.data.user_type) {
                case 'admin':
                  navigate('../AdminDashboard',{replace: true})
                  break;
                case 'teacher':
                  navigate('../TeacherDashboard',{replace: true})
                  break;
                case 'student':
                  navigate('../StudentDashboard',{replace: true})
                  break;
                default:
                  navigate('../unVerfied',{replace: true})
                  break;
              }
            }
     
      }).catch ((err) =>  {
          console.log(err)
          setErrMsg(err.response.statusText)
            errRef.current.focus();
        })
    }
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
                id="email"
                label="email" 
                ref={emailRef}
                className="w-full rounded-md"
                value={email}
                onChange={(e) => setemail(e.target.value)}
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