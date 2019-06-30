import * as React from 'react'
import 'react-bootstrap'
// import {Container, Jumbotron, Image, CardDeck} from "react-bootstrap";
import {useEffect, useState} from "react";
import {List, Avatar, Button, Skeleton} from 'antd'
import {get_wants, getBookImg, getOnSell, getRecommendBooks, getUserOrder, getUserWant} from "../../API";
import RecommendCard from "./recommendCard";
import bookLogo from '../../static/book.png'
import {Container} from "react-bootstrap";

export interface Props {
    username: string
}

export interface wantItem {
    name: string,
    description: string
}

const max_item = 5

function HomeWantList(props: Props) {

    const defaultItem = {name: 'empty', description: '目前还没有购书愿望，可以在顶栏的发布愿望处发布你的购书愿望'}

    const [wantList, setWantList] = useState([defaultItem]);

    const fetchBooks = async () => {
        let data = await get_wants();

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
        <div style={{width: '100%', marginLeft: '15%', marginRight: '15%', marginTop: '10%'}}>
            <h1 style={{fontFamily: 'PingFang', textAlign: 'center', marginBottom: '3%'}}>-- 有人想要这些书 -- </h1>

            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={wantList}
                footer={
                    <div>
                        <b>zju bookstore</b> want list
                    </div>
                }
                renderItem={item => (
                    <List.Item actions={[<a>联系他/她</a>, <a>more</a>]} style={{}}>
                        <List.Item.Meta
                            avatar={
                                <Avatar src={bookLogo}/>
                            }
                            title={<a href="https://ant.design">{item.name}</a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            /></div>
    )
}

export default HomeWantList