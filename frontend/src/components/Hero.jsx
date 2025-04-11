import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* hero Section Left side */}
        <div className='flex items-center justify-center py-10  w-full sm:py-0 sm:w-1/2'>
          <div className='text-[#414141]'>
            <div className='flex gap-2 items-center'>
                    <p className='w-8 h-[2px] md:w-11 bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>Our Best Seller</p>
            </div>
            <h1 className='parata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>LATEST ARRIVAL</h1>
            <div className='flex items-center gap-2'>
                <p className='font-semibold text-sm md:text-base'>Shop Now</p>
                <p className='w-8 md:w-11 h-[1px] bg-[#414141] '></p>
            </div>
          </div>        
        </div>
        {/* HERO RIGHT SIDE */}
        <img src={assets.hero_img}  className='w=full sm:w-1/2' alt="Hero-img" />

      
    </div>
  )
}

export default Hero
