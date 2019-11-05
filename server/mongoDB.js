const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
// connect to the pre-existing collection
const Products = mongoose.model('Products',
        new Schema({id: Number, name: String, description: String}),
        'products');

const getProducts = async (searchString, callback) => {
  console.log(`Searching mongo for ${searchString}...`);
  // const nameParam = {name: new RegExp(searchString, 'i')};
  const descParam = {description: searchString};
  try {
    // const nameProducts = await Products.find(nameParam).limit(10);
    const descProducts = await Products.find({description: searchString}).limit(10);
    // const products = nameProducts.concat(descProducts);
    callback(null, descProducts.rows);
  }catch(e){
    callback(e, null);
  }
}

const getAllProducts = async (callback) => {
  // console.log('Searching mongo for ALL documents...')
  try{
    let products = await Products.find({}).limit(10);
    callback(null, products);
  }catch(e){
    callback(e, null);
  }
}

const getOne = async (productName, callback) => {
  try{
    let product = await Products.find({name: productName}).limit(10);
    callback(null, product)
  }catch(e){
    callback(e, null);
  }
}

const getProductById = async (productId, callback) => {
  try{
    let product = await Products.findOne({id: productId});
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