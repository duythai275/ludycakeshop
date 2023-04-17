import React, { useContext, useState, useEffect } from 'react';
import { Input, Table, InputNumber, message } from 'antd';
import ShoppingContext from '../../contexts/shoppingCart.context';
import {config} from '../../config';
import "./checkout.styles.css";

const { TextArea } = Input;
const Checkoutpage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Order has been sent',
        });
      };
    const { cartItems, handleCartItems } = useContext(ShoppingContext);

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Quatity',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'Total',
          dataIndex: 'total',
          key: 'total',
        },
        {
          title: 'Action',
          dataIndex: 'x',
          key: 'x'
        },
    ];
    
    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        note: ""
    });
    const [items,setItems] = useState([]);
    const [subTotal,setSubTotal] = useState(0);

    const handleCustomer = (value, attribute) => {
        setCustomer({
            ...customer,
            [attribute]: value
        })
    };

    const submitOrder = () => {
        if (cartItems.length > 0) {
            fetch(`${config.backendURL}/orders`, {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify({
                    subtotal: Math.round(subTotal*100)/100,
                    gst: Math.round(subTotal) / 10,
                    total: Math.round(subTotal * 110) / 100,
                    customerName: customer.name,
                    customerContactNumber: customer.phone,
                    customerEmail: customer.email,
                    customerAddress: customer.address,
                    note: customer.note,
                    orderItems: cartItems.map( item => ({
                        itemQuantity: item.quantity,
                        product: {
                            productID: item.productID
                        },
                        itemTotal: item.total
                    }))
                })
            })
            .then(res => {
                success();
                setCustomer({
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    note: ""
                });
                handleCartItems([]);
            });
        }
        else {
            messageApi.open({
                type: 'error',
                content: 'Your cart is empty',
            });
        }
        
    }

    useEffect(() => {
        setItems(cartItems);
    },[cartItems]);

    useEffect(() => {
        setSubTotal(items.reduce((acc,cur) => acc + cur.total,0));
    },[items]);

    return <>
        {contextHolder}
        <div className="checkoutContainer">
            <div className="checkoutTitle">Checkout Page</div>
            <div className="customerSection">
                <table cellSpacing={10}>
                    <tr>
                        <td>
                            <div>Name</div>
                            <div>
                                <Input size="large" onChange={e => handleCustomer(e.target.value,"name")} value={customer["name"]}/>
                            </div>
                        </td>
                        <td>
                            <div>Phone</div>
                            <div>
                                <Input size="large" onChange={e => handleCustomer(e.target.value,"phone")} value={customer["phone"]}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>Email</div>
                            <div>
                                <Input size="large" onChange={e => handleCustomer(e.target.value,"email")} value={customer["email"]}/>
                            </div>
                        </td>
                        <td>
                            <div>Address</div>
                            <div>
                                <Input size="large" onChange={e => handleCustomer(e.target.value,"address")} value={customer["address"]}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div>Note</div>
                            <div>
                                <Input size="large" row={6} onChange={e => handleCustomer(e.target.value,"note")} value={customer["note"]}/>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div className="checkoutContainer">
            <div className="cartItems">
                <Table
                    columns={columns}
                    dataSource={items.map( item => ({
                        name: item.name,
                        quantity: <InputNumber min={1} value={item.quantity} onChange={val => handleCartItems(items.map(i => i.name === item.name ? {
                            ...i,
                            quantity: parseInt(val),
                            total: Math.round(i.price * parseInt(val) * 100) / 100
                        } : {
                            ...i
                        }))} />,
                        total: item.total,
                        x: <a onClick={() => handleCartItems(items.filter(({name}) => name !== item.name))}>Delete</a>
                    }))}
                    pagination={false}
                    footer={() => <div className="footerTable">
                    <table>
                        <tr>
                            <td><strong>Subtotal</strong></td>
                            <td>{Math.round(subTotal*100)/100}</td>
                        </tr>
                        <tr>
                            <td><strong>GST</strong></td>
                            <td>{Math.round(subTotal) / 10}</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td>{Math.round(subTotal * 110) / 100}</td>
                        </tr>
                    </table></div>
                    }
                />
            </div>
            <div className="placeOrderButton">
                <button type="button" class="orderButton" onClick={() => {
                    submitOrder();
                }}>
                    <span>PLACE ORDER</span>
                </button>
            </div>
        </div>
    </>
}

export default Checkoutpage;