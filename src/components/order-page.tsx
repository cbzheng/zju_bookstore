import * as React from 'react'
import {Image, ListGroup, Card} from 'react-bootstrap'
import figure from '../static/boy.png'
import UserContext from '../context/user-context'
import {useContext, useState} from "react";
import OnSell from "./present/on-sell-book";
import WantList from "./present/want-list";
import OrderList from "./present/order-list";

export interface Props {
    jump: Function,
    handleProductRequest: Function
}

function OrderPage(props: Props) {

    const user = useContext(UserContext);


    const profile = (
        <div style={{display: 'flex', flexWrap: 'wrap', padding: '10px'}}>
            <Image src={figure} style={{
                width: '200px', height: '200px', padding: '5px'
            }}/>
            <div style={{fontSize: '20px', marginLeft: '3%', color: 'gray'}}>
                <p>
                    用户： <span style={{fontSize: '30px', color: 'black'}}>{user.userName}</span>
                </p>
            </div>
        </div>
    );
    const order = (
        <div style={{display: 'flex', flexWrap: 'wrap', padding: '10px'}}>
            <OrderList username={user.userName} jump={props.jump} handleProductRequest={props.handleProductRequest}/>
        </div>
    );
    const wantList = (
        <div style={{display: 'flex', flexWrap: 'wrap', padding: '10px'}}>
            <WantList username={user.userName} jump={props.jump} handleProductRequest={props.handleProductRequest}/>
        </div>
    );
    const sellList = (
        <div style={{display: 'flex', flexWrap: 'wrap', padding: '10px'}}>
            <OnSell username={user.userName} jump={props.jump} handleProductRequest={props.handleProductRequest}/>
        </div>
    );

    const [ content, setContent ] = useState(profile);

    return (

        <div style={{margin: '5%', display: 'flex', flexWrap: 'wrap'}}>
            <div style={{width: '300px'}}>
                <ListGroup>
                    <ListGroup.Item action href="#info" onClick={()=>{setContent(profile)}}>
                        我的信息
                    </ListGroup.Item>
                    <ListGroup.Item action href="#order" onClick={()=>{setContent(order)}}>
                        我的订单
                    </ListGroup.Item>
                    <ListGroup.Item action href="#sell" onClick={()=>{setContent(sellList)}}>
                        我发布的商品
                    </ListGroup.Item>
                    <ListGroup.Item action href="#want" onClick={()=>{setContent(wantList)}}>
                        我发布的愿望
                    </ListGroup.Item>

                </ListGroup>
            </div>
            <div style={{width: '75%', paddingRight: '5%', paddingLeft: '5%'}}>
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