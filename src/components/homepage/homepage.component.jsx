import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './homepage.styles.css';
import { config } from '../../config';

import { selectCategories } from '../../redux/category/category.selector';
    
const Homepage = ({ categories, history }) => {

  return ( 
    categories.map( category => 
      <div className="menuItem" key={category._id} onClick={() => history.push(`/category/${category._id}`)}>
        <div className="cateBackground"
          style={{
            backgroundImage: `url("${config.backendURL}/${category.image}.jpg")`
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

const mapStateToProps = createStructuredSelector({
  categories: selectCategories
});

export default withRouter(connect(mapStateToProps)(Homepage));