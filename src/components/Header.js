import React from 'react'
import {useHistory} from "react-router-dom"
import { CryptoState } from '../CryptoContext'


const Header = () => {
  const history = useHistory()
  const {currency, setCurrency} = CryptoState()
  return (
    <div className='shadow-2xl'>
      <div className='flex justify-between align-center mx-auto w-100 xl:w-3/5 lg:w-4/5 p-4'>
        <h2 className='text-yellow-400 text-xl font-bold cursor-pointer' onClick={()=> history.push("/")}>Crypto Tracker</h2>
        <select className='p-1.5 bg-inherit text-white border cursor-pointer' value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option className='bg-blackbg' value="INR">INR</option>
          <option className='bg-blackbg' value="USD">USD</option>
        </select>
      </div>
    </div>
  )
}

export default Header