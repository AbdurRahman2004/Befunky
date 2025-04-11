import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) =>{
    event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & and get 20% off</p>
        <p className='mt-3 text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, accusamus?</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full flex-1 outline-none' required type="email" placeholder='Enter Your Email' name="" id="" />
            <button type='submit' className='bg-black text-white text-xs py-4 px-10'> Text Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetterBox;
