const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  test('viewing one stock', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: "goog", like: false })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          assert.equal(res.status, 200);
          assert.deepEqual(
            res.body,
            { stockData: { stock: "goog", price: 2887.47, likes: 2 } }
          );
        }
      });
    done();
  });

  test('viewing one stock and liking it', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: "goog", like: true })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          assert.equal(res.status, 200);
          assert.deepEqual(
            res.body,
            { stockData: { stock: "goog", price: 2887.47, likes: 2 } }
          );
        }
      });
    done();
  });

  test('viewing the same stock and liking it again', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: "goog", like: true })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          assert.equal(res.status, 200);
          assert.deepEqual(
            res.body,
            { stockData: { stock: "goog", price: 2887.47, likes: 2 } }
          );
        }
      });
    done();
  });

  test('viewing two stocks', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices?stock=goog&stock=msft&like=false')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          // console.log(res.body);
          assert.equal(res.status, 200);
          assert.deepEqual(
            res.body,
            {
              stockData: [
                { stock: "goog", price: 2887.47, rel_likes: 0 },
                { stock: "msft", price: 305.22, rel_likes: 0 },
              ]
            }
          );
        }
      });
    done();
  });

  test('viewing two stocks and liking them', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices?stock=goog&stock=msft&like=false')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          assert.equal(res.status, 200);
          assert.deepEqual(
            res.body,
            {
              stockData: [
                { stock: "goog", price: 2887.47, rel_likes: 0 },
                { stock: "msft", price: 305.22, rel_likes: 0 },
              ]
            }
          );
        }
      });
    done();
  });

});
