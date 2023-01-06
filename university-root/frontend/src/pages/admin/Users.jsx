import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import axios from '../../utils/axios';
import images from "../../utils/images+icons";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";


/**
 * users table fields
 */
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Full Name', width: 130, editable: true},
  { field: 'username', headerName: 'Username', width: 130, editable: true},
  { field: 'email', headerName: 'Email', width: 160, editable: true},
  { field: 'user_type', headerName: 'Type', width: 130, editable: true},
  { field: 'verified_at', headerName: 'Verification Date',type:'date', width: 160, editable: true},
  { field: 'registered_at', headerName: 'Registeration Date',type:'date', width: 150, editable: true},
  { field: 'birthdate', headerName: 'Birthdate',type:'date', width: 120, editable: true},
  // { field: 'edit', headerName: 'Edit', renderCell: () => (
  //   <Link to='editUser'>
  //     <Button className='rounded-full'>
  //       <images.Edit/>
  //     </Button>
  //   </Link>
  // ),}
];
/**
 * count number of occurance in json
 * used to count number of 
 * (admins, teachers, students)
 */
function getCount(arr, value) 
{
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
      if (arr[i].user_type === value) {
          count++;
      }
  }
  return count;
}
/**
 * 
 * @returns Users page
 */
export default function Users()
{
    // to make sure that api call happens only once.
    const dataFetchedRef = useRef(false);
    // const [selectedUser, setSelectedUser] = useState("");
    /**
     * fetch users data via http request and assign the data to a state varible
     * to use it in the table
     */
    const [rows, setRows] = useState([]);
    useEffect(()=>{
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        axios.get('/index').then((respone)=>{
            setRows(respone.data)
        })  
    },[])

    const RemoveUser = () =>{
      Swal.fire({
        title: 'Do you want to Remove this user?',
        showCancelButton: true,
        confirmButtonText: 'Remove',
        confirmButtonColor: '#d32f2f',
        cancelButtonColor:"#94a3b8",
        focusCancel:true,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          Swal.fire({
            title:"Removed!",
            confirmButtonColor:"#0ea5e9",
            confirmButtonText:"OK",
            icon:"success",
            iconColor:"#0ea5e9"
          })
        }
      })
    }
    /**
     * page content
     */
  return (
    <>
    {/* cards */}
    <span className='flex flex-row mb-4 space-x-32'>
     <Card sx={{ maxWidth: 345 }}>
      <CardActionArea className='flex flex-row mr-24'>
        <images.Person
        fontSize="large"
        color='primary'
        />
           <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            Users
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {rows.length}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea className='flex flex-row mr-24'>
        <images.Person
        fontSize="large"
        color='secondary'
        />
           <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            Admins
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {
                getCount(rows,"admin")
            }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea className='flex flex-row mr-24'>
        <images.Person
        fontSize="large"
        color='warning'
        />
           <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            Teachers
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {
                getCount(rows,"teacher")
            }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea className='flex flex-row mr-24'>
        <images.Person
        fontSize="large"
        color='success'
        />
           <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            Students
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {
                getCount(rows,"student")
            }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </span>
    {/* add User button */}
    <span className='flex flex-row'>
        <Button className='rounded-full' onClick={RemoveUser}>
          <images.PersonRemove color='error' titleAccess='Remove User' />
        </Button>
      <Link className=' w-full flex justify-end' to='addUser'>
          <Button className=' rounded-full'>
          <images.PersonAdd titleAccess='Add User' />
          </Button>
      </Link>
    </span>
    {/* Users table */}
    <section className='w-full h-5/6'>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        components={{
          Toolbar: GridToolbar,
        }}
        experimentalFeatures={{ newEditingApi: true }}

      />
    </section>
    </>
  )
}