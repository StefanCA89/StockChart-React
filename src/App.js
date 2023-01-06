import { useState, useRef } from 'react';
import './App.css';
import InputBar from './Components/InputBar'
import Graph from './Components/Graph'
import PriceSideBar from './Components/PriceSideBar'
import TimestampBar from './Components/TimestampBar'
import HoverInfoBar from './Components/HoverInfoBar'
import Logo from './alphavantage.png'

function App() {
  const [requestData, setRequestData] = useState({
    symbol: '',
    timeInterval: ''
  })

  const [stockData, setStockData] = useState()
  const canvasRef = useRef(null)

  async function fetchData() {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${requestData.symbol}&interval=${requestData.timeInterval}&apikey=PKS369HG6LAKHCVO`)
      const data = await response.json()
      parseData(data)
    } catch {
      alert ("Symbol not found\nOR\nAPI call limit exceeded")
    }
  }

  function parseData(data) {
    let parsedData = {
      timeStamp : Object.keys(data[`Time Series (${requestData.timeInterval})`]),
      priceOpen : [],
      priceClose : [],
      priceHigh : [],
      priceLow : []
    }
    for (let index = 0; index < 45; ++index) {
      parsedData.priceOpen.unshift(data[`Time Series (${requestData.timeInterval})`][`${parsedData.timeStamp[index]}`]["1. open"])
      parsedData.priceHigh.unshift(data[`Time Series (${requestData.timeInterval})`][`${parsedData.timeStamp[index]}`]["2. high"])
      parsedData.priceLow.unshift(data[`Time Series (${requestData.timeInterval})`][`${parsedData.timeStamp[index]}`]["3. low"])
      parsedData.priceClose.unshift(data[`Time Series (${requestData.timeInterval})`][`${parsedData.timeStamp[index]}`]["4. close"])
    }
    setStockData(parsedData)
  }

  return (
    <div className="App">
      <InputBar setData={setRequestData} handleSubmit={fetchData}/>
      {stockData && <PriceSideBar data={stockData}/>}
      {stockData ? <Graph data={stockData} refToCanvas={canvasRef} /> : <img src={Logo} className="logo"/>}
      {stockData && <HoverInfoBar data={stockData} refToCanvas={canvasRef}/>}
      {stockData && <TimestampBar timeStamp={stockData.timeStamp}/>}
    </div>
  );
}

export default App;
