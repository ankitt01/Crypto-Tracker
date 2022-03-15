import React, {useState, useEffect} from 'react'
import { CryptoState } from "../CryptoContext"
import { useParams } from 'react-router-dom/'
import { SingleCoin} from "../config/api"
import axios from 'axios'
import CoinInfo from '../components/CoinInfo'
import ReactHtmlParser from "react-html-parser"

const CoinPage = () => {
  const {id} = useParams();
  const [coin, setCoin] = useState()
  const {currency, symbol} = CryptoState();
  const fetchCoins = async() => {
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  useEffect(() => {
    fetchCoins();
  }, [])
  
  return (
    <div className='flex flex-col lg:flex-row text-center text-gray-300 my-4'>
      <div className='w-full lg:w-1/3 flex flex-col align-center border-r-2 border-gray-500'>
       <img src={coin?.image.large} alt={coin?.name} className='h-48 w-48 mx-auto mb-4' /> 
       <h3 className='font-bold text-4xl mb-4'>{coin?.name}</h3>
       <p className='w-full p-4 '>{ReactHtmlParser(coin?.description.en.split(". "[0]))}.</p>

      </div>
      <div>
        <CoinInfo coin={coin}/>
      </div>
    </div>
  )
}

export default CoinPage