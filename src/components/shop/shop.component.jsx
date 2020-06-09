import React from 'react';
import { connect } from 'react-redux';

import './shop.styles.css';
import { config } from '../../config';

const Shop = ({ categories }) => (
    <div className="shoppingPage">
        {
            categories.map( category => (
                <div key={category._id} className="category">
                    <h1 className="title">{category.name}</h1>
                    <div className="items">
                        {
                            category.products.filter( (product, index) => index < 4 ).map( product => 
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
            ))
        }
    </div>
)

const mapStateToProps = state => ({
    categories: state.categories.categories
});
  
export default connect(mapStateToProps)(Shop);