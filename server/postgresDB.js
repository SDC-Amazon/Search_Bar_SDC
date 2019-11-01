const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'sdc'
})

client.connect()
  .then(() => console.log('postgres database connected!'))
  .catch(() => console.log('Error connecting with postgres'))

/**
 *  If input string is a "product id" numbered 0 - 9999999, will return the single 
 *  entry with the matching id. Else, return entries will be the first 10 items
 *  that contain the input string in the name
 */
const getProducts = async (searchString, callback) => {
  console.log(`querying for product ${searchString}...`);
  const query = (Number(searchString) < 10000000 || Number(searchString) >= 0) ? 
      `SELECT * FROM products WHERE id = ${searchString}` :
      `SELECT * FROM products WHERE name LIKE '%${searchString}%'`;
  const limit = 10;
  await client
    .query(`${query} LIMIT ${limit}`)
    .then((results) => callback(null, results))
    .catch((err) => callback(err, null))
}


const getAllProducts = async (callback) => {
  console.log('querying ALL db...')
  let query = `SELECT * FROM products;`;
  await client
    .query(query)
    .then((results) => callback(null, results))
    .catch((err) => callback(err, null))
}


module.exports.getProducts = getProducts;
module.exports.getAllProducts = getAllProducts;