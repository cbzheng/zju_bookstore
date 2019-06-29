import * as React from 'react'
import 'react-bootstrap'
import {Container, Jumbotron, Image, CardDeck} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getBookImg, getRecommendBooks} from "../../API";
import RecommendCard from "./recommendCard";

export interface Props {
    username: string
    jump: Function,
    handleProductRequest: Function
}

function RecommendBar(props: Props) {


    const [books, setBooks] = useState([]);

    const [recommend_cards, setCards] = useState([]);

    const fetchBooks = async () => {
        let data = await getRecommendBooks(props.username);

        let card_list: any = [];
        for (let i = 0; i < data.recommend[0].length; i++) {
            let book = data.recommend[0][i];
            let tstmp = data.recommend[0][i].timestamp;
            card_list.push(
                <RecommendCard
                    img_src={'/img/' + tstmp}
                    book_name={ book.book_name }
                    book_class={book.book_class}
                    original_price={book.originPrice}
                    current_price={book.curPrice}
                    description={book.description}
                    timestamp={book.timestamp}
                    jump={props.jump}
                    handleProductRequest={props.handleProductRequest}
                    seller={book.seller}
                    width={'200px'}
                    height={'300px'}
                />);
        }
        setCards(card_list);

    };

    useEffect(() => {
        fetchBooks()
    }, []);

    return (
        <div style={{marginTop: '3%', marginBottom: '3%'}}>
            <Jumbotron fluid>
                <Container>
                    <h1 style={{fontFamily: 'PingFang', textAlign:'center', marginBottom: '3%'}}>-- 为你推荐的书籍 -- </h1>
                    <CardDeck>
                        {recommend_cards}
                    </CardDeck>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default RecommendBar;