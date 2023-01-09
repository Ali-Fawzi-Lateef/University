import { useEffect, useState } from 'react';
import { Box, CircularProgress, Fab } from '@mui/material';
import { green } from '@mui/material/colors';
import axios from '../../utils/axios';
import images from "../../utils/images+icons";

export default function EditUser({ params, rowId, setRowId }) 
{
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        await axios.post('/editUser',JSON.stringify(params.row)).then((respone)=>{
            if(respone.status === 200){
                setSuccess(true);
                setRowId(null);
            }
        }).catch((error)=>{
            console.log(error);
        })
        setLoading(false);
      };
    useEffect(() => {
        if (rowId === params.id && success) setSuccess(false);
    }, [rowId, params.id, success]);
    
    return (
    <Box
        sx={{
        m: 1,
        position: 'relative',
        }}
    >
        {success ? (
        <Fab
            color="primary"
            sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
            }}
        >
            <images.Check />
        </Fab>
        ) : (
        <Fab
            className=' bg-sky-500'
            sx={{
            width: 40,
            height: 40,
            }}
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
        >
            <images.Save />
        </Fab>
        )}
        {loading && (
        <CircularProgress
            size={52}
            sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
            }}
        />
        )}
    </Box>
    );
}
