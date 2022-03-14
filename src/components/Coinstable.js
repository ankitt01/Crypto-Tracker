import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CoinList} from "../config/api"
import { CryptoState } from "../CryptoContext"

const Coinstable = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const history = useHistory()
    const {currency, symbol} = CryptoState()
    
    const fetchCoins = async () => {
      setLoading(true)
      const {data} = await axios.get(CoinList(currency));

      setCoins(data)
      setLoading(false)
    }
    
    useEffect(() => {
      fetchCoins()
    }, [currency])

    const handleSearch = () => {
      return coins.filter(
        (coin) => 
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      )
    }
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }
    
  return (
    <div className='text-center text-gray-200 w-full lg:w-4/5 2xl:w-3/5 mx-auto lg:px-4'>
        <h2 className='lg:text-4xl text-2xl my-6'>Cryptocurrency Proces by Market Cap</h2>
        <input className='w-11/12 mx-2 sm:mx-auto sm:w-4/5 px-4 mb-6 rounded py-4 border border-slate-400 focus:border-white transition ease-in outline-none bg-inherit' type="text" placeholder='Search For a Crypto Currency..' onChange={(e) => setSearch(e.target.value)} value={search}/>

        <div>
        {
          loading? (
            <svg role="status" class="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
            </svg>
          ) : (
            <table className='table-auto px-1 w-full sm:w-4/5 lg:w-full sm:mx-auto'>
              <thead className='text-black'>
                <tr className='bg-yellow-400 rounded text-left'>
                  <th className='p-4'>Coin</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <tr className='border-b border-slate-600 text-left' onClick={() => history.push(`/coins/${row.id}`)} key={row.name}>
                      <td className='flex p-2 sm:p-4'>
                        <img className='h-8 sm:h-10 lg:h-14 p-1' src={row?.image} alt={row.name} />  
                        <div className='flex flex-col justify-center align-start text-left px-1'>
                          <span className='text-lg sm:text-xl lg:text-2xl uppercase'>{row.symbol}</span>
                          <span className='text-xs sm:text-sm text-gray-400'>{row.name}</span>
                        </div>
                      </td>
                      <td className='truncate text-xs sm:text-sm lg:text-lg pl-4'>
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(1))}
                      </td>  
                      <td className='pl-2'>
                        <span style={{color: profit > 0 ? "rgb(14,203,129)" : "red"}}>{profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%</span>
                        
                      </td>
                      <td  className='truncate'>
                        {symbol}{" "}
                        {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                      </td>  
                    </tr>
                  )
                })}
              </tbody>
            </table>

          )
        }
        
        </div>

    </div>
  )
}

export default Coinstable