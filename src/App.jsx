import React from 'react';
import Navbar from './components/Navbar';
import Table from './components/Table';
import Filters from './components/Filters';
import Stock from './components/Stock';
import { Provider } from 'react-redux';
import store from './components/store';
import './App.css';

const App = () => {
    return (
      <Provider store={store}>
        <div>
          <Navbar />
          <Filters />
          <Table />
        </div>
      </Provider>
        
  );
}

export default App;
