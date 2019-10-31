import React from 'react';
import axios from 'axios'


class SearchBar extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            searchString : '',
            data : [],
            cartCount : 0
        }

        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.getCartCount = this.getCartCount.bind(this);
    }

    handleSearchBarChange(event) {
        this.setState({searchString: event.target.value})
    }

    handleCategoryChange(event) {
        this.setState({category: event.target.value})
        console.log(this.state.category);
    }

    submitSearch(searchString) {
        console.log("submitting search", searchString);
        axios.get('http://ec2-13-59-243-41.us-east-2.compute.amazonaws.com/search/' + searchString)
        .then((res) => {
            console.log("submitSearch returned ", res.data.id);
            const event = new CustomEvent('updateProduct', {detail : res.data.id});
            window.dispatchEvent(event);
            this.setState({searchString : ''});
            })
            .catch((err) => {
                console.log('submitSearch ERROR: ', err);
            })
    }

    getCartCount() {
        console.log("SearchBar's getCartCount invoked")
        axios.get('http://ec2-13-59-243-41.us-east-2.compute.amazonaws.com/cartCount')
            .then((res) => {     
                return res.data.reduce((acc, cur) => acc + cur.qty, 0);
                // console.log("getCartCount response = ", res.data)
            })
            .then((res) => {
                console.log("res = ", res)
                this.setState({
                    cartCount : res
                })
                console.log("cartCount = ", this.state.cartCount)
            })
            .catch((err) => {
                console.log('getCartCount ERROR: ', err)
            }) 
    }

    componentDidMount() {
        window.addEventListener('addToCart', (event) => {
            console.log("addToCart event heard");
            this.getCartCount();
        })
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.submitSearch(this.state.searchString);
        }
    }

    render() {
        return (
            <div className="nav-container">
                    <div className="hamburger-menu"></div>
                    <div className="farmazon-logo"></div>
                    <div className="search-bar-container">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <select className="categorySelect">
                                    <option value='0'>All</option>
                                    <option value='1'>Clothing</option>
                                    <option value='2'>Cooking</option>
                                    <option value='3'>Books</option>
                                    <option value='4'>Toys</option>
                                </select>
                            </span>
                            <input type="text" className="form-control" value = {this.state.searchString} onChange = {this.handleSearchBarChange} onKeyPress={this.handleKeyPress.bind(this)} placeholder="Search for Clothing, Cooking, Books, and Toys..."></input>
                            <span className="input-group-addon">
                                <button className="buttonStyle" title="Go" value="Go" onClick={this.submitSearch.bind(this, this.state.searchString)} ></button>
                            </span>
                        </div>
                    </div>
                <span className="globe-container">
                    <span className="globe-img-2"></span>
                    <span className="icp-nav-language">EN</span>
                </span>
                {/* <span className="nav-accounts-container"> */}
                    {/* <span className="nav-line-hello">Hello, Sign in</span> */}
                    <span className="nav-line-2">Account & Lists<span className="nav-icon"></span></span>
                {/* </span> */}
                <span className="nav-line-2">Orders<span className="nav-icon"></span></span>
                <span className="nav-line-2">Try Prime<span className="nav-icon"></span></span>
                <div className="nav-cart-container"><div className="nav-cart-img"><span className="navbar-cart-count">{this.state.cartCount ? this.state.cartCount : null}</span></div><span className="navbar-cart-text">Cart</span></div>
            </div>
        )
    }
}

export default SearchBar;