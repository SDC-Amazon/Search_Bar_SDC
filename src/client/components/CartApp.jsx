import React from 'react';
import Cart from './Cart.jsx'
import axios from 'axios'

class CartApp extends React.Component {
    constructor () {
        super ()
        
        this.state = {
            data : [],
        }

        this.getData = this.getData.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.getCartCount = this.getCartCount.bind(this);
    }

    componentDidMount() {
        document.productID = 2;
        this.getData();
    }

    getData() {
        axios.get('/getData/' + document.productID)
            .then((res) => {
                this.setState({
                    data : res.data
                })
            })
        .catch((err) => {
            console.log('GETDATA ERROR: ', err)
        })    
    }

    addToCart(qty) {
        axios.post('/addToCart', {
            qtyToAdd: qty,
            productNum : document.productID
        })
            .then((response) => {
                this.getData();
                
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            })
    }

 

    getCartCount() {
        console.log("CartApp's getCartCount")
        axios.get('/cartCount')
            .then((res) => {
                this.setState({
                    allEntries : res.data
                })
                console.log("CartAppState.allEntries = ", this.state.allEntries);
                document.myCartCount = this.state.allEntries.reduce((acc, cur) => acc + Number(cur.qty), 0);
                console.log("document.myCartCount = ", document.myCartCount)
            })
            .catch((err) => {
                console.log('getCartCount ERROR: ', err)
            }) 
    }

    render() {
        return (
            <div>
                <Cart info = {this.state.data[0]} addToCart = {this.addToCart} getCartCount = {this.getCartCount} />
            </div>
        )
    }
}

export default CartApp;