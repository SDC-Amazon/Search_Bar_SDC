import React from 'react';
import axios from 'axios'
import SearchBar from './SearchBar.jsx';

class SearchApp extends React.Component {
    constructor () {
        super ()
        
        this.state = {
            data : [],
        }

        this.getData = this.getData.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    componentDidMount() {
        document.productID = 1;
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
    

    submitSearch(searchString) {
        console.log("submitting search", searchString);
        axios.get('/search/' + searchString)
            .then((res) => {
                console.log("submitSearch returned ", res.data[0].id)
                document.productID = res.data[0].id
                this.getData();
            })
            .catch((err) => {
                console.log('submitSearch ERROR: ', err);
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
        console.log("SearchApp's getCartCount")
        axios.get('/cartCount')
            .then((res) => {
                console.log(res);
                this.setState({
                    allEntries : res.data
                })
            })
            .catch((err) => {
                console.log('getCartCount ERROR: ', err)
            }) 
    }

    render() {
        return (
            <div>
                <SearchBar submitSearch = {this.submitSearch} cartCount = {this.state.cartCount} data = {this.state.allEntries}/>
            </div>
        )
    }
}

export default SearchApp;