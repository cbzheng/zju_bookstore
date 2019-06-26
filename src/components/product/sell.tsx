import * as React from 'react'

import {Alert, Button, Card, Col, Container, Form, InputGroup, Jumbotron, Spinner} from 'react-bootstrap'
import Category from "../../utils/category";
import {useState} from "react";
import ImageUploader from 'react-images-upload'
import {uploadProductInfo} from "../../API";
import {async} from "q";


function NewProduct() {

    const [validated, setValidated] = useState(false);

    // the content of the form
    const [pictures, setPictures] = useState([]);
    const [bookName, setBookName] = useState('');
    const [originPrice, setOriginPrice] = useState(0.0);
    const [curPrice, setCurPrice] = useState(0);
    const [bookClass, setBookClass] = useState('Computer');
    const [description, setDescription] = useState('');
    const [inform, setInform] = useState(<></>);
    const [update, setUpdate] = useState(false);

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
            console.log(bookName);
            console.log(originPrice);
            console.log(curPrice);
            console.log(description);
            console.log(pictures);
            console.log(bookClass);

            // emit to the server
            let result = await uploadProductInfo({
                book_name: bookName,
                originPrice: originPrice,
                curPrice: curPrice,
                description: description,
                image: pictures[0],
                book_class: bookClass
            });

            if (result) {
                setUpdate(true)
                setInform(
                    <Button variant="outline-success" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        发布成功，前往商品页...
                    </Button>
                )
            }
        }
    }

    // image upload
    function onDrop(picture: any) {
        setPictures(pictures.concat(picture))
    }

    // HTML
    return (
        <div style={{marginLeft: '10%', marginRight: '10%', marginTop: '5%', marginBottom: '10%'}}>
            <div >
            <Jumbotron fluid style={{backgroundColor:'skyblue'}}>

                <Container >
                    <h1 style={{color:'white', fontFamily:'苹方-简'}}>发布你手中旧书的信息吧</h1>

                </Container>
            </Jumbotron>
            </div>

            <Card border={'light'} className={'description'}>
                <Card.Body>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={(e: any) => handleSubmit(e)}
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
                                <Form.Label>原价</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Original Price"
                                    value={originPrice.toString()}
                                    onChange={(e:any)=>{
                                        setOriginPrice(e.target.value.toString())
                                    }}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>售价</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Set Price"
                                    value={curPrice.toString()}
                                    onChange={(e:any)=>{
                                        setCurPrice(e.target.value.toString())
                                    }}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                        </Form.Row>



                        <ImageUploader
                            withIcon={true}
                            withPreview={true}
                            buttonText='选择一张图片'
                            singleImage={true}
                            onChange={onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        />

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
                            <Button type="submit">发布商品</Button>
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

export default NewProduct;