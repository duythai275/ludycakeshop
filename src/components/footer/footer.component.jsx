import React from 'react';

import addressImage from '../../photos/footer.jpg';
import instagramIcon from '../../photos/social-instagram.svg';
import facebookIcon from '../../photos/social-media-facebook-1.svg';

import './footer.styles.css';

export const Footer = () => (
    <div className='footerContainer'>
        <div className='contact'>
            <img src={addressImage} alt=""/>
        </div>
        <div className='footer'>
            <div className='copyright'>&copy;Thai Nguyen</div>
            <div className='socialNetwork'>
                <a href="https://www.facebook.com/Hiep-Hoa-Asian-Food-Market-111881587191113">
                    <img src={facebookIcon} alt=""/>
                </a>
                <a href="https://www.instagram.com/hiep_hoa_asian_food_market/">
                    <img src={instagramIcon} alt=""/>
                </a>
            </div>
        </div>
    </div>
)