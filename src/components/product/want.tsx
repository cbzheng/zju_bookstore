import * as React from 'react'

import {Button, Card, Col, Container, Form, InputGroup, Jumbotron, Spinner} from 'react-bootstrap'
import Category from "../../utils/category";
import {useState} from "react";
import ImageUploader from 'react-images-upload'
import {uploadProductInfo, uploadWants} from "../../API";
import PageState from "../../utils/page-state";
import {Slider} from 'antd'

export interface Props {
    username: string,
    jump: Function,
    handleProductRequest: Function
}

function sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Want(props: Props) {

    const [validated, setValidated] = useState(false);

    // the content of the form
    const [bookName, setBookName] = useState('');
    const [lowPrice, setLowPrice] = useState(0.0);
    const [highPrice, setHighPrice] = useState(0);
    const [bookClass, setBookClass] = useState('Computer');
    const [description, setDescription] = useState('');
    const [inform, setInform] = useState(<></>);
    const [update, setUpdate] = useState(false);
    const [timestamp, setTimestamp] = useState('');

    // the options for book categories
    let category:any = [];
    for (let item in Category){
        category.push(<option value={item}> {Category[item]} </option>)
    }

    // submission
    async function handleSubmit(event: any) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setValidated(true);

            // emit to the server
            setTimestamp(Date.now().toString());
            let result = await uploadWants({
                book_name: bookName,
                lowPrice: lowPrice,
                highPrice: highPrice,
                description: description,
                book_class: bookClass,
                wanter: props.username,
                timestamp: timestamp
            });

            if (result) {
                setUpdate(true);
                setInform(
                    <Button variant="outline-success" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        发布成功
                    </Button>
                );
                await sleep(1000);
                props.jump(PageState.Profile)
            }
        }
    }

    // HTML
    return (
        <div style={{marginLeft: '10%', marginRight: '10%', marginTop: '5%', marginBottom: '10%'}}>
            <div >
                <Jumbotron fluid={true} style={{backgroundColor:'skyblue'}}>

                    <Container >
                        <h1 style={{color:'white', fontFamily:'苹方-简'}}>发布你希望购买的书籍的信息吧</h1>

                    </Container>
                </Jumbotron>
            </div>

            <Card border={'light'} className={'description'}>
                <Card.Body>
                    <Form
                        noValidate
                        validated={validated}
                    >

                        <Form.Row>
                            <Form.Group as={Col} md='4' controlId="exampleForm.ControlInput1">
                                <Form.Label>书名</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="book's name"
                                    required
                                    value={bookName}
                                    onChange={(e:any) => {
                                        setBookName(e.target.value)
                                    }}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>



                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>最低价格</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">Low</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        value={lowPrice.toString()}
                                        onChange={(e:any)=>{
                                            setLowPrice(e.target.value.toString())
                                        }}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>最高价格</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">High</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        value={highPrice.toString()}
                                        onChange={(e:any)=>{
                                            setHighPrice(e.target.value.toString())
                                        }}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                                </InputGroup>
                            </Form.Group>

                        </Form.Row>

                        <Form.Group controlId="categoryField">
                            <Form.Label>书籍类别</Form.Label>
                            <Form.Control
                                as="select"
                                required={true}
                                value={bookClass}
                                onChange={(e:any)=>{
                                    setBookClass(e.target.value)
                                }}
                            >
                                {category}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>书籍描述</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                required={true}
                                value={description}
                                onChange={(e:any)=>{
                                    setDescription(e.target.value)
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Check
                                required
                                label="阅读并同意相关的旧书交易规定"
                                feedback="You must agree before submitting."
                            />
                        </Form.Group>

                        {
                            ! update &&
                            <Button type="submit" onClick={(event:any)=>{ handleSubmit(event)}}>发布商品</Button>
                        }
                        {
                            inform
                        }

                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Want;