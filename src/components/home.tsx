import * as React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Sidebar from "./sidebar";
import Recommend from "./recommend";
import RecommendBar from "./present/recommendBar";
import UserContext from '../context/user-context'

interface Props {
    userName: string,
    jump: Function,
    handleProductRequest: Function
}


function Home(props: Props) {

    return (

        <div style={{ marginTop: '5%'}}>
            <Container fluid>
                <Row>
                    <Col xs={'3'}>
                        <Sidebar/>
                    </Col>
                    <Col>
                        <Recommend />
                    </Col>
                </Row>
                <RecommendBar username={props.userName} jump={props.jump} handleProductRequest={props.handleProductRequest}/>
                <Row>

                </Row>
            </Container>
        </div>


    )
}

export default Home;