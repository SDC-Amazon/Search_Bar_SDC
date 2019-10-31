import React from 'react';
import axios from 'axios';
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown-now';
import Moment from 'react-moment';

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            optionValue : 1,
            currentProduct: 1,
            hours: 0,
            min: 0,
            sec: 0,
        };

        this.getData = this.getData.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderer = this.renderer.bind(this);
    }

    componentDidMount() {
        window.addEventListener('updateProduct', (event) => {
            this.setState({
                currentProduct: event.detail,
                optionValue: 1
            })
            this.getData();
        })
        this.getData();

    }

    getData() {
        console.log("getData invoked, productID = ", this.state.currentProduct);
        axios.get('http://ec2-13-59-243-41.us-east-2.compute.amazonaws.com/getData/' + this.state.currentProduct)
        .then((res) => {
            this.setState({
                data : res.data[0]
            })
        })
        .catch((err) => {
            console.log('GETDATA ERROR: ', err)
        })    
    }

    updateQty(qty) {
        const event = new CustomEvent('addToCart', {
            detail: qty
        });
        window.dispatchEvent(event);
    }

    addToCart(qty) {
        console.log("addToCart invoked, qty = ", qty)
        
        axios.post('http://ec2-13-59-243-41.us-east-2.compute.amazonaws.com/addToCart', {
            qtyToAdd: qty,
            productNum : this.state.currentProduct
        })
        .then((response) => {
            console.log("addToCart response = ", response)
            this.getData();
            this.updateQty(qty);
            
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            })
    }

    handleChange(event) {
        this.setState({optionValue: event.target.value})
    }

    renderer({hours, minutes, seconds}) {

            return <span> {hours} hrs {minutes} mins</span>
    }
    

    render() {
        return (  
            <div className="jj-cart-container">
                <div className="jj-cart">
                    <div className="jj-cart-inner">
                        <div className="jj-cart-price-text">${this.state.data ? this.state.data.price : null}</div>
                        
                        {this.state.data && this.state.data.prime && (
                        <span className="jj-cart-prime-status-container">
                            <div className="jj-cart-prime-status"><span className="jj-cart-prime-shipping-text">FREE Two-Day</span></div>
                            <div className="jj-free-delivery">FREE delivery: <span className="jj-delivery-date">Wednesday</span></div>
                            <div className="jj-order-in">Order in the next 
                                <Countdown date={new Date('October 28, 2019 17:00')} renderer={this.renderer}/>
                            </div>
                        </span>)
                        }
                            <div className="jj-cart-stock-status">In Stock.</div>
                        <form>
                            <select className="jj-cart-qty-select" value={this.state.optionValue} onChange={this.handleChange}>
                                <option defaultValue disabled>Qty: </option>
                                <option value = "1">1</option>
                                <option value = "2">2</option>
                                <option value = "3">3</option>
                            </select>
                        </form>
                        <div className="jj-cart-buttons-container">
                            <div className="jj-add-to-cart-button-container">
                                <button className = "jj-add-to-cart-button" onClick={this.addToCart.bind(this, this.state.optionValue)}><span className="jj-add-to-cart-button-text" >Add to Cart</span></button>
                            </div>
                            <div className="jj-buy-now-button-container">
                                <button className = "jj-buy-now-button">Buy Now</button>
                            </div>
                            <div className="jj-fufilled-by">Fufilled by Farmzaon, Inc.</div>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}


export default Cart;