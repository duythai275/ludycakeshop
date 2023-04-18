import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import './customer.styles.css';

import {config} from '../../config';

const Customer = ({history}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [code, setCode] = useState("");

    return (
        <>
            {contextHolder}
            <div className="customerWrapper">
                <div className="cutomerContent">
                    <Input value={code} onChange={ e => setCode(e.target.value)} placeholder="Enter custommer code" size='large' />
                </div>
                <div className="cutomerContent">
                    <Button size={'large'} block onClick={() => {
                        if ( code === "" ) {
                            messageApi.open({
                                type: 'error',
                                content: 'Please Enter the customer code',
                            });
                        }
                        else {
                            fetch(`${config.backendURL}/customers/${code}`)
                            .then( res => res.json() )
                            .then( json => {
                                if ( json.code ) {
                                    history.push(`/bulkorder/${code}`);
                                }
                                else {
                                    messageApi.open({
                                        type: 'error',
                                        content: 'Can not find the customer with this code',
                                    });
                                }
                            })
                            
                        }
                    }}>
                        Open Form
                    </Button>
                </div>
            </div>
        </>
    )
}

export default withRouter(Customer);