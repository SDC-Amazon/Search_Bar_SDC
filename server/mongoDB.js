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
  console.log(`Searching for ${searchString}`);
  const param = {name: new RegExp(searchString, 'i')};
  try {
    let products = await Products.find(param).limit(15);
    callback(null, products);
  }catch(e){
    callback(e, null);
  }
}

const getAllProducts = async (callback) => {
  console.log('....Finding All.....')
  try{
    let products = await Products.find({}).limit(15);
    callback(null, products);
  }catch(e){
    callback(e, null);
  }
}

module.exports.getProducts = getProducts;
module.exports.getAllProducts = getAllProducts;