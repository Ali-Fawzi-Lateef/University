import { Button, TextField } from "@mui/material";
import "./../assets/backgroundStyles.css";
import axios from '../utils/axios';
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/**
 * 
 * @returns login page.
 */
export default function Login ()  
{
  /**
   * set refrence to email and error.
   */
  const emailRef = useRef();
  const errRef = useRef();

  /**
   * states variables.
   */
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  /**
   * react router navigation.
   */
  const navigate = useNavigate();

  /**
   * set foucs on email field whenever an error ocuarces
   */
  useEffect(() => {
      emailRef.current.focus();
  }, [])
  useEffect(() => {
      setErrMsg('');
  }, [email, password])

  /**
   * 
   * @param {event} e 
   * send an http request to the rest api to login user
   * using this credntials: email, password and rememberMe(Boolean variable).
   * and navigate the user based on thier user_type.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("/login", JSON.stringify({ email, password }))
      .then((response) => {
          if (response.statusText === "OK") {
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("token", response.data.data.token);
              localStorage.setItem("name", response.data.data.name);
              localStorage.setItem("reloadCount", 0);
              switch (response.data.data.user_type) {
                case 'admin':
                  navigate('../AdminDashboard/home',{replace: true})
                  break;
                case 'teacher':
                  navigate('../TeacherDashboard/home',{replace: true})
                  break;
                case 'student':
                  navigate('../StudentDashboard/home',{replace: true})
                  break;
                default:
                  navigate('../unVerified',{replace: true})
                  break;
              }
            }
      }).catch ((err) =>  {
          console.log(err)
          setErrMsg(err.response.data.message)
            errRef.current.focus();
      })
    }
    /**
     * page content
     */
  return(
        <section id="Login" className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full sm:max-w-xl p-6 m-auto bg-white rounded-md shadow-xl shadow-gray-600/40 ring-2 ring-sky-600 lg:max-w-xl">
              <h1 className="text-3xl font-semibold text-center text-blue-500 ">
                Welcome Back
              </h1>
              <p ref={errRef} className="text-red-500" aria-live="assertive">{errMsg}</p>
              <form className="mt-10" onSubmit={handleSubmit}>
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
                
                <div className="mb-16">
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
                <div className="mt-16 flex justify-center">
                  <Button variant="outlined" className="bg-sky-600 text-white hover:text-sky-600 w-full" type="submit">
                    <span>Login</span>
                  </Button>
                </div>
              </form>
          </div>
      </section>
    )
} 