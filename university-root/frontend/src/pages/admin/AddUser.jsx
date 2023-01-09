import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


/**
 * 
 * @returns addUser Page
 */
export default function AddUser() 
{
  const navigate = useNavigate();
  const handleSubmit = () =>{
    alert('1')
  }
  return (
    <section className=" w-full h-full">
      <h1 className=" font-semibold text-xl text-center mb-8">Add User</h1>
      <form onSubmit={handleSubmit} className=' w-full h-3/4'>
        <TextField
          label="Full name"
          // value={nameValue}
          autoComplete="false"
          className="w-3/6 mr-32 mb-5"
        />
        <TextField
          label="User Name"
          // value={fullname}
          autoComplete="false"
          className="w-2/6  mb-5"
        />
        <TextField
          label="Email"
          // value={Email}
          autoComplete="false"
          className="w-4/6  mb-5 mr-60"
        />
        <TextField
          label="Password"
          // value={password}
          autoComplete="false"
          className="w-3/6  mb-5 mr-60"
        />
        <TextField
          label="Repeat Password"
          // value={password}
          autoComplete="false"
          className="w-3/6  mb-5 mr-32"
        />
        <Select
        className=" w-28"
          // value={age}
          label="Role"
          // onChange={handleChange}
        >
          <MenuItem value = "admin">Admin</MenuItem>
          <MenuItem value = "teacher">Teacher</MenuItem>
          <MenuItem value = "student">Student</MenuItem>
        </Select>
        {/* <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        /> */}
        <div className="mt-12 flex justify-center">
          <Button variant="outlined" className="bg-sky-600 text-white hover:text-sky-600 w-full" type="submit">
            <span>Add</span>
          </Button>
        </div>
      </form>
    </section>
  )
}