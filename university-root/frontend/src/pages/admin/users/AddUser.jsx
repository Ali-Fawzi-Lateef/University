import { Button, MenuItem, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "../../../utils/axios";


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
  const onSubmit = (data) => {Swal.fire({
    title:`
    <p>Are you sure that you want to add this user?</p>
    <span> Name: ${data.fullname} <span/>
    <span> E-Mail: ${data.email} <span/>
    <span> Username: ${data.username} <span/>
    <span> Password: ${data.password} <span/>
    <span> Role: ${data.role} <span/>
    <span> Birthdate: ${data.birthdate} <span/>`,
    showDenyButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: `No`,
  }).then((result)=>{
    if (result.isConfirmed) {
      axios.post('/addUser',JSON.stringify(data)).then((response)=>{
        if(response.status === 200){
          Swal.fire('User added Succesfuly!', '', 'success')
          navigate(-1)
        }
      }).catch((error)=>{
        Swal.fire(error.response.data.message, '', 'error')
        console.log(error)
      })
    }
  })};
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
          {...register("name", { required: "Name is required." })}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
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
          autoComplete='off'
          className="w-2/6"
          select
          defaultValue=""
          label="Role"
          inputProps={register('user_type', {
            required: 'Please enter user role',
          })}
          error={Boolean(errors.user_type)}
          helperText={errors.user_type?.message}
        >
          {Roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <p className="text-sm text-gray-600">User Birthdate</p>
        <input 
        type="date"
        className={` w-3/6 h-12 text-xl font-extralight rounded-lg ${errors.birthdate && " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
        {...register("birthdate", { required: "birthdate is required." })}
        />
        {errors.birthdate && <p className=" text-sm text-red-500">{errors.birthdate.message}</p>}
        <div className="mt-6 flex justify-center">
          <Button variant="outlined" className="bg-sky-600 text-white hover:text-sky-600 w-2/6" type="submit">
            <span>Add User</span>
          </Button>
        </div>
      </form>
    </section>
  )
}