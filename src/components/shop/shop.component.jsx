import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './shop.styles.css';
import { config } from '../../config';

import { selectCategories } from '../../redux/category/category.selector';

const Shop = ({ categories, history }) => (
    <div className="shoppingPage">
        {
            categories.map( category => (
                <div key={category.categoryID} className="category">
                    <h1 className="title">
                        <Link to={`/category/${category.categoryID}`}>{category.categoryName}</Link>
                    </h1>
                    
                    <div className="items">
                        {
                            category.products.map( product => {
                                const image = {
                                    width: "100%",
                                    height: "95%",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    marginBottom: "5px",
                                    border: "1px solid black",
                                    backgroundImage: `url(data:image;base64,${product.productImage})`
                                };
                                return(
                                <div key={product.productID} className="item" onClick={() => history.push(`/product/${product.productID}`)}>
                                    <div style={image}/>
                                    <div className="itemFooter">
                                        <span className="name">{product.productName}</span>
                                        <span className="price">${product.unitPrice}</span>
                                    </div>
                                </div>)}
                            )
                        }
                    </div>
                </div>
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    categories: selectCategories
});
  
export default connect(mapStateToProps)(Shop);