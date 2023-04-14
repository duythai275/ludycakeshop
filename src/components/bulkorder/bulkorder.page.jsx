import React, { useState, useContext } from 'react';
import { Input, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCategories } from '../../redux/category/category.selector';
import './bulkorder.styles.css';

const Bulkorder = ({categories}) => {
    return <>
        <div className="checkoutTitle">Order Form</div>
        <table width="100%">
            <tr>
                <td>
                    <div>Sold To</div>
                    <div>
                        <Input />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div>Phone</div>
                    <div>
                        <Input />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div>Email</div>
                    <div>
                        <Input />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div>Address</div>
                    <div>
                        <Input />
                    </div>
                </td>
            </tr>
        </table>
        <table className='orderForm'>
            <tr>
                <th width="55%">Description</th>
                <th width="15%">Unit Price</th>
                <th width="15%">Quantity</th>
                <th width="15%">Total</th>
            </tr>
            {
                categories.map( category => <>
                    <tr className="categoryName">
                        <td>{category.name}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {
                        category.products.map( product => <tr>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>
                                <InputNumber min={0} />
                            </td>
                            <td></td>
                        </tr>)
                    }
                </>)
            }
            <tr>
                <td></td>
                <td><strong>Total</strong></td>
                <td><strong>12</strong></td>
                <td><strong>$120.00</strong></td>
            </tr>
            <tr>
                <td></td>
                <td><strong>GST</strong></td>
                <td></td>
                <td><strong>$12.00</strong></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td><strong>$132.00</strong></td>
            </tr>
        </table>
    </>
}

const mapStateToProps = createStructuredSelector({
    categories: selectCategories
});

export default connect(mapStateToProps)(Bulkorder);