const express = require('express');
const app = express();
const path = require('path');
const db = require('./db.js')
const cors = require('cors');


app.use(express.static(path.join(__dirname + '/../dist/')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/getData/:itemId', (request, response) => {
    console.log("server /getData itemId = ", request.params.itemId);
    db.getProductData((err, results) => {
        if (err) {
            console.log('GETPRODUCTDATAERROR: ', err);
        }
        else {
            response.send(results);
            console.log('sending data from server');
        }
        response.end();
    },request.params.itemId)
})

app.get('/search/:searchString', (request, response) => {
    db.searchProducts((err, results) => {
        if (err) {
            console.log('/search ERROR: ', err);
        }
        else {
            response.send(results);
            console.log('sending data from server');
        }
        response.end();
    }, request.params.searchString)
})

app.post('/addToCart', (request, response) => {
    db.addToCart((err, results) => {
        if (err) {
            console.log('addToCartERROR: ', err);
        } else {
            response.send(results);
            console.log('addToCart Success');
        }
        response.end();
    }, request.body.productNum, request.body.qtyToAdd)
})

app.get('/cartCount', (request, response) => {
    console.log("server cartCount endpoint hit")
    db.getCartCount((err, results) => {
        if (err) {
            console.log("cartCount server side error: ", err)
        } else {
            response.send(results);
        }
    });
})

app.listen(3003, () => console.log("personal server running on port 3003"));
