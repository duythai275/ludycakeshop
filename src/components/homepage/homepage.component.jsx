import React from 'react';
import { connect } from 'react-redux';

import './homepage.styles.css';
import { config } from '../../config';
    
const Homepage = ({ categories }) => {

  return ( 
    categories.map( category => 
      <div className="menuItem" key={category._id}>
        <div className="cateBackground"
          style={{
            backgroundImage: `url("${config.backendURL}/categories/${category.image}")`
          }}
        ></div>
        <div className="cateItem">
          <h1 className="cateTitle">{category.name}</h1>
          <span className="cateSubTitle">SHOP NOW</span>
        </div>
      </div>
    )
  )
}

const mapStateToProps = state => ({
  categories: state.categories.categories
});

export default connect(mapStateToProps)(Homepage);