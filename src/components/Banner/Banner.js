import React from 'react'
import Slider from './Slider'

const Banner = () => {
  return (
    <div className="flex flex-col w-100 text-center justify-center align-center bg-banner h-96 text-gray-200 "> 
        <h1 className='heading text-6xl font-bold mb-4'>Crypto Tracker</h1>
        <p className='text-sm mb-10'>Get All The Info Regarding Your Favorite Crypto Currency</p>
        <Slider />
    </div>
  )
}

export default Banner