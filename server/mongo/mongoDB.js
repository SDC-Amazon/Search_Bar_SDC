const mongoose = require('mongoose');
const { Products } = require('./mongoSchema');

// Connect database
let port = 'localhost'
// Avoid deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(`mongodb://${port}:27017/products`)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`mongo database connected!`)
})


const getProducts = async (searchString, callback) => {
  console.log(`Searching mongo for ${searchString}...`);
  // const nameParam = {name: new RegExp(searchString, 'i')};
  const descParam = {description: searchString};
  try {
    const descProducts = await Products.find({ $text: { $search: searchString}}).limit(10);
    callback(null, descProducts);
  }catch(e){
    callback(e, null);
  }
}

const getAllProducts = async (callback) => {
  try{
    let products = await Products.find({}).limit(10);
    callback(null, products);
  }catch(e){
    callback(e, null);
  }
}

const getOne = async (productName, callback) => {
  try{
    let product = await Products.find({ $text: { $search: productName}}).limit(10);
    callback(null, product)
  }catch(e){
    callback(e, null);
  }
}

const getProductById = async (productId, callback) => {
  try{
    let product = await Products.findOne({_id: productId});
    callback(null, product);
  }catch(e){
    callback(e, null);
  }
}

module.exports.getOne = getOne;
module.exports.getProducts = getProducts;
module.exports.getProductById = getProductById;
module.exports.getAllProducts = getAllProducts;

// mongoimport -d products -c products --type CSV --file products.csv --headerline