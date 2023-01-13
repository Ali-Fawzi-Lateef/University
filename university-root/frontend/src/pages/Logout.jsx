import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";


export default function Logout() 
{
    const navigate = useNavigate()
    axios.post('/logout').then((resopne)=>{
    if(resopne.status === 200){
       localStorage.clear();
       navigate('/');
       window.location.reload();
      }
  })
}
