import React from 'react';

import addressImage from '../../assets/footer.jpg';
import instagramIcon from '../../assets/social-instagram.svg';
import facebookIcon from '../../assets/social-media-facebook-1.svg';

import './footer.styles.css';

export const Footer = () => (
    <div className='footerContainer'>
        <div className='contact'>
                <table>
                    <tr>
                        <td align='center'>
                            <span className="footerTitle">LUDY'S CAKE SHOP</span>
                        </td>
                    </tr>
                    <tr>
                        <td align='center'>
                            10708-134 Ave, Edmonton AB T5E 1J8
                        </td>
                    </tr>
                    <tr>
                        <td align='center'>
                            Tel:(780) 473-4336
                        </td>
                    </tr>
                </table>
        </div>
        {/* <div className='footer'>
            <div className='copyright'>&copy;Thai Nguyen</div>
            <div className='socialNetwork'>
                <a href="https://www.facebook.com/Hiep-Hoa-Asian-Food-Market-111881587191113">
                    <img src={facebookIcon} alt=""/>
                </a>
                <a href="https://www.instagram.com/hiep_hoa_asian_food_market/">
                    <img src={instagramIcon} alt=""/>
                </a>
            </div>
        </div> */}
    </div>
)