import { DataGrid , GridCellModes } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import axios from '../../utils/axios';
import images from "../../utils/images+icons";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function EditToolbar(props) {
  const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } = props;

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    if (cellMode === 'edit') {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
      });
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        p: 1,
      }}
    >
      <Button
        onClick={handleSaveOrEdit}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams}
        variant="outlined"
      >
        {cellMode === 'edit' ? 'Save' : 'Edit'}
      </Button>
      <Button
        onClick={handleCancel}
        onMouseDown={handleMouseDown}
        disabled={cellMode === 'view'}
        variant="outlined"
        sx={{ ml: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
}

EditToolbar.propTypes = {
  cellMode: PropTypes.oneOf(['edit', 'view']).isRequired,
  cellModesModel: PropTypes.object.isRequired,
  selectedCellParams: PropTypes.shape({
    field: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  setCellModesModel: PropTypes.func.isRequired,
};



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
  const [selectedCellParams, setSelectedCellParams] = useState(null);
  const [cellModesModel, setCellModesModel] = useState({});

  const handleCellFocus = useCallback((event) => {
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;
    setSelectedCellParams({ id, field });
  }, []);

  const cellMode = useMemo(() => {
    if (!selectedCellParams) {
      return 'view';
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || 'view';
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = useCallback(
    (params, event) => {
      if (cellMode === 'edit') {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode],
  );

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
              text:error.message,
              confirmButtonColor:"#0ea5e9",
              confirmButtonText:"OK",
              icon:"error",
              iconColor:"#d32f2f"
            })
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
    <section className='w-full h-5/6 bg-slate-100'>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellKeyDown={handleCellKeyDown}
        cellModesModel={cellModesModel}
        onCellModesModelChange={(model) => setCellModesModel(model)}
        components={{
          Toolbar: EditToolbar
        }}
        componentsProps={{
          toolbar: {
            cellMode,
            selectedCellParams,
            setSelectedCellParams,
            cellModesModel,
            setCellModesModel,
          },
          cell: {
            onFocus: handleCellFocus,
          },
        }}
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={(newSelectionArray) => {
        setSelectedUser(newSelectionArray[0])
      }}
      />
    </section>
    </>
  )
}

/**
 * users table fields
 */
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Full Name', width: 240, editable: true},
  { field: 'username', headerName: 'Username', width: 180, editable: true},
  { field: 'email', headerName: 'Email', width: 180, editable: true},
  { field: 'user_type', headerName: 'Type', width: 130, editable: true},
  { field: 'verified_at', headerName: 'Verification Date',type:'date', width: 170},
  { field: 'registered_at', headerName: 'Registeration Date',type:'date', width: 170},
  { field: 'birthdate', headerName: 'Birthdate',type:'date', width: 120, editable: true},
];