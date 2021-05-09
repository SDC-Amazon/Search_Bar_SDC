const mongoose = require('mongoose');


const productsSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  description: String,
})

productsSchema.index({name: 1})
productsSchema.index({description: 1})
const Products = mongoose.model('products', productsSchema);

const seedDatabase = async () => {
  await Products.countDocuments()
    .then((count) => {
      if(!count){
        Products.insertMany(generateRecords(false, true))
          .then((data) => console.log('Products inserted to Mongo database'))
          .catch((err) => console.log('Error saving products to Mongo database'))
      }
    })
    .catch((err) => console.log(err));
}

module.exports.Products = Products;
module.exports.seedDatabase = seedDatabase;