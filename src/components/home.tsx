import * as React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Sidebar from "./sidebar";
import Recommend from "./recommend";
import RecommendBar from "./present/recommendBar";
import UserContext from '../context/user-context'
import HomeWantList from "./present/home-want-list";
import {Menu} from "antd";
import Category from "../utils/category";
import {useRef, useState} from "react";
import CategoryPresent from "./present/categories";

interface Props {
    userName: string,
    jump: Function,
    handleProductRequest: Function
}


function Home(props: Props) {

    const [category, setCategory] = useState(<></>);
    const ref = useRef<object>(null);


    let handleClick = (key: string) => {
        console.log(key);
        console.log(typeof ref);
        setCategory(<></>);

    };

    return (

        <div style={{marginTop: '5%', marginLeft: '5%', marginRight: '5%'}}>
            <Container fluid>
                <Recommend/>

                <div>
                    <CategoryPresent
                        username={props.userName}
                        bookClass={'Computer'} jump={props.jump}
                        handleProductRequest={props.handleProductRequest}
                    />

                </div>


                <RecommendBar username={props.userName} jump={props.jump}
                              handleProductRequest={props.handleProductRequest}/>
                <Row>
                    <HomeWantList username={props.userName}/>
                </Row>
            </Container>
        </div>


    )
}

export default Home;