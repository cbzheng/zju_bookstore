import {Button, Card, Nav, Form, Col, Alert} from 'react-bootstrap'
import * as React from 'react'
import 'react-dom'
import {useState} from "react";
import '../API'
import {login} from "../API";
import PageState from "../utils/page-state";


export interface Props {
    emitUserName: Function,
    emitPageJump: Function
}

function Login(props: Props) {

    // States
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [inform, setInform] = useState(<></>);

    let handleSubmit = async () => {
        console.log('user: ', userName);
        console.log('password: ', password);
        let name = await login(userName, password);

        // if login successfully
        if (name !== "") {
            props.emitUserName(name);
            props.emitPageJump(PageState.Home)
        } else {
            setInform(<Alert variant={'danger'}> '用户名或密码错误！' </Alert>)
        }
    };

    return (
        <div style={{marginLeft: '20%', marginRight: '20%', marginTop: '5%'}}>
            <Card style={{margin: '10%'}}>
                <Card.Header>
                      <span style={{alignContent: 'center'}}>
                          <h1 style={{textAlign: 'center'}}>登录</h1>
                      </span>
                </Card.Header>
                <Card.Body>

                    <Form>
                        <Form.Group controlId="formUserName">
                            <Form.Label>用户名</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="User Name"
                                value={userName}
                                onChange={(e: any) => {
                                    setUserName(e.target.value)
                                }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>密码</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e: any) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </Form.Group>

                        { inform }

                        <span style={{marginRight: '5%', marginTop: '5%'}}>
                          <Button variant="primary" onClick={handleSubmit}>
                              登录
                          </Button>
                          </span>
                        <Button variant="primary">
                            忘记密码
                        </Button>
                    </Form>

                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;