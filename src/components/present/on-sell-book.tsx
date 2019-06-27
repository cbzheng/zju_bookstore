import * as React from 'react'
import 'react-bootstrap'
import {Container, Jumbotron, Image, CardDeck} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getBookImg, getOnSell, getRecommendBooks} from "../../API";
import RecommendCard from "./recommendCard";

export interface Props {
    username: string
    jump: Function,
    handleProductRequest: Function
}

function OnSell(props: Props) {

    const [recommend_cards, setCards] = useState([]);

    const fetchBooks = async () => {
        let data = await getOnSell(props.username);

        let card_list: any = [];
        for (let i = 0; i < data.sell_books[0].length; i++) {
            let book = data.sell_books[0][i];
            let tstmp = data.sell_books[0][i].timestamp;
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
    }, []);

    return (
        <Container>
            <CardDeck>
                {recommend_cards}
            </CardDeck>
        </Container>
    )
}

export default OnSell;