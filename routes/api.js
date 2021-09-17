const { Stocks } = require('../db/schema');
const { fetchStocks } = require('../controllers/fetchStock');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      const { stock, like } = req.query;
      // get IP address from request
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

      try {
        // fetch stock data
        const stockData = await fetchStocks(stock);

        if(stockData.error) {
          throw stockData.error;
        }

        //check if we have only one stock request
        if (stockData instanceof Array) {
          let doc1, doc2, rel_likes1, rel_likes2;
          const [s1, s2] = stockData;

          const s1Name = stock[0].toLowerCase();
          const s2Name = stock[1].toLowerCase();

          // check like and add it to database
          if (like === 'true') {
            // find IP in likes array if don't exist add one for 's1`' and 's2' 
            doc1 = await Stocks.findOneAndUpdate(
              { stock: s1Name }, 
              { $addToSet: { likes: ip } },
              { new: true, upsert: true }
            );
            
            doc2 = await Stocks.findOneAndUpdate(
              { stock: s2Name }, 
              { $addToSet: { likes: ip } }, 
              { new: true, upsert: true }
            );
          } else {
            // find 's1' and 's2' documents
            doc1 = await Stocks.findOne({ stock: s1Name });
            
            doc2 = await Stocks.findOne({ stock: s2Name });
          }
          
          // computing like difference for respective stock
          rel_likes1 = ((doc1 && doc1.likes.length) || 0) - ((doc2 && doc2.likes.length) || 0);
          // computing like difference for respective stock
          rel_likes2 = ((doc2 && doc2.likes.length) || 0) - ((doc1 && doc1.likes.length) || 0);

          res.json({
            stockData: [
              { stock: stock[0], price: s1.latestPrice, rel_likes: rel_likes1 },
              { stock: stock[1], price: s2.latestPrice, rel_likes: rel_likes2 }
            ]
          });
        } else {
          let doc;
          // check like and add it to database
          if (like === 'true') {
            // find IP in likes array if don't exist add one for 'stock'
            doc = await Stocks.findOneAndUpdate(
              { stock: stock.toLowerCase() }, 
              { $addToSet: { likes: ip } }, 
              { new: true, upsert: true }
            );
          } else {
            // find documents of 'stock'
            doc = await Stocks.findOne({ stock: stock.toLowerCase() });
          }
          
          res.json(
            { 
              stockData: { 
                stock, 
                price: stockData.latestPrice, 
                likes: (doc && doc.likes.length) || 0
              }
            }
          );
        }
      } catch (error) {
        res.json({ stockData: error, likes: null });
      }
    });
    
};
const { Stocks } = require('../db/schema');
const { fetchStocks } = require('../controllers/fetchStock');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      const { stock, like } = req.query;
      // get IP address from request
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

      try {
        // fetch stock data
        const stockData = await fetchStocks(stock);

        if(stockData.error) {
          throw stockData.error;
        }

        //check if we have only one stock request
        if (stockData instanceof Array) {
          let doc1, doc2, rel_likes1, rel_likes2;
          const [s1, s2] = stockData;

          const s1Name = stock[0].toLowerCase();
          const s2Name = stock[1].toLowerCase();

          // check like and add it to database
          if (like === 'true') {
            // find IP in likes array if don't exist add one for 's1`' and 's2' 
            doc1 = await Stocks.findOneAndUpdate(
              { stock: s1Name }, 
              { $addToSet: { likes: ip } },
              { new: true, upsert: true }
            );
            
            doc2 = await Stocks.findOneAndUpdate(
              { stock: s2Name }, 
              { $addToSet: { likes: ip } }, 
              { new: true, upsert: true }
            );
          } else {
            // find 's1' and 's2' documents
            doc1 = await Stocks.findOne({ stock: s1Name });
            
            doc2 = await Stocks.findOne({ stock: s2Name });
          }
          
          // computing like difference for respective stock
          rel_likes1 = ((doc1 && doc1.likes.length) || 0) - ((doc2 && doc2.likes.length) || 0);
          // computing like difference for respective stock
          rel_likes2 = ((doc2 && doc2.likes.length) || 0) - ((doc1 && doc1.likes.length) || 0);

          res.json({
            stockData: [
              { stock: stock[0], price: s1.latestPrice, rel_likes: rel_likes1 },
              { stock: stock[1], price: s2.latestPrice, rel_likes: rel_likes2 }
            ]
          });
        } else {
          let doc;
          // check like and add it to database
          if (like === 'true') {
            // find IP in likes array if don't exist add one for 'stock'
            doc = await Stocks.findOneAndUpdate(
              { stock: stock.toLowerCase() }, 
              { $addToSet: { likes: ip } }, 
              { new: true, upsert: true }
            );
          } else {
            // find documents of 'stock'
            doc = await Stocks.findOne({ stock: stock.toLowerCase() });
          }
          
          res.json(
            { 
              stockData: { 
                stock, 
                price: stockData.latestPrice, 
                likes: (doc && doc.likes.length) || 0
              }
            }
          );
        }
      } catch (error) {
        res.json({ stockData: error, likes: null });
      }
    });
    
};
