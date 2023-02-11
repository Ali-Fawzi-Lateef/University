import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";


export default function AdminLogout()
{
    const navigate = useNavigate()
    axios.post('admin/logout').then((resopne)=>{
    if(resopne.status === 200){
       localStorage.clear();
       navigate('/');
       window.location.reload();
      }
  })
}
