const mongoose = require('mongoose');

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

const getProducts = () => {

}

const getAllProducts = () => {

}


module.exports.getProducts = getProducts;
module.exports.getAllProducts = getAllProducts;