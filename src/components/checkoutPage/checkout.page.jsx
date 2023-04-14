import React, { useContext, useState, useEffect } from 'react';
import { Input, Table, InputNumber, message } from 'antd';
import ShoppingContext from '../../contexts/shoppingCart.context';
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
      const [items,setItems] = useState([]);
      const [subTotal,setSubTotal] = useState(0);
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
                                <Input size="large" />
                            </div>
                        </td>
                        <td>
                            <div>Phone</div>
                            <div>
                                <Input size="large" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>Email</div>
                            <div>
                                <Input size="large" />
                            </div>
                        </td>
                        <td>
                            <div>Address</div>
                            <div>
                                <Input size="large" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div>Note</div>
                            <div>
                                <TextArea rows={6} />
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
                            <td><strong>Tax</strong></td>
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
                    success();
                    handleCartItems([]);
                }}>
                    <span>PLACE ORDER</span>
                </button>
            </div>
        </div>
    </>
}

export default Checkoutpage;