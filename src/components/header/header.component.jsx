import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './header.styles.css';
import ShoppingContext from '../../contexts/shoppingCart.context';

const CartIcon = () => { 
    const { cartItems } = useContext(ShoppingContext);
    return <div className='cart-icon-container'>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{cartItems.reduce(( acc, cur ) => acc + cur.quantity, 0)}</span>
    </div>
}

export const Header = () => (
    <div className="headerContainer">
        <div className="header">
            <div className="options1">
                <Link className="option" to="/">
                    <div>LUDY</div>
                </Link>
            </div>
            <div className="options">
                <Link className="option" to="/shop">SHOP</Link>
                <Link className="option" to="/checkout">
                    <CartIcon />
                </Link>
            </div>
        </div>
    </div>
)