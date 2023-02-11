import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";


export default function TeacherLogout()
{
    const navigate = useNavigate()
    axios.post('teacher/logout').then((resopne)=>{
    if(resopne.status === 200){
       localStorage.clear();
       navigate('/');
       window.location.reload();
      }
  })
}
