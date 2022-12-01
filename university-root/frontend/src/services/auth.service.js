import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
// const register = (email, email, password) => { //comment.
//   return axios.post(API_URL + "signup", {
//     email,
//     email,
//     password,
//   });
// };

const login = (username, password) => {
  return axios
    .post(API_URL + "/api/auth/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  // register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;