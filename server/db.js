const mongoose = require('mongoose');
const db = mongoose.connection;
const productsData = require('./products.js')
const Schema = mongoose.Schema;
var isSeeded = false;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("db connected");
});

mongoose.connect('mongodb+srv://jamesjamail:superSecretPassword@amishon-dg5is.mongodb.net/Amishon?retryWrites=true&w=majority', {useNewUrlParser: true});

var productsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  rating: Number,
  price: Number,
  prime: Boolean,
  category_id: Number,
  qty: Number
})

const products = mongoose.model('products', productsSchema);


function seedOnce() {
  if (!isSeeded) {
    products.deleteMany({}, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log('db cleared before seeding');
        products.insertMany(productsData.data, (err, res) => {
          if (err) {
            console.log(err)
          } else {
            console.log('db seeded');
          }
        })
      }
    });
  }
  isSeeded = true;
}

seedOnce();

const getProductData = (callback, itemId) => {
  console.log("db.getProductData itemId = ", itemId)
  products.find({id: itemId}, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res)
    } 
  })
}

const addToCart = (callback, itemId, qtyToAdd) => {
  console.log('addToCart invoked, itemId = ', itemId, 'qtyToAdd = ', qtyToAdd);
  products.updateOne({id: itemId}, { $inc: {qty: qtyToAdd}}, ((err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res)
    } 
  }))
}

const searchProducts = (callback, searchString) => {
  console.log('searchProducts invoked');
  products.find({name: searchString}, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      console.log("db.searchProducts results = ", results)
      if (results[0] === undefined) {
        callback(null, { id: 1, });
      } else {
        callback(null, results[0]);
      }
    } 
  })
}

const getCartCount = (callback) => {
  console.log("getCartCount invoked on db");

  products.find({}, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results)
    }
  })
}

module.exports = {getProductData, addToCart, searchProducts, getCartCount};