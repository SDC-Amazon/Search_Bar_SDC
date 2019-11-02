// This might do something I'm not sure
require('newrelic');
const faker = require('faker');
const { getAllProducts, getProducts, getOne } = require('./postgresDB');
// const { getAllProducts, getProducts, getOne } = require('./mongoDB');
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname + '/../dist/')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/all', (req, res) => {
  getAllProducts((err, results) => {
    if(err){
      throw err;
    }else{
      res.send(results);
    }
  })
})

app.get('/search/:searchString', (req, res) => {
  console.log('search')
  getProducts(req.params.searchString, (err, results) => {
    if(err){
      throw err
    }else{
      console.log(results.length, 'products found')
      res.send(results);
    }
  })
})

app.get('/one', (req, res) => {
  getOne(faker.commerce.productName(), (err, results) => {
    if(err){
      throw err
    }else{
      res.send(results);
    }
  })
})

app.listen(port, ()=>{
  console.log(`Listening on port ${port}...`);
})