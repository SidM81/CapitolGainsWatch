import {React,useState} from 'react';
import Navbar from './components/Navbar';
import Table from './components/Table';
import Filters from './components/Filters';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './components/store';
import './App.css';

const App = () => {

  const [TargetUrl, setTargetUrl] = useState('https://www.capitoltrades.com/trades');
  const [PageNo, setPageNo] = useState(1);
    const handleUpdateUrl = (url) => {
        setTargetUrl(url); // Update the URL in state
        setPageNo(1);
    };

    return (
      <Provider store={store}>
        <div>
          <Navbar />
          <Filters onUpdateUrl={handleUpdateUrl}/>
          <Table TargetUrl={TargetUrl}/>
          <Footer PageNo = {PageNo} onUpdateUrl={handleUpdateUrl}/>
        </div>
      </Provider>
        
  );
}

export default App;
