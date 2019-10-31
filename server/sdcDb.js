const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'me',
  password: 'password',
  database: 'sdc'
})

client.connect()
  .then(() => console.log('database connected!'));

const getAllProducts = async (callback) => {
  let query = `SELECT * FROM products;`;
  await client
    .query(query)
    .then((results) => callback(null, results))
    .catch((err) => callback(err, null))
  
}

module.exports.getAllProducts = getAllProducts;