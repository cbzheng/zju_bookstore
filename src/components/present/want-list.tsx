import * as React from 'react'
import 'react-bootstrap'
// import {Container, Jumbotron, Image, CardDeck} from "react-bootstrap";
import {useEffect, useState} from "react";
import { List, Avatar, Button, Skeleton} from 'antd'
import {getBookImg, getOnSell, getRecommendBooks, getUserWant} from "../../API";
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

function WantList(props: Props) {

    const defaultItem = {name: 'empty', description: '目前还没有购书愿望，可以在顶栏的发布愿望处发布你的购书愿望'}

    const [wantList, setWantList] = useState([defaultItem]);

    const fetchBooks = async () => {
        let data = await getUserWant(props.username);

        let card_list: any = [];
        for (let i = 0; i < data.want[0].length; i++) {
            let book = data.want[0][i];
            let tstmp = data.want[0][i].timestamp;
            card_list.push(
                {
                    name: book.book_name,
                    description: book.description,
                })
        }
        setWantList(card_list);

    };

    useEffect(() => {
        setWantList([defaultItem]);
        fetchBooks()
    }, []);


    return (
        <List
            itemLayout="horizontal"
            dataSource={wantList}
            renderItem={item => (
                <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                        <List.Item.Meta
                            avatar={
                                <Avatar src={bookLogo} />
                            }
                            title={<a href="https://ant.design">{item.name}</a>}
                            description={item.description}
                        />
                </List.Item>)}
        />
    )
}

export default WantList