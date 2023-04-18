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

    const product = categories.reduce(
        (acc,cur) => [
            ...acc,
            ...cur.products
        ]
    , [] ).find( c => `${c.productID}` === match.params.productid );

    const addToCart = () => {
        success();
        handleCartItems( cartItems.find( ({name}) => name === product.productName ) ? 
            cartItems.map( cartItem => cartItem.name === product.productName ? ({
                ...cartItem,
                quantity: cartItem.quantity + parseInt(quantity),
                total: Math.round(product.unitPrice * (cartItem.quantity + parseInt(quantity)) * 100) / 100
            }) : cartItem )
        : 
            [
                ...cartItems,
                ...[{
                    productID: product.productID,
                    name: product.productName,
                    price: product.unitPrice,
                    quantity: parseInt(quantity),
                    total: Math.round(product.unitPrice * quantity * 100) / 100
                }]
            ]);
    } 

    return <div className="productContainer">
        {contextHolder}
        {product && <>
            <div className="halfPage1">
                <div className="productName">{product.productName}</div>
                <div className="productImage">
                    <img src={`data:image;base64,${product.productImage}`} />
                </div>
            </div>
            <div className="halfPage">
                <div className="productDescription">
                    <p>{product.productDescription}</p>
                    <div><strong>Price: </strong>${product.unitPrice}</div>
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
        </>}
    </div>
}

const mapStateToProps = createStructuredSelector({
    categories: selectCategories
});

export default withRouter(connect(mapStateToProps)(Productpage))