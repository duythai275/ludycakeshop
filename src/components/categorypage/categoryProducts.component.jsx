import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './categoryProducts.styles.css';
import { config } from "../../config";

import { selectCategories } from '../../redux/category/category.selector';

const Categorypage = ({ categories, match }) => {
    const category = categories.find( c => c._id === match.params.categoryid );
    return ( category === undefined ) ? "" : 
            <div className="shoppingPage">
                <div className="category">
                    <h1 className="titleCate">{category.name}</h1>
                    <div className="items">
                    {
                        category.products.map( product => 
                            <div key={product._id} className="item">
                                <div className="image" style={{ backgroundImage: `url(${config.backendURL}/products/${product.image})` }}/>
                                <div className="itemFooter">
                                    <span className="name">{product.name}</span>
                                    <span className="price">${product.price}</span>
                                </div>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
}

const mapStateToProps = createStructuredSelector({
    categories: selectCategories
});

export default withRouter(connect(mapStateToProps)(Categorypage))