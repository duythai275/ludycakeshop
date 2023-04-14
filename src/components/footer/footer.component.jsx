import React from 'react';

import addressImage from '../../assets/location.png';

import './footer.styles.css';

export const Footer = () => (
    <div className='footerContainer'>
        <div className='contact'>
            <div className='blockContact'>
                <div className="footerTitle">LUDY'S CAKE SHOP</div>
                <div className="footerSubTitle">10708-134 Ave, Edmonton AB T5E 1J8</div>
                <div className="footerSubTitle">Tel:(780) 473-4336</div>
                <div className="footerImage">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2367.9026918586787!2d-113.50786858415218!3d53.59519788003194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0237e8a7100f9%3A0xeb5243f9ca43a58f!2sCakes%20By%20Ludy!5e0!3m2!1sen!2sca!4v1681349552493!5m2!1sen!2sca" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div className='blockContact'>
                <div className="footerTitle">Opening Hours</div>
                <div className="footerTable1">
                    <table cellSpacing={5}>
                        <tr>
                            <td>Monday</td>
                            <td>10 a.m - 8 p.m</td>
                        </tr>
                        <tr>
                            <td>Tuesday</td>
                            <td>10 a.m - 8 p.m</td>
                        </tr>
                        <tr>
                            <td>Wednesday</td>
                            <td>10 a.m - 8 p.m</td>
                        </tr>
                        <tr>
                            <td>Thursday</td>
                            <td>10 a.m - 8 p.m</td>
                        </tr>
                        <tr>
                            <td>Friday</td>
                            <td>10 a.m - 8 p.m</td>
                        </tr>
                        <tr>
                            <td>Saturday</td>
                            <td>10 a.m - 5 p.m</td>
                        </tr>
                        <tr>
                            <td>Sunday</td>
                            <td>10 a.m - 3 p.m</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className='blockContact'>
                <div className="footerTitle">All Categories</div>
                <div className="footerSubTitle">Cakes Roles</div>
                <div className="footerSubTitle">Yame Cakes</div>
                <div className="footerSubTitle">Empanada</div>
                <div className="footerSubTitle">Breads</div>
            </div>
        </div>
    </div>
)