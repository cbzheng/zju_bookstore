import * as React from 'react'
import {Button, Col, Form} from "react-bootstrap";
import ImageUploader from "./sell";
import {useContext, useState} from "react";
import Category from '../../utils/category'
import ProductContext, {myProduct, ProductInfo} from '../../context/product-context'

export interface ProductProps {
    setUpdate: Function,
    handleProductChange: Function
}

function UpdateBook(props: ProductProps) {

    const curProduct = useContext(ProductContext);

    const [validated, setValidated] = useState(false);
    const [pictures, setPictures] = useState([]);
    const [bookName, setBookName] = useState(curProduct.book_name);
    const [originPrice, setOriginPrice] = useState(curProduct.original_price);
    const [curPrice, setCurPrice] = useState(curProduct.current_price);
    const [bookClass, setBookClass] = useState(curProduct.book_class);
    const [description, setDescription] = useState(curProduct.description);
    const [inform, setInform] = useState(<></>);
    const [update, setUpdate] = useState(false);
    const [timestamp, setTimestamp] = useState('');

    async function handleSubmit(event: any) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setValidated(true);
            props.handleProductChange({
                img_src: curProduct.img_src,
                book_name: bookName,
                book_class: bookClass,
                original_price: originPrice,
                current_price: curPrice,
                description: description,
                seller: curProduct.seller,
            })
            props.setUpdate(false);

        }
    }

    // the options for book categories
    let category:any = [];
    for (let item in Category){
        category.push(<option value={item}> {Category[item]} </option>)
    }

    return (
        <div>
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

                {
                    ! update &&
                    <Button type="submit" onClick={handleSubmit}>确认修改</Button>
                }
                {
                    inform
                }

            </Form>
        </div>
    )
}

export default UpdateBook;