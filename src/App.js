import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import {config} from './config';

import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';
import Homepage from './components/homepage/homepage.component';
import Shop from './components/shop/shop.component';
import { Promotion } from './components/promotion/promotion.component';
import { Aboutus } from './components/aboutus/aboutus.component';

import { fetchCategories } from './redux/category/category.action';

function App({ setCategories }) {

  useEffect( () => {
    Promise.all([
      fetch(`${config.backendURL}/category`).then( res => res.json()),
      fetch(`${config.backendURL}/product`).then( res => res.json()),
      fetch(`${config.backendURL}/productCategory`).then( res => res.json())
    ])
    .then( arr => {
      setCategories( 
        arr[0].map( category => {
          category["products"] = arr[2].filter( 
                                    productCategory => category._id === productCategory.category 
                                 ).map( 
                                      productCategory => arr[1].find( product => product._id === productCategory.product ) 
                                 );
          return category;
        })
      )
    })
  })

  return (
    <div>
      <Header />
      <div className="contentContainer">
        <div className="content">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path='/promotion' component={Promotion} />
            <Route exact path='/aboutus' component={Aboutus} />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setCategories: categories => dispatch(fetchCategories(categories))
});

export default connect(null, mapDispatchToProps)(App);
