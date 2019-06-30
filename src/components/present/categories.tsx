import * as React from 'react'
import 'react-bootstrap'
import {Container, Jumbotron, Image, CardDeck} from "react-bootstrap";
import {RefObject, useEffect, useImperativeHandle, useState} from "react";
import {getBookByClass, getBookImg, getOnSell, getRecommendBooks, getSearchResult} from "../../API";
import RecommendCard from "./recommendCard";
import {Menu} from "antd";

export interface Props {
    username: string
    bookClass: string
    jump: Function,
    handleProductRequest: Function,

}

function CategoryPresent(props: Props) {

    const [recommend_cards, setCards] = useState([]);

    const [bookClass, setBookClass] = useState(props.bookClass);

    // let changeBookClass = ()=>{
    //     setBookClass(props.bookClass)
    // }

    // useImperativeHandle(ref, ()=>{
    //     return {
    //        changeBookClass : changeBookClass
    //     }
    // })

    const fetchBooks = async () => {
        let data = await getBookByClass(bookClass);

        let card_list: any = [];
        for (let i = 0; i < data.result[0].length; i++) {
            let book = data.result[0][i];
            let tstmp = data.result[0][i].timestamp;
            card_list.push(
                <RecommendCard
                    img_src={'/img/' + tstmp}
                    book_name={book.book_name}
                    book_class={book.book_class}
                    original_price={book.originPrice}
                    current_price={book.curPrice}
                    description={book.description}
                    timestamp={book.timestamp}
                    jump={props.jump}
                    handleProductRequest={props.handleProductRequest}
                    seller={book.seller}
                    width={'150px'}
                    height={'200px'}
                />);
        }
        setCards(card_list);

    };

    useEffect(() => {
        fetchBooks()
    }, [bookClass]);

    let handleClick = (key: string) =>{
        setBookClass(key);
        console.log(bookClass);
    }

    return (
        <div style={{marginTop: '3%', marginBottom: '3%', display: 'flex', flexWrap: 'wrap'}}>
            <div>
            <Menu
                onClick={(data) => {
                    handleClick(data.key)
                }}
                style={{width: 256}}
                mode="inline"

            >
                <Menu.ItemGroup title={'图书分类'}>

                    <Menu.Item key="Computer"> 计算机</Menu.Item>
                    <Menu.Item key="Math"> 数学</Menu.Item>
                    <Menu.Item key="Physics"> 物理</Menu.Item>
                    <Menu.Item key="Language"> 语言</Menu.Item>
                    <Menu.Item key="History"> 历史</Menu.Item>
                    <Menu.Item key="Society"> 社会科学</Menu.Item>
                    <Menu.Item key="Biology"> 传记</Menu.Item>
                    <Menu.Item key="Economic"> 经济</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
            </div>
            <div style={{marginLeft: '3%'}}>
            <Container>
                <CardDeck>
                    {recommend_cards}
                </CardDeck>
            </Container>
            </div>
        </div>
    )
}

export default CategoryPresent;