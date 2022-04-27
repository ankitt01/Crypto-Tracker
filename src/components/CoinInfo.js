import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Line, Doughnut } from 'react-chartjs-2';
import { HistoricalChart } from "../config/api";
import {CryptoState} from '../CryptoContext'
import { chartDays } from "../config/data";

const CoinInfo = ({coin}) => {
  const [days, setDays] = useState(1)
  const [historicData, setHistoricData] = useState()
  const [flag,setflag] = useState(false);

  const { currency } = CryptoState();


  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [coin,days]);
  console.log(historicData)
  return (
    <div className='h-full w-full'>
      {!historicData ? (null) : <>
        <Line 
          data={{
            labels: historicData.map(coin => {
              let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicData.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
        <div className='w-full flex justify-around'>
        {chartDays.map((day) => (
                <button className={`border text-sm md:text-md grow border-yellow-400 rounded px-4 py-2 mr-4 hover:bg-yellow-500 hover:text-black hover:font-bold`}
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </button>
              ))}
            </div>
      </>}
    </div>
  )
}

export default CoinInfo