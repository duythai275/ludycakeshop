import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, InputNumber, Button, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCategories } from '../../redux/category/category.selector';
import { selectProducts } from '../../redux/product/product.selector';
import './bulkorder.styles.css';

import {config} from '../../config';

const Bulkorder = ({categories, products, match}) => {
    const [open,setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [historicalOrders, setHistoricalOrders] = useState([]);
    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        address: ""
    });
    const [order,setOrder] = useState({
        total: 0,
        subtotal: 0,
        gst: 0
    });
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        if(match.params.code) {
            fetch(`${config.backendURL}/customers/${match.params.code}`)
            .then( res => res.json())
            .then( json => {
                setEmail(json.email);
            });
        }
    }, []);

    useEffect(() => {
        if ( email && email != "" ) {
            fetch(`${config.backendURL}/orders?email=${email}`)
            .then( res => res.json())
            .then( arr => {
                setHistoricalOrders(arr);
                setOrderItems(products.map( p => ({
                    itemQuantity: 0,
                    product: {
                        productID: p.productID
                    },
                    itemTotal: 0
                }) ));
            });
        }
    }, [email]); 

    useEffect(() => {
        const sum = orderItems.reduce( (acc,cur) => acc + cur.itemTotal,0);
        setOrder({
            subtotal: Math.round(sum*100)/100,
            gst: Math.round(sum) / 10,
            total: Math.round(sum * 110) / 100
        })
    }, [orderItems])

    const loadOrder = o => {
        console.log(o);
        setCustomer({
            name: o.customerName,
            phone: o.customerContactNumber,
            address: o.customerAddress,
        });
        setOrderItems(
            orderItems.map( oi => 
                o.orderItems.find( i => i.product.productID === oi.product.productID ) ?
                    o.orderItems.find( i => i.product.productID === oi.product.productID ) 
                    : {
                        ...oi,
                        itemQuantity: 0,
                        itemTotal: 0
                    }
            )
        );
        setOpen(false);
    }

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Order has been sent',
        });
    };

    const submitOrder = () => {
        if (
            customer.name !== ""
            && customer.phone !== ""
            && customer.address !== ""
            && orderItems.reduce( (acc,cur) => acc + cur.itemQuantity,0) > 0
        ) {
            fetch(`${config.backendURL}/orders`, {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify({
                    subtotal: order.subtotal,
                    gst: order.gst,
                    total: order.total,
                    customerName: customer.name,
                    customerContactNumber: customer.phone,
                    customerEmail: email,
                    customerAddress: customer.address,
                    orderItems: orderItems.filter( oi => oi.itemQuantity > 0 ).map( item => ({
                        itemQuantity: item.itemQuantity,
                        product: {
                            productID: item.product.productID
                        },
                        itemTotal: item.itemTotal
                    }))
                })
            })
            .then(res => {
                success();
                setCustomer({
                    name: "",
                    phone: "",
                    address: "",
                });
                setOrderItems(orderItems.map( oi => ({
                    ...oi,
                    itemQuantity: 0,
                    itemTotal: 0
                }) ));
            });
        }
        else {
            messageApi.open({
                type: 'error',
                content: 'Please fill out Name, Phone, and Address. The order can not be processed with no ordered item',
            });
        }
        
    }

    return <>
        {contextHolder}
        <div className="submitBulkOrder">
            <Button type="link" size={'large'} onClick={() => setOpen(true)}>
                Historical Orders
            </Button> 
            <Button type="primary" size={'large'} onClick={() => submitOrder()}>
                Send Order
            </Button> 
        </div>
        <table width="100%">
            <tr>
                <td>
                    <div>Sold To</div>
                    <div>
                        <Input value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div>Phone</div>
                    <div>
                        <Input value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div>Email</div>
                    <div>
                        <Input value={email} disabled />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div>Address</div>
                    <div>
                    <Input value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} />
                    </div>
                </td>
            </tr>
        </table>
        {orderItems.length > 0 && <table className='orderForm'>
            <tr>
                <th width="55%">Description</th>
                <th width="15%">Unit Price</th>
                <th width="15%">Quantity</th>
                <th width="15%">Total</th>
            </tr>
            {
                categories.map( category => <>
                    <tr className="categoryName">
                        <td>{category.categoryName}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {
                        category.products.map( product => <tr>
                            <td>{product.productName}</td>
                            <td>${product.unitPrice}</td>
                            <td>
                                <InputNumber 
                                    min={0} 
                                    value={orderItems.find( item => item.product.productID === product.productID ).itemQuantity}
                                    onChange={
                                        e => {setOrderItems(
                                            orderItems.map( 
                                                item => item.product.productID === product.productID ? 
                                                    {
                                                        ...item, 
                                                        itemQuantity: e, 
                                                        itemTotal: Math.round(parseInt(e) * product.unitPrice * 100) / 100 
                                                    } 
                                                    : item 
                                            )
                                        )}
                                    }
                                />
                            </td>
                            <td>{orderItems.find( item => item.product.productID === product.productID ).itemTotal}</td>
                        </tr>)
                    }
                </>)
            }
            <tr>
                <td></td>
                <td><strong>Total</strong></td>
                <td><strong></strong></td>
                <td><strong>${order.subtotal}</strong></td>
            </tr>
            <tr>
                <td></td>
                <td><strong>GST</strong></td>
                <td></td>
                <td><strong>${order.gst}</strong></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td><strong>${order.total}</strong></td>
            </tr>
        </table>}
        <Modal
            title="Historical Orders"
            centered
            open={open}
            footer={null}
            style={{ height: '500px' }}
            onCancel={() => setOpen(false)}
        >
        {
            <div className="historicalOrderWrapper">{
                historicalOrders.map( o => (
                    <>
                        <br></br>
                        <Button size={'small'} onClick={e => loadOrder(o)}>
                        {
                            o.orderDate
                        }
                        </Button> 
                        <table width="100%">
                            {
                                o.orderItems.map( oi => (<tr>
                                    <td>{oi.product.productName}</td>
                                    <td>{oi.itemQuantity}</td>
                                    <td>{oi.itemTotal}</td>
                                </tr>))
                            }
                            <tr>
                                <td width="50%"><strong>Total</strong></td>
                                <td width="25%"></td>
                                <td width="25%"><strong>${o.total}</strong></td>
                            </tr>
                        </table>
                    </>
                ))
            }</div>
        }
        </Modal>
    </>
}

const mapStateToProps = createStructuredSelector({
    categories: selectCategories,
    products: selectProducts
});

export default withRouter(connect(mapStateToProps)(Bulkorder));