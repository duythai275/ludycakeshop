import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.css';

import logo from '../../assets/logo.jpg';

const CartIcon = () => <></>

export const Header = () => (
    <div className="headerContainer">
        <div className="header">
            <div className="logoContainer">
                <Link className="option" to="/">
                    <div>LUDY</div>
                </Link>
            </div>
            <div>
                
            </div>
            <div className="options">
                <Link className="option" to="/shop">SHOP</Link>
                {/* <Link className="option" to="/promotion">WEEKLY SPECIAL</Link> */}
                <Link className="option" to="/aboutus">ABOUT US</Link>
            </div>
        </div>
    </div>
)