import * as React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Sidebar from "./sidebar";


function Home() {

    return (

        <div style={{ marginTop: '5%'}}>
            <Container>
                <Row>
                    <Col xs={'3'}>
                        <Sidebar/>
                    </Col>
                    <Col>
                        <h1> ZCB 卖书的地方</h1>
                    </Col>
                </Row>
            </Container>
        </div>


    )
}

export default Home;