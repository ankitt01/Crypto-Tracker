import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {TrendingCoins} from '../../config/api'
import {CryptoState} from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import "./slider.css"


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}



const Slider = () => {
  const [trending, setTrending] = useState([])
  const {currency,symbol} = CryptoState()
  const fetchTrendingCoins = async () => {
    const {data} = await axios.get(TrendingCoins(currency))
    setTrending(data);
  }
  
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency])
  
  console.log(trending)
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin.id}`} className="flex">
        <img src={coin?.image} alt={coin.name} className="h-20 mb-4" />
        <span className='uppercase' >
          {coin?.symbol}
          &nbsp;
          <span style={{color: profit > 0 ? "rgb(14,203,129)" : "red"}}>{profit && "+" }{coin.price_change_percentage_24h?.toFixed(2)}%</span>
        </span>
        <span className='text-xl'>{symbol}{numberWithCommas(coin?.current_price.toFixed(2))}</span>
      </Link>
    )
  })
  const responsive = {
    0: { items: 2 },
    512: { items: 3 },
    1024: {items: 4},
  };
  return (
    <div>
      <AliceCarousel 
        autoPlay
        responsive={responsive}
        items={items}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        autoPlayInterval={1000}
        infinite
      />
    </div>
  )
}

export default Slider


// className='xl:w-3/5 lg:w-4/5 mx-auto'