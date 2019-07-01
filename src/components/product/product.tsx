import * as React from 'react'
import {Card, Image, Badge, Button} from 'react-bootstrap'
import {useEffect, useState} from "react";
import {useContext} from "react";
import UserContext from "../../context/user-context";
import UpdateBook from "./update-book";
import ProductContext, {myProduct, ProductInfo} from '../../context/product-context'
import {uploadOrder} from "../../API";
import {Divider, Input, message, Select} from "antd";
import MsgSender from "../message/msg-send";
import {Simulate} from "react-dom/test-utils";

const {Option} = Select;

// Very import Props definition
// book information: 1. list. 2. Props. 2. Product
export interface ProductProps {
    img_src: string,
    book_name: string,
    book_class: string,
    original_price: number,
    current_price: number,
    description: string,
    seller: string,
    timestamp: string
    jump: Function
}

export interface Props {
    jump: Function,
    handleProductRequest: Function,
}

export const basicProduct: ProductProps = {
    img_src: 'string',
    book_name: 'string',
    book_class: '',
    original_price: 0,
    current_price: 0,
    description: 'string',
    seller: 'root',
    timestamp: '',
    jump: () => {
    }
};

// new Feature in React: Hoop
// this is for a single page of one product
function Product(props: Props) {

    const curProduct = useContext(ProductContext);

    const [bookName, setBookName] = useState(curProduct.book_name);
    const [description, setDescription] = useState(curProduct.description);
    const [update, setUpdate] = useState(false);
    const [timestamp, setTimestamp] = useState('');
    const [method, setMethod] = useState('offline');
    const [addr, setAddr] = useState('');
    const [phone, setPhone] = useState('');
    const [actionButton, setActionButton] = useState(<></>);

    const user = useContext(UserContext);

    let handleMethodChange = (data: any) => {
        if (data == 'mail') {
            setActionButton(<div>
                <h4 style={{marginTop: '20px', marginBottom: '20px'}}>请选择交易方式</h4>
                <Select
                    showSearch
                    style={{width: 200}}

                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={(data) => {
                        handleMethodChange(data)
                    }}
                >
                    <Option value="mail">寄送</Option>
                    <Option value="offline">线下交易</Option>
                </Select>
                {mailDom}
                <Button onClick={handleOrderSub} style={{marginTop: '20px'}}>确定订单</Button>
            </div>)
        }
        if (data == 'offline') {
            setActionButton(<div>
                <h4 style={{marginTop: '20px', marginBottom: '20px'}}>请选择交易方式</h4>
                <Select
                    showSearch
                    style={{width: 200}}

                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={(data) => {
                        handleMethodChange(data)
                    }}
                >
                    <Option value="mail">寄送</Option>
                    <Option value="offline">线下交易</Option>
                </Select>
                {phoneDom}
                <Button onClick={handleOrderSub} style={{marginTop: '20px'}}>确定订单</Button>
            </div>)
        }
        setMethod('offline')
    }

    let phoneDom = <div>
        <h4 style={{marginTop: '20px', marginBottom: '20px'}}>请输入手机号码</h4>
        <Input onChange={(t) => {
            setPhone(t.target.value)
        }} style={{width: '50%'}}/>
    </div>;

    let mailDom = <div>
        <h4 style={{marginTop: '20px', marginBottom: '20px'}}>请输入邮寄地址</h4>
        <Input onChange={(t) => {
            setAddr(t.target.value)
        }} style={{width: '50%'}}/>
    </div>;

    let trySub = () => {
        console.log('try')
        setActionButton(<div>
            <div>
            <h4 style={{marginTop: '20px', marginBottom: '20px'}}>请选择交易方式</h4>
            <Select
                showSearch
                style={{width: 200}}

                placeholder="Select a person"
                optionFilterProp="children"
                onChange={(data) => {
                    handleMethodChange(data)
                }}
            >
                <Option value="mail">寄送</Option>
                <Option value="offline">线下交易</Option>
            </Select>
            </div>

            <Button onClick={handleOrderSub} style={{marginTop: '20px'}}>确定订单</Button>
        </div>);
    }

    let handleOrderSub = async () => {
        setTimestamp(Date.now().toString());
        let result = await uploadOrder({
            ot: Date.now().toString(),
            bt: curProduct.timestamp,
            seller: curProduct.seller,
            buyer: user.userName,
            price: curProduct.current_price.toString(),
            method: method,
            addr: addr,
            phone: phone
        });
        if (result) {
            message.success('交易发起成功！')
        } else {
            message.error('你已经发起过这个订单了！')
        }
    };

    let updateForm = <UpdateBook
        setUpdate={setUpdate}
        handleProductChange={props.handleProductRequest}
    />;

    useEffect(() => {
            setActionButton((
                <div>
                    <Button onClick={trySub}>发起交易</Button>

                </div>
            ));
            if (user.userName === curProduct.seller) {
                setActionButton(<Button onClick={() => {
                        setUpdate(true)
                    }}>修改信息</Button>
                )
            }
        }
    , []);


    return (
        <div style={{marginLeft: '10%', marginRight: '10%', marginTop: '5%'}}>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <div style={{width: '300px', height: '400px'}}>
                    <Image src={curProduct.img_src} style={{
                        width: '100%',
                        height: '100%',
                        border: '1.5px solid',
                        borderColor: 'lightgray',
                        padding: '2%'
                    }}/>
                </div>
                <div style={{marginLeft: '5%', minWidth: '55%', maxWidth: '60%'}}>
                    <p style={{fontSize: '25px'}}>
                        {curProduct.book_name}
                        <Badge variant="danger" pill style={{fontSize: '15px'}}>{curProduct.book_class}</Badge>
                    </p>
                    <div style={{marginBottom: '3%'}}>
                        <Card>
                            <div style={{background: 'linear-gradient(to right, #FF4E50, #F9D423)'}}>
                                <Card.Header>
                                    <span style={{fontSize: '20px', fontWeight: 'bold', color: 'white'}}>价格信息</span>
                                </Card.Header>
                            </div>
                            <Card.Body>
                                <div style={{color: '#db222f', fontSize: '30px'}}>
                                    <span style={{fontSize: '26px'}}>¥</span>{curProduct.current_price} <s
                                    style={{fontSize: '20px', color: 'gray'}}>¥{curProduct.original_price}</s>

                                </div>
                                <div style={{fontSize: '15px', color: 'gray'}}>
                                    <p>
                                        卖家: {curProduct.seller}
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <Card>
                        <Card.Body>
                            <Card.Title>书籍简介</Card.Title>
                            <Card.Text>
                                {curProduct.description}
                            </Card.Text>
                        </Card.Body>

                    </Card>
                    <div style={{marginTop: "3%"}}>
                        {
                            !update &&
                            actionButton

                        }
                        {
                            update &&
                            updateForm
                        }
                    </div>

                </div>
            </div>
            <Divider orientation={'left'} style={{marginTop: '5%'}}>向卖家发送消息</Divider>
            <div style={{marginTop: '5%', marginRight: '5%'}}>
                <MsgSender sender={user.userName} receiver={curProduct.seller}/>
            </div>
        </div>

    )
}

export default Product;