import React, {useState, useEffect} from 'react'
import { CryptoState } from "../CryptoContext"
import { useParams } from 'react-router-dom/'
import { SingleCoin} from "../config/api"
import axios from 'axios'
import CoinInfo from '../components/CoinInfo'
import ReactHtmlParser from 'react-html-parser';


const CoinPage = () => {
  const {id} = useParams();
  const [coin, setCoin] = useState()
  const {currency, symbol} = CryptoState();
  const fetchCoins = async() => {
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
  }

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line
  }, [])

  if(!coin) return null
  
  return (
    <div className='flex flex-col lg:flex-row lg:text-center text-gray-300 my-4 p-6'>

      <div className='w-full min-w-[400px] lg:w-1/3 flex flex-col align-center justify-center lg:border-r-2 border-gray-500 pr-2'>
        <div className='max-w-[700px] mx-auto mb-6'>
          <img src={coin?.image.large} alt={coin?.name} className='h-48 w-48 mx-auto mb-4' /> 
          <h3 className='font-bold text-4xl mb-4'>{coin?.name}</h3>
          <p className="max-w-[700px] mx-auto mb-6">{ReactHtmlParser(coin?.description.en.split(". ")[0])}</p>
          <p className='text-xl font-bold mb-2'>Rank: {coin?.market_cap_rank}</p>
          <p className='text-xl font-bold mb-2'>Current Price: {" "}{symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</p>
          <p className='text-xl font-bold mb-2'>Market Cap: {" "}{symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M</p>
        </div>
      </div>

      <div className='md:px-12 lg:w-2/3'>
        <CoinInfo coin={coin}/>
      </div>
    </div>
  )
}

export default CoinPage