'use strict';
const axios = require('axios');

const getStocksLink = function(stock){
  return `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`
};

async function fetchStocks(stock) {
    try {
      let stock1, stock2;
      if(stock instanceof Array) {
        stock1 = await axios.get(getStocksLink(stock[0]));

        stock2 = await axios.get(getStocksLink(stock[1]));
        
        if(stock1.data instanceof Object && stock2.data instanceof Object) {
          return [stock1.data, stock2.data]; 
        }

        throw stock1.data || stock2.data;
      } else {
        stock1 = await axios.get(getStocksLink(stock));

        if(stock1.data instanceof Object) {
          return stock1.data;
        }

        throw stock1.data;
      }
    } catch (error) {
        return { error };
    }      
};

module.exports.fetchStocks = fetchStocks;