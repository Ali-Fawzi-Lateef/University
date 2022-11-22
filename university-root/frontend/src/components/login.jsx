import { Button, TextField } from "@mui/material";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    const Email = e.target.value;
    setEmail(Email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(Email, password).then(
        () => {
          navigate("/dashboard");
          window.location.reload();
        },
        (error) => {
          // const resMessage =
          //   (error.response &&
          //     error.response.data &&
          //     error.response.data.message) ||
          //   error.message ||
          //   error.toString();
          setLoading(false);
          setMessage("Invalid input");
        }
      );
    } else {
      setLoading(false);
    }
  };

  return(
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-2/3  p-6  m-auto bg-white rounded-md shadow-xl shadow-gray-600/40 ring-2 ring-blue-500 lg:max-w-xl">
              <h1 className="text-3xl font-semibold text-center text-blue-600 ">
                Login
              </h1>
              <Form className="mt-6" onSubmit={handleLogin} ref={form}>
                <div className="mb-10">
                <TextField 
                autoComplete="off"
                id="email"
                label="email" 
                className="w-full rounded-md"
                value={Email}
                onChange={onChangeEmail}
                validations={[required]} />
                </div>
                
                <div className="mb-2">
                <TextField 
                id="password" 
                label="Password" 
                type="password" 
                className="w-full rounded-md" 
                value={password}
                onChange={onChangePassword}
                validations={[required]}
                />
                </div>
                
                <span
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forget Password?
                </span>
                <div className="mt-8 flex justify-center">
                <Button variant="outlined" className="bg-blue-700 text-white hover:text-blue-700" type="submit" disabled={loading}>
                {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
                </Button>
              </div>
              {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>

              <p className="mt-8 text-xs font-light text-center text-gray-700">
                {" "}
                Don't have an account?{" "}
                <span
                  className="font-medium text-blue-600 hover:underline">
                    Sign up
                </span>
              </p>
          </div>
      </div>
    )
} 

export default Login;