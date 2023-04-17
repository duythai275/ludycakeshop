import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './homepage.styles.css';
import { config } from '../../config';

import { selectCategories } from '../../redux/category/category.selector';
    
const Homepage = ({ categories, history }) => {

  return ( 
    categories.map( category => {

      const cateBackground = {
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(data:image;base64,${category.categoryImage})`
      };
      
      return(
      <div className="menuItem" key={category.categoryID} onClick={() => history.push(`/category/${category.categoryID}`)}>
        <div style={cateBackground} ></div>
        <div className="cateItem">
          <h1 className="cateTitle">{category.categoryName}</h1>
          <span className="cateSubTitle">SHOP NOW</span>
        </div>
      </div>)
      }
    )
  )
}

const mapStateToProps = createStructuredSelector({
  categories: selectCategories
});

export default withRouter(connect(mapStateToProps)(Homepage));