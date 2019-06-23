import * as React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Sidebar from "./sidebar";
import Recommend from "./recommend";


function Home() {

    return (

        <div style={{ marginTop: '5%'}}>
            <Container>
                <Row>
                    <Col xs={'3'}>
                        <Sidebar/>
                    </Col>
                    <Col>
                        <Recommend />
                    </Col>
                </Row>
            </Container>
        </div>


    )
}

export default Home;