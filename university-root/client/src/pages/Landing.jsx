import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../layouts/Footer';
import images from '../utils/images+icons';
/**
 * 
 * @returns landing page
 */
export default function Landing() 
{
  /**
   * page content
   * note:
   * >images.{content} is used to import an image or icon to the page.
   */
  return (
  <>
    <section className='bg-gradient-to-r from-blue-200 flex flex-col min-h-screen justify-between '>
      <div className='lg:px-28 py-8 mx-8 sm:mx-16 lg:pt-20'>
        <div className='place-self-center mb-20'>
          <p className="flex justify-center">
            <img src={images.mainLogo} className="mr-3 h-12" alt="University Logo" />
            <span className="self-center text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-gray-800">University M.S</span>
          </p>
          <div className="xl:flex flex-row space-x-8">
            <img src={images.landingPageImage} alt="not found"/>
            <div  className="max-w-2xl xl:mt-12 font-light text-gray-700 md:text-lg lg:text-lg block">
              <p className='self-center text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl mb-2'>A litle about us</p>
              <p className='text-gray-600'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum cumque dolore, reprehenderit voluptate numquam dolor quis quidem autem dicta tempora, rerum nesciunt labore ut, veritatis quam facilis odio corporis quisquam!
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum cumque dolore, reprehenderit voluptate numquam dolor quis quidem autem dicta tempora, rerum nesciunt labore ut, veritatis quam facilis odio corporis quisquam!</p>
              <div className='inline-flex items-center justify-center py-3 mr-3'>
                <Link to={"login"}>
                  <Button variant="outlined" className='text-slate-50 bg-sky-600 hover:text-gray-800'>Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      <Footer/>
      </div>
    </section>
  </>
  )
}
