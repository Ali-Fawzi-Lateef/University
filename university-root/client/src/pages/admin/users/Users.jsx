import { DataGrid  } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { useEffect, useRef, useState, useMemo } from 'react';
import axios from '../../../utils/axios';
import images from "../../../utils/images+icons";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import moment from 'moment';
import EditUser from './EditUser';

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

  const [rowId, setRowId] = useState(null);

  //page size
  const [pageSize, setPageSize] = useState(5);

  //get selected user id for delete feature
  const [selectedUser, setSelectedUser] = useState(0);

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
        if (result.isConfirmed) {
          axios.post('/deleteUser',JSON.stringify({id:selectedUser})).then(()=>{
              Swal.fire({
                title:"Removed!",
                confirmButtonColor:"#0ea5e9",
                confirmButtonText:"OK",
                icon:"success",
                iconColor:"#0ea5e9"
              }).then(()=>{
                window.location.reload();
              })
          }).catch((error)=>{
            Swal.fire({
              title:"failed to delete user!",
              text:error.response.data.message,
              confirmButtonColor:"#0ea5e9",
              confirmButtonText:"OK",
              icon:"error",
              iconColor:"#d32f2f"
            })
          })
        }
      })
    }

    const columns = useMemo(
      () => [
      { field: 'name', headerName: 'Full Name', width: 240, editable: true},
      { field: 'username', headerName: 'Username', width: 180, editable: true},
      { field: 'email', headerName: 'Email', width: 180, editable: true},
      { field: 'user_type', headerName: 'Role', width: 130, type: 'singleSelect',
      valueOptions: ['admin', 'teacher', 'student'],
      editable: true,},
      { field: 'verified_at', headerName: 'Verification Date',renderCell: (params) =>
      moment(params.row.verified_at).format('YYYY-MM-DD HH:MM:SS'), width: 170},
      { field: 'registered_at', headerName: 'Registeration Date',renderCell: (params) =>
      moment(params.row.registered_at).format('YYYY-MM-DD HH:MM:SS'), width: 170},
      { field: 'birthdate', headerName: 'Birthdate', editable: true},
        {
          field: 'actions',
          headerName: 'Save',
          type: 'actions',
          renderCell: (params) => (
            <EditUser {...{ params, rowId, setRowId }} />
          ),
        },
      ],
      [rowId]
    );

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
    <section className='w-full h-5/6 bg-slate-100'>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        onCellEditCommit={(params) => setRowId(params.id)}
        onSelectionModelChange={(newSelectionArray) => {
        setSelectedUser(newSelectionArray[0])
        }}
      />
    </section>
    </>
  )
}