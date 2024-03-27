import {React,useState} from 'react';
import Navbar from './components/Navbar';
import Table from './components/Table';
import Filters from './components/Filters';
import Stock from './components/Stock';
import { Provider } from 'react-redux';
import store from './components/store';
import './App.css';

const App = () => {

  const [TargetUrl, setTargetUrl] = useState('https://www.capitoltrades.com/trades');

    const handleUpdateUrl = (url) => {
        setTargetUrl(url); // Update the URL in state
    };

    return (
      <Provider store={store}>
        <div>
          <Navbar />
          <Filters onUpdateUrl={handleUpdateUrl}/>
          <Table TargetUrl={TargetUrl}/>
        </div>
      </Provider>
        
  );
}

export default App;
