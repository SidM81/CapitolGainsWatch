import React from 'react'
import Navbar from './Navbar';
import Stock from './Stock';
import { Provider } from 'react-redux';
import store from './store';

const StockPage = () => {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Stock />
    </div>
    </Provider>
    
  )
}

export default StockPage;