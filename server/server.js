// This might do something I'm not sure
require('newrelic');
const faker = require('faker');
const { getAllProducts, getProducts, getProductById, getOne } = require('./postgresDB');
// const { getAllProducts, getProducts, getOne, getProductById } = require('./mongoDB');
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname + '/../dist/')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/all', (req, res) => {
  console.time('all')
  getAllProducts((err, results) => {
    if(err){
      throw err;
    }else{
      console.timeEnd('all')
      res.send(results);
    }
  })
})

app.get('/search/:searchString', (req, res) => {
  console.log('search')
  console.time('search input')
  getProducts(req.params.searchString, (err, results) => {
    if(err){
      throw err
    }else{
      console.timeEnd('search input')
      res.send(results);
    }
  })
})

app.get('/one', (req, res) => {
  console.time('name')
  getOne(faker.commerce.productName(), (err, results) => {
    if(err){
      throw err
    }else{
      console.timeEnd('name')
      // console.log(results);
      res.send(results);
    }
  })
})

app.get('/faker', (req, res) => {
  res.send(faker.lorem.sentence());
})

app.get('/id', (req, res) => {
  const randomId = Math.floor(Math.random() * 10e6);
  console.time('id')
  getProductById(randomId, (err, results) => {
    if(err){
      throw err
    }else{
      console.timeEnd('id')
      res.send(results);
    }
  })
})

app.get('/description', (req, res) => {
  console.time()
  getProducts(faker.lorem.sentences(3), (err, results) => {
    if(err){
      throw err
    }else{
      console.timeEnd()
      console.log(results);
      res.send(results);
    }
  })
})

app.listen(port, ()=> {
  console.log(`Listening on port ${port}...`);
})