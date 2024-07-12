import React, { useState, useEffect } from 'react';
import { useSearchParams,useLocation} from "react-router-dom";
import { useSelector } from 'react-redux';
import {Chart, LinearScale, PointElement, Tooltip, Legend, TimeScale,LineController, LineElement} from "chart.js"; 
import 'chartjs-adapter-moment';
Chart.register(LinearScale, PointElement, Tooltip, Legend, TimeScale,LineController, LineElement);


const Stock = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name")
  const [stockDetails, setStockDetails] = useState(null);
  const [historicalPrices, setHistoricalPrices] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [todayDate,setTodayDate] = useState('');
  const [dateThirtyDaysBack, setDateThirtyDaysBack] = useState('');

  useEffect(() => {
    const today = new Date();
    const todaydate = today.toISOString().split('T')[0];
    setTodayDate(todaydate);
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 30);

    const formattedDate = pastDate.toISOString().split('T')[0];

    setDateThirtyDaysBack(formattedDate);
  }, []);


  useEffect(() => {
    const fetchStockDetails = async () => {
      if(name!="N/A"){
        try {
          const targetUrl = `https://api.polygon.io/v1/open-close/${name}/2023-01-09?adjusted=true&sort=asc&apiKey=rptRAuA1JetbWKhnppWeylDdsFCGMgMO`;
          const response = await fetch(`http://localhost:3001/api/proxy?targetUrl=${encodeURIComponent(targetUrl)}`);
          const data = await response.json();
          setStockDetails(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching stock details:', error);
        }
      }
    };

    fetchStockDetails();
  },[name,todayDate]);

  useEffect(() => {
    const fetchHistoricalPrices = async () => {
      if (name && name !== "N/A") {
        try {
          const targetUrl = `https://api.polygon.io/v2/aggs/ticker/${name}/range/1/day/${dateThirtyDaysBack}/${todayDate}?adjusted=true&sort=asc&apiKey=rptRAuA1JetbWKhnppWeylDdsFCGMgMO`;
          const response = await fetch(`http://localhost:3001/api/proxy?targetUrl=${encodeURIComponent(targetUrl)}`);
          const data = await response.json();
          const formattedData = data.results.map(entry => ({
            date: new Date(entry.t).toISOString().split('T')[0], // Format the timestamp to a date string
            close: entry.c // Closing price
          }));
          setHistoricalPrices(formattedData);
          console.log(formattedData);
        } catch (error) {
          console.error('Error fetching historical prices:', error);
        }
      }
    };

    fetchHistoricalPrices();
  },[name, dateThirtyDaysBack, todayDate]);

  useEffect(() => {
    // Plot the graph using Chart.js
    const ctx = document.getElementById('stockChart');
    if (ctx && historicalPrices.length > 0) {
      // Destroy previous chart instance
      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: historicalPrices.map(entry => entry.date),
          datasets: [{
            label: 'Price',
            data: historicalPrices.map(entry => entry.close),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                displayFormats: {
                  day: 'MMM D'
                }
              }
            }
          }
        }
      });

      setChartInstance(newChartInstance);
    }
  }, [historicalPrices]);
  
  return (

    <div className="stock-details">
      {stockDetails ? (
        <div>
          <h2>{stockDetails.symbol}</h2>
          <p>PreMarket Price: {stockDetails.preMarket}</p>
          <p>Open: {stockDetails.open}</p>
          <p>High: {stockDetails.high}</p>
          <p>Low: {stockDetails.low}</p>
          <p>Previous Close: {stockDetails.close}</p>
          <canvas id="stockChart" width="400" height="200"></canvas>
        </div>
      ) : (
        <p>Not A Public Company{dateThirtyDaysBack} || {todayDate}</p>
      )}
    </div>
  );
};

export default Stock;
