import { Button, MenuItem, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Roles = [
  {
    value: 'student',
    label: 'Student',
  },
  {
    value: 'teacher',
    label: 'Teacher',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
];
/**
 * 
 * @returns AddUser Page
 */
export default function AddUser() 
{
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <section className=" w-full h-full">
      <h1 className=" font-semibold text-xl text-center mb-8">Add User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className=' w-full h-3/4'>
      <span>
        <TextField
          size="small"
          label="Full name"
          autoComplete='off'
          className="w-3/6 mr-32"
          {...register("fullname", { required: "Name is required." })}
          error={Boolean(errors.fullname)}
          helperText={errors.fullname?.message}
        />
        </span>
        <TextField
          size="small"
          label="User Name"
          autoComplete='off'
          className="w-2/6  mb-5"
          {...register("username", { required: "user Name is required." })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
        />
        <TextField
          size="small"
          label="E-mail"
          autoComplete='off'
          className="w-4/6  mb-5 mr-60"
          {...register("email", { required: "E-mail Address is required." })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <TextField
          size="small"
          label="Password"
          autoComplete='off'
          className="w-3/6  mb-5 mr-60"
          {...register("password", { required: "Password is required." })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
        <TextField
          size="small"
          label="Repeat Password"
          autoComplete='off'
          className="w-3/6  mb-5 mr-32"
          {...register("repeatedPassword", { required: "Repeadted Password is required." })}
          error={Boolean(errors.repeatedPassword)}
          helperText={errors.repeatedPassword?.message}
        />
        <TextField
          size="small"
          autoComplete='off'
          className="w-2/6"
          select
          defaultValue=""
          label="Role"
          inputProps={register('role', {
            required: 'Please enter user role',
          })}
          error={Boolean(errors.role)}
          helperText={errors.role?.message}
        >
          {Roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDayjs}>

        <DesktopDatePicker
                  inputProps={register('birthdate', {
            required: 'Please enter user role',
          })}
          error={Boolean(errors.birthdate)}
          helperText={errors.birthdate?.message}
          label="Birthdate"
          openTo="year"
      format="dd-MMM-yyyy"
      views={["year", "month", "date"]}    
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>

        <div className="mt-6 flex justify-center">
          <Button variant="outlined" className="bg-sky-600 text-white hover:text-sky-600 w-2/6" type="submit">
            <span>Add User</span>
          </Button>
        </div>
      </form>
    </section>
  )
}