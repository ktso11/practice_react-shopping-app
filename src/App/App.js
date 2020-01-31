import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//components
import Product from '../product/product';
import WishList from '../wishlist/wishlist'

//services
import HttpService from '../services/http-service';

const http = new HttpService();

class App extends Component {

  constructor(props){
    super(props)

    //if null, it can be an issue, so initizing an empty arr prevents err
    this.state = {products:[]}

    //bind functions - should do this for every function
    this.loadData = this.loadData.bind(this);
    this.productList = this.productList.bind(this)

    this.loadData();
  }

  // Step By Step
  // we load the data
  // when loaded, we set state to prompt refresh
  // we can't access 'this' inside a promise
  //'this' is referring to the promise instead of the component
  // hence we have to declar self = this
  // we pass in the data we got from the server, render will be called again
  // within render it calls the productlist function, maps every item in the arr and put into the component we want to use 

  loadData = () => {
    var self = this;
    http.getProducts().then(data => {
      //it will reload that component and every comp inside it. fetch data and reload UI
      self.setState({products: data})
      console.log(data)
    }, err => {
    });
  }

  // <Product title={product.title} price={product.price} imgURL={product.imgUrl} />
  productList = () => {
    const list = this.state.products.map((product) => 
      <div className="col-sm-4" key={product._id}>
        <Product product = { product } />
      </div>
    )
    return (list)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome the shhhoo</h2>
        </div>
        <main className="container App-main">
          <div className="row">
            <div className="col-sm-8">
              <div className="row">
                {this.productList()}
              </div>

            </div>
            <div className="col-sm-4">
              <WishList />
            </div>

          </div>
        </main>
      </div>
    );
  }
}

export default App;
