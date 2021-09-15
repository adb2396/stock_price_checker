const { Schema, model } = require('mongoose');

const stocksSchema = new Schema({
    stock: {
        type: String,
        required: true
    },
    likes: [String]
});

exports.Stocks = model('Stocks', stocksSchema);