import axios from 'axios';
/**
 * gets the api url via enviroument variable.
 * make an xmlHttpRequest with the help of axios.
 */
export default axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+localStorage.getItem("token")??""
    }
});