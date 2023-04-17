import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import {config} from './config';

import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';
import Homepage from './components/homepage/homepage.component';
import Shop from './components/shop/shop.component';
import Categorypage from './components/categorypage/categoryProducts.component';
import Productpage from './components/productpage/product.page';
import BulkorderPage from './components/bulkorder/bulkorder.page';
import ShoppingContext from './contexts/shoppingCart.context';
import Checkoutpage from './components/checkoutPage/checkout.page';
import { fetchCategories } from './redux/category/category.action';
import { fetchProducts } from './redux/product/product.action';
import { Spin } from 'antd';

function App({ setCategories,setProducts }) {
  const [loading,setLoading] = useState(false);
  useEffect( () => {
    setLoading(true);
    Promise.all([
      fetch(`${config.backendURL}/categories`).then( res => res.json()),
      fetch(`${config.backendURL}/products`).then( res => res.json())
    ])
    .then( arr => {
      setCategories( 
        arr[0].map( category => {
          category["products"] = arr[1].filter( product => product.categoryID === category.categoryID );
          return category;
        })
      )
      setProducts(arr[1]);
      setLoading(false);
    })
  }, []);

  const [cartItems,setCartItems] = useState([]);
  const handleCartItems = newCartItems => {
    setCartItems(newCartItems);
  }

  return (
    <ShoppingContext.Provider value={{cartItems, handleCartItems}}>
      <div className="appWrapper">
        <Header />
        <div className="contentContainer">
          <div className="content">
            { loading ? <div className="loadingSpin"><Spin size="large" /></div> : <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/ludycakeshop" component={Homepage} />
              <Route exact path="/shop" component={Shop} />
              <Route exact path="/checkout" component={Checkoutpage} />
              <Route exact path='/category/:categoryid' component={Categorypage} />
              <Route exact path='/product/:productid' component={Productpage} />
              <Route exact path='/bulkorder/:code' component={BulkorderPage} />
            </Switch> }
          </div>
        </div>
        <Footer />
      </div>
    </ShoppingContext.Provider>
  );
}

const mapDispatchToProps = dispatch => ({
  setCategories: categories => dispatch(fetchCategories(categories)),
  setProducts: products => dispatch(fetchProducts(products))
});

export default connect(null, mapDispatchToProps)(App);
