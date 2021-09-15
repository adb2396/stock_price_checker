const { Stocks } = require('../db/schema');
const { fetchStock } = require('../controllers/fetchStock');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      const { stock, like } = req.query;
      // get IP address from request
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
      
      try {
        // check if we have only one stock request
        if (stock instanceof Array) {
          let doc1, doc2;
          const [s1, s2] = stock;
          // fetch stock data for 's1'
          const data1 = await fetchStock(s1);
          // fetch stock data for 's2'
          const data2 = await fetchStock(s2);
          // check like and add it to database
          if (like) {
            // find IP in likes array if don't exist add one for 's1`' and 's2' 
            doc1 = await Stocks.updateOne({ stock: s1 }, { $addToSet: { likes: ip } }, { upsert: true });
            
            doc2 = await Stocks.updateOne({ stock: s2 }, { $addToSet: { likes: ip } }, { upsert: true });

          } else {
            // find 's1' and 's2' documents
            doc1 = await Stocks.findOne({ stock: s1 });
            
            doc2 = await Stocks.findOne({ stock: s2 });
          }
          

          // computing like difference for respective stock
          let  rel_likes1 = doc1.likes.length - doc2.likes.length;
          let  rel_likes2 = doc2.likes.length - doc1.likes.length;
          if (data1.error || data2.error) {
            res.json([{ stock: s1, rel_likes: rel_likes1 }, { stock: s2, rel_likes: rel_likes2 }]);
          } else {
            res.json([
              { stock: s1, price: data1.latestPrice, rel_likes: rel_likes1 },
              { stock: s2, price: data2.latestPrice, rel_likes: rel_likes2 }
            ]);
          }
        } else {
          let doc;
          // fetch stock data for 'stock'
          const data = await fetchStock(stock);
          // check like and add it to database
          if (like) {
            // find IP in likes array if don't exist add one for 'stock'
            doc = await Stocks.updateOne({ stock }, { $addToSet: { likes: ip } }, { upsert: true });
          } else {
            // find documents of 'stock'
            doc = await Stocks.findOne({ stock });
          }
          
          if (data.error) {
            res.json([{ stock, likes: doc.likes.length }]);
          } else {
            res.json([{ stock, price: data1.latestPrice, likes: stock.likes.length }]);
          }
        }
      } catch (error) {
        res.json({ stockData: "external source error", likes: null });
      }
    });
    
};
