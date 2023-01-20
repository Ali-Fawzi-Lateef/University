import { Button } from '@mui/material'
import axios from '../../utils/axios';

function Account() {
    const handleClick = () =>{
        axios.get('/index').then((respone)=>{
            console.log(respone)
        })
    }
  return (
    <Button className='bg-slate-400' onClick={()=>handleClick()}>call index function</Button>
  )
}

export default Account