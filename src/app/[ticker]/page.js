// src/app/stock_page.js
'use client';

import Link from "next/link";
import Image from "next/image";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockPage = ({ searchParams }) => {
  const ticker = searchParams.ticker;

  const [stockData, setStockData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestStockInfo, setLatestStockInfo] = useState(null);

  const apiKey = '71f5bedd89e94d839be095fdf4e6b964'; // Replace with your Twelve Data API key
  const apiUrl = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1day&apikey=${apiKey}`;

  useEffect(() => {
    const fetchStockData = async () => {
        if(ticker!=='N/A'){
            try {
              const response = await axios.get(apiUrl);
              const data = response.data.values.reverse(); // Reverse to get ascending order of dates
      
              const chartLabels = data.map((item) => item.datetime);
              const chartData = data.map((item) => parseFloat(item.close));
      
              setLabels(chartLabels);
              setStockData(chartData);
              setLatestStockInfo(data[0]);
              setLoading(false);
            } catch (error) {
              console.error("Error fetching stock data:", error);
              setLoading(false);
            }
        }
    };

    fetchStockData();
  }, [ticker]);

  // Chart.js config
  const data = {
    labels: labels,
    datasets: [
      {
        label: `${ticker} Stock Price`,
        data: stockData,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.05, // Curved line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Stock Price of ${ticker} for Last Few Days`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
  };



  return (
    <>
    <div>
      <NavigationMenu className="bg-[#205fe6] h-[4rem] flex items-center ">
      <NavigationMenuList className="w-screen flex items-center px-4 ">
        <NavigationMenuItem >
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="Picture of the Logo"
        />
        </NavigationMenuItem>
        <NavigationMenuItem className="px-4">
        <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
        <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-screen px-4">
        <Link href="https://www.linkedin.com/in/siddharth-mishra03/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              LinkedIn
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </div>

    <div className="container mx-auto py-12">
      {ticker !== "N/A" ? (
        <div className="w-full md:w-2/3 lg:w-3/4 mx-auto text-center">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">Stock Details for {ticker}</h1>
          {loading ? (
            <p className="text-lg text-gray-500">Loading stock data...</p>
          ) : (
            <>
              <div className="shadow-md p-10 rounded-lg border mb-8 bg-white h-[500px] w-full"> {/* Updated height and width */}
                <div className="relative w-full h-full"> {/* This div ensures the chart scales correctly */}
                  <Line data={data} options={options} />
                </div>
              </div>
              
              {latestStockInfo && (
                <div className="bg-gray-100 p-10 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Latest Stock Information</h2>
                  <div className="grid grid-cols-2 gap-8 text-left">
                    <p><strong>Date:</strong> {latestStockInfo.datetime}</p>
                    <p><strong>Open:</strong> ${latestStockInfo.open}</p>
                    <p><strong>High:</strong> ${latestStockInfo.high}</p>
                    <p><strong>Low:</strong> ${latestStockInfo.low}</p>
                    <p><strong>Close:</strong> ${latestStockInfo.close}</p>
                    <p><strong>Volume:</strong> {latestStockInfo.volume}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl text-red-600">No Stock Information Available</h1>
        </div>
      )}
    </div>
    </>
  );
};

export default StockPage;
