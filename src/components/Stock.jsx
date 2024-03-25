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
  const tradeDetails = useSelector(state => state.tradeDetails);
  useEffect(() => {
    const fetchStockDetails = async () => {
      if(name!="N/A"){
        try {
          const response = await fetch(`https://cloud.iexapis.com/stable/stock/${name}/quote?token=pk_292a8e1bbd3442a09e51dcfcbd0ebe5e`);
          const data = await response.json();
          setStockDetails(data);
        } catch (error) {
          console.error('Error fetching stock details:', error);
        }
      }
    };

    fetchStockDetails();
  });

  useEffect(() => {
    const fetchHistoricalPrices = async () => {
      if (name !== "N/A") {
        try {
          const response = await fetch(`https://cloud.iexapis.com/stable/stock/${name}/chart/1y?token=pk_292a8e1bbd3442a09e51dcfcbd0ebe5e`);
          const data = await response.json();
          setHistoricalPrices(data);
        } catch (error) {
          console.error('Error fetching historical prices:', error);
        }
      }
    };

    fetchHistoricalPrices();
  });

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
          <h2>{stockDetails.companyName} ({stockDetails.symbol})</h2>
          <p>Latest Price: {stockDetails.latestPrice}</p>
          <p>Open: {stockDetails.open}</p>
          <p>High: {stockDetails.high}</p>
          <p>Low: {stockDetails.low}</p>
          <p>Previous Close: {stockDetails.previousClose}</p>
          <canvas id="stockChart" width="400" height="200"></canvas>
        </div>
      ) : (
        <p>Not A Public Company</p>
      )}
    </div>
  );
};

export default Stock;
