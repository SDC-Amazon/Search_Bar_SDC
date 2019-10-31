const { getAllProducts } = require('./sdcDb');
const express = require('express');

const app = express();
const port = 3000;

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

app.listen(port, ()=>{
  console.log(`Listening on port ${port}...`);
})