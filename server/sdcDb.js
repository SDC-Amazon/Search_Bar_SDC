const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'sdc'
})

client.connect()
  .then(() => console.log('database connected!'));

const getAllProducts = async (callback) => {
  console.log('querying ALL db...')
  let query = `SELECT * FROM products;`;
  await client
    .query(query)
    .then((results) => callback(null, results))
    .catch((err) => callback(err, null))
}

const getProduct = async (searchString, callback) => {
  console.log(`querying for product ${searchString}...`);
  let query = `SELECT * FROM products WHERE id = ${searchString}`;
  await client
    .query(query)
    .then((results) => callback(null, results))
    .catch((err) => callback(err, null))
}


module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;