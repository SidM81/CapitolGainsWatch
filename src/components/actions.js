// actions.js
export const setTradeDetails = (type, price) => ({
    type: 'SET_TRADE_DETAILS',
    payload: { type, price }
  });
  