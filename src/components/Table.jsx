import React,{useState,useEffect,useMemo} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Table = ({ TargetUrl,PageNo }) => {

  const [trades, setTrades] = useState([]);  
  const apiUrl = 'http://127.0.0.1:5000/trades';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem(TargetUrl);
        if (cachedData) {
          setTrades(JSON.parse(cachedData));
          console.log("Cached Data");
        }
        else{
            const response = await axios.get(apiUrl, {
              params: {
                url: TargetUrl
              }
            });

            const capitalizedTrades = response.data.Type.map(type => {
              return type === 'buy' ? 'Buy' : 'Sell';
            });

            const updatedTrades = { ...response.data, Type: capitalizedTrades };
            setTrades(updatedTrades);
            localStorage.setItem(TargetUrl, JSON.stringify(updatedTrades));
          }
     } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    window.addEventListener('beforeunload', clearLocalStorage);

    return () => {
      window.removeEventListener('beforeunload', clearLocalStorage);
    };

  }, [TargetUrl]);

  const clearLocalStorage = () => {
    localStorage.removeItem(TargetUrl);
    localStorage.clear();
  };

  const getColor = (type) => {
    return type === 'Buy' ? 'green' : 'red';
  };

  const getColor2 = (filed) =>{
    if(filed<=7){
      return 'green';
    }
    else if(filed>7 && filed<=30){
      return 'orange';
    }
    else{
      return 'red';
    }
  };



  return (
    <div className='Table'>
        <table>
            <thead>
                <tr>
                    <th>Politician</th>
                    <th>Traded Issuer</th>
                    <th>Type</th>
                    <th>Published</th>
                    <th>Traded</th>
                    <th>Filed After</th>
                    <th>Size</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
            {trades.Politians && trades.Politians.map((politician, index) => (
            <tr key={index}>
              <td>
              <div>{politician}</div>
                {trades.Politians_info && trades.Politians_info[index] && (
                    <div>
                    {`${trades.Politians_info[index][0]} | ${trades.Politians_info[index][1]} | ${trades.Politians_info[index][2]}`}
                    </div>
                )}
              </td>
              <td ><Link Link to={`/stock?name=${trades.Issuers_token[index]}`} style={{color:'blue'}}  >{trades.Issuers[index]}</Link></td>
              <td style={{ color: getColor(trades.Type[index]) }}>{trades.Type[index]}</td>
              <td>{trades.Published[index].join(', ')}</td>
              <td>{trades.Traded[index].join(', ')}</td>
              <td style={{ color: getColor2(trades.Filed[index]) }}>{trades.Filed[index] + ' Days'}</td>
              <td>{trades.Amount[index]}</td>
              <td>{trades.Prices[index]}</td>
            </tr>
          ))}
            </tbody>
        </table>
    </div>

  )
}

export default Table;
