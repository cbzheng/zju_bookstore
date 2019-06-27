import * as React from 'react'
import 'react-bootstrap'
import {Container, Jumbotron, Image, CardDeck} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getBookImg, getOnSell, getRecommendBooks, getSearchResult} from "../../API";
import RecommendCard from "./recommendCard";

export interface Props {
    username: string
    bookname: string
    jump: Function,
    handleProductRequest: Function,

}

function SearchResult(props: Props) {

    const [ bookname, setBookName]  = useState(props.bookname);

    const [recommend_cards, setCards] = useState([]);


    const fetchBooks = async () => {
        console.log(props.bookname);
        let data = await getSearchResult(bookname);

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
    }, []);

    return (
        <div style={{marginTop: '3%', marginBottom: '3%'}}>

                <Container>
                    <h1 style={{fontFamily: 'PingFang', textAlign:'center', marginBottom: '3%'}}>-- 搜索的结果 -- </h1>
                    <CardDeck>
                        {recommend_cards}
                    </CardDeck>
                </Container>

        </div>
    )
}

export default SearchResult;