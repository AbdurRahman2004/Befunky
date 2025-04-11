import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  my-10 mt-40 text-sm'>
          
          <div>
            <img className='mb-5 w-32' src={assets.logo} alt=""/>
            <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, reprehenderit tempora. Quos quasi in molestias?</p>
          </div>
          <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer '>
                <li className='hover:text-black'>Home</li>
                <li className='hover:text-black'>About us</li>
                <li className='hover:text-black'>Delivery</li>
                <li className='hover:text-black'>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1-6323-7863-9843</li>
                <li>contact@beFunky.com</li>
            </ul>
          </div>

        </div>
      
      <div>
        <hr />
        <p className='py-5 text-sm text-center '>Copyright 2024 &copy; Befunky.com - All right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
