import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import image from '../assets/img2.jpg';

export default function Home() {
  return (
  <>
  <section className='bg-gradient-to-r from-slate-900 to-gray-400 w-full h-screen relative'>
  <img 
  className="object-cover w-full h-full absolute mix-blend-overlay"
  src={image}
  alt=""
  />
  <h1 className='text-stone-200 sm:text-5xl text-4xl text-center xl:text-6xl relative'>
  Welcome to The University
  </h1>
  <div className='p-10 flex justify-center relative sm:mt-60 mt-56 xl:mt-64'>
    <Link to={"login"}>
    <Button variant="outlined" className='bg-white hover:text-white'>Login</Button>
    </Link>
  </div>
  </section>
  </>
  )
}
