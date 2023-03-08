import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { InputNumber, message } from 'antd';
import './product.styles.css';
import { config } from "../../config";
import ShoppingContext from '../../contexts/shoppingCart.context';
import { selectCategories } from '../../redux/category/category.selector';

const Productpage = ({ categories, match }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Added to Shopping Cart',
        });
      };

    const { cartItems, handleCartItems } = useContext(ShoppingContext);
    const [quantity, setQuantity] = useState(1);
    const products = [
        ...categories[0].products,
        ...categories[1].products,
        ...categories[2].products,
        ...categories[3].products
    ]
    const product = products.find( c => `${c._id}` === match.params.productid );

    const addToCart = () => {
        success();
        handleCartItems([
            ...cartItems,
            ...[{
                name: product.name,
                price: product.price,
                quantity: parseInt(quantity),
                total: Math.round(product.price * quantity * 100) / 100
            }]
        ]);
    } 

    return <div className="productContainer">
        {contextHolder}
        <div className="halfPage1">
            <div className="productName">{product.name}</div>
            <div className="productImage">
                <img src={`${config.backendURL}/${product.image}.jpg`} />
            </div>
        </div>
        <div className="halfPage">
            <div className="productDescription">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div><strong>Price: </strong>${product.price}</div>
            </div>
            <div>
                <div className="productActions"><InputNumber size='small' addonBefore={"Quantity"} min={1} value={quantity} onChange={val => setQuantity(val)} /></div>
                <div className="productActions">
                    <button type="button" class="addToCartButton" onClick={addToCart}>
                        <span>ADD TO CART</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
}

const mapStateToProps = createStructuredSelector({
    categories: selectCategories
});

export default withRouter(connect(mapStateToProps)(Productpage))