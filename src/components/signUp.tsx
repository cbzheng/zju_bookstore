import {Button, Card, Nav, Form, Col, Alert} from 'react-bootstrap'
import * as React from 'react'
import 'react-dom'
import {useEffect, useState} from "react";


export interface Props {

}

function SignUp(props: Props) {

    // States
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [inform, setInform] = useState(<></>);

    // check password
    useEffect( () => {
        if (confirmPass !== password) {
            setInform(<Alert variant={'danger'}>
                    两次输入的密码不匹配！
                </Alert>
            )
        } else {
            setInform( <> </> )
        }
    }, [confirmPass, password]);

    let handleSubmit = (event: any) => {
        console.log('password: ', password)


    };


    return (
        <Card style={{margin: '10%'}}>
            <Card.Header>
                      <span style={{alignContent: 'center'}}>
                          <h1 style={{textAlign: 'center'}}>注册</h1>
                      </span>
            </Card.Header>
            <Card.Body>

                <Form>
                    <Form.Group controlId="formUserName">
                        <Form.Label column={true}>用户名</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="User Name"
                            value={userName}
                            onChange={(e: any) => setUserName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label column={true}>邮箱</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label column={true}>密码</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label column={true}>确认密码</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm"
                            value={confirmPass}
                            onChange={(e: any) => setConfirmPass(e.target.value)}
                        />
                    </Form.Group>

                    {inform}

                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        注册
                    </Button>


                </Form>

            </Card.Body>
        </Card>
    );
}

export default SignUp;