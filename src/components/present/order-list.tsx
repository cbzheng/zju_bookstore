import * as React from 'react'
import 'react-bootstrap'
// import {Container, Jumbotron, Image, CardDeck} from "react-bootstrap";
import {useEffect, useState} from "react";
import {List, Avatar, Button, Divider, Tag} from 'antd'
import {getBookImg, getOnSell, getRecommendBooks, getUserOrder, getUserWant} from "../../API";
import RecommendCard from "./recommendCard";
import bookLogo from '../../static/book.png'

export interface Props {
    username: string
    jump: Function,
    handleProductRequest: Function
}

const count = 5;

export interface wantItem {
    name: string,
    description: string
}

function OrderList(props: Props) {

    const defaultItem = {
        name: 'empty',
        book_class: 'null',
        price: 0,
        isFinish: false,
        ot: ',',
        bt: ',',
        seller: '',
        buyer: ''
    }

    const [sellList, setSellList] = useState([defaultItem]);
    const [buyList, setBuyList] = useState([defaultItem]);

    const fetchBooks = async () => {
        let data = await getUserOrder(props.username);

        let sellList: any = [];
        for (let i = 0; i < data.sell_order[0].length; i++) {
            let book = data.sell_order[0][i];
            let tstmp = data.sell_order[0][i].timestamp;
            sellList.push(
                {
                    name: book.book_name,
                    book_class: book.book_class,
                    price: book.price,
                    isFinish: book.isFinish,
                    ot: book.order_timestamp,
                    bt: book.book_timestamp,
                    seller: book.seller,
                    buyer: book.buyer
                })
        }
        setSellList(sellList);

        let buyList: any = [];
        for (let i = 0; i < data.buy_order[0].length; i++) {
            let book = data.buy_order[0][i];
            let tstmp = data.buy_order[0][i].timestamp;
            buyList.push(
                {
                    name: book.book_name,
                    book_class: book.book_class,
                    price: book.price,
                    isFinish: book.isFinish,
                    ot: book.order_timestamp,
                    bt: book.book_timestamp,
                    seller: book.seller,
                    buyer: book.buyer
                })
        }
        setBuyList(buyList);

    };

    useEffect(() => {
        setSellList([defaultItem]);
        fetchBooks()
    }, []);


    return (
        <div>
            <div>
                <Divider>买书的交易</Divider>
                <List
                    itemLayout="horizontal"
                    dataSource={buyList}
                    renderItem={item => (
                        <List.Item actions={[<a>联系卖家</a>, <a>删除交易</a>]}>
                            <Tag color={'geekblue'}>{item.book_class}</Tag>
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={'价格：' + item.price}
                            />
                        </List.Item>)}
                />
            </div>
            <div>
                <Divider>卖书的订单</Divider>
                <List
                    itemLayout="horizontal"
                    dataSource={sellList}
                    renderItem={item => (
                        <List.Item actions={[<a>联系买家</a>, <a>删除交易</a>]}>
                            <Tag color={'blue'}>{item.book_class}</Tag>

                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={'价格：' + item.price}
                            />
                        </List.Item>)}
                />
            </div>
        </div>
    )
}

export default OrderList