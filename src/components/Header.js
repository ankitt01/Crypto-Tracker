import React from 'react'
import {useHistory} from "react-router-dom"

const Header = () => {
  const history = useHistory()
  return (
    <div className='flex justify-between mx-auto w-100 lg:w-3/5 p-4'>
        <h2 className='text-yellow-400 text-xl font-bold cursor-pointer' onClick={()=> history.push("/")}>Crypto Tracker</h2>
        <select className='p-1.5 bg-inherit text-white border cursor-pointer'>
          <option className='bg-blackbg' value="INR">INR</option>
          <option className='bg-blackbg' value="USD">USD</option>
        </select>
    </div>
  )
}

export default Header