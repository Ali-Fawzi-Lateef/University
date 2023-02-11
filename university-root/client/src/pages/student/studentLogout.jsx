import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";


export default function StudentLogout()
{
    const navigate = useNavigate()
    axios.post('student/logout').then((resopne)=>{
        if(resopne.status === 200){
            localStorage.clear();
            navigate('/');
            window.location.reload();
        }
    })
}
