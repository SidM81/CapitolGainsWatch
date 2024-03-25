// reducers.js
const initialState = {
    tradeDetails: {
      type: null,
      price: null
    }
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TRADE_DETAILS':
        return {
          ...state,
          tradeDetails: {
            type: action.payload.type,
            price: action.payload.price
          }
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  