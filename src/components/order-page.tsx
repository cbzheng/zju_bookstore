import * as React from 'react'
import {Image, ListGroup, Card} from 'react-bootstrap'
import figure from '../static/boy.png'
import UserContext from '../context/user-context'
import {useContext, useState} from "react";
import OnSell from "./present/on-sell-book";
import WantList from "./present/want-list";
import OrderList from "./present/order-list";
import {Button, Steps, Icon, Result} from "antd";
// import Result from 'antd/dist'
import {getOrder, getUserWant, updateOrder} from "../API";
import {useEffect} from "react";

const {Step} = Steps;


export interface Props {
    jump: Function,
    handleProductRequest: Function,
    orderTimeStamp: string
}

function OrderPage(props: Props) {

    const user = useContext(UserContext);
    const [orderState, setOrderState] = useState(1);
    const [sellerAgree, setSellerAgree] = useState('In Progress');
    const [orderFinish, setOrderFinish] = useState('Waiting...');
    const [content, setContent] = useState(<></>);

    const [price, setPrice] = useState(0);

    // several possible content
    let buyerWaiting = (
        <div>
            <Result status={'info'} icon={<Icon type="edit" theme="twoTone"/>}
                    extra={<h3>正在等待买家确认...</h3>}/>

        </div>
    );


    let sellerAgreePage = (
        <div>
            <Result status={'info'} icon={<Icon type="edit" theme="twoTone"/>}
                    extra={<h3>是否同意交易？</h3>}/>
            <div style={{textAlign: 'center'}}>
                <div style={{marginBottom: '20px', marginTop: '5%'}}>
                    <Button onClick={() => {
                        updateOrder(props.orderTimeStamp, true, price, true);
                        setSellerAgree('Finished');
                        setOrderFinish('Done');
                        setOrderState(3);
                        setContent(Success)
                    }}>同意</Button>
                </div>
                <div>
                    <Button onClick={() => {

                    }}>不同意</Button>
                </div>
            </div>
        </div>
    )
    let Success = (
        <div>
            <Result status={'success'} title={'交易成功！'}/>
        </div>);


    const fetchBooks = async () => {
        let data = await getOrder(props.orderTimeStamp);

        setPrice(data.price);

        if (data.sellerAgree) {
            setOrderState(2);
            setContent(Success);
            return
        } else {
            setOrderState(1);
            if (user.userName == data.buyer) {
                setContent(buyerWaiting);
            } else if (user.userName == data.seller) {
                setContent(sellerAgreePage)
            }
        }

    };

    useEffect(() => {
        fetchBooks()
    }, []);


    return (

        <div style={{margin: '5%'}}>
            <Steps current={orderState}>
                <Step title="Finished" description="买家发起交易"/>
                <Step title={sellerAgree} description="卖家同意交易"/>
                <Step title={orderFinish} description="完成交易"/>
            </Steps>
            <div style={{width: '100%', paddingRight: '5%', paddingLeft: '5%'}}>
                <Card border="light">
                    <Card.Body>
                        {content}
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default OrderPage;