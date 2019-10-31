const { getAllProducts, getProduct } = require('./sdcDb');
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
  getProduct(req.params.searchString, (err, results) => {
    if(err){
      throw err
    }else{
      console.log(results.rows);
      res.send(results);
    }
  })
})

app.listen(port, ()=>{
  console.log(`Listening on port ${port}...`);
})