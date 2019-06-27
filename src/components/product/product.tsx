import * as React from 'react'
import {Card, Image, Badge, Button} from 'react-bootstrap'
import {useState} from "react";
import {useContext} from "react";
import UserContext from "../../context/user-context";

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
    jump: Function
}

export const basicProduct: ProductProps = {
    img_src: 'string',
    book_name: 'string',
    book_class: '',
    original_price: 0,
    current_price: 0,
    description: 'string',
    seller: 'root',
    jump: () => {
    }
};

// new Feature in React: Hoop
// this is for a single page of one product
function Product(props: ProductProps) {

    const [bookName, setBookName] = useState(props.book_name);
    const [description, setDescription] = useState(props.description);
    const user = useContext(UserContext);

    let actionButton = <Button>联系卖家</Button>
    if (user.userName === props.seller) {
        actionButton = <Button>修改信息</Button>
    }

    return (
        <div style={{marginLeft: '10%', marginRight: '10%', marginTop: '5%', display: 'flex', flexWrap: 'wrap'}}>
            <div style={{width: '300px', height: '400px'}}>
                <Image src={props.img_src} style={{
                    width: '100%',
                    height: '100%',
                    border: '1.5px solid',
                    borderColor: 'lightgray',
                    padding: '2%'
                }}/>
            </div>
            <div style={{marginLeft: '5%', minWidth: '55%', maxWidth: '60%'}}>
                <p style={{fontSize: '25px'}}>
                    {bookName}
                      <Badge variant="danger" pill style={{fontSize: '15px'}}>{props.book_class}</Badge>
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
                                <span style={{fontSize: '26px'}}>¥</span>{props.current_price} <s
                                style={{fontSize: '20px', color: 'gray'}}>¥{props.original_price}</s>
                            </div>
                            <div style={{ fontSize: '15px', color: 'gray'}}>
                                <p>
                                卖家: {props.seller}
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <Card>
                    <Card.Body>
                        <Card.Title>书籍简介</Card.Title>
                        <Card.Text>
                            {description}
                        </Card.Text>
                    </Card.Body>

                </Card>
                <div style={{ marginTop:"3%"}}>
                    {actionButton}
                </div>
            </div>
        </div>
    )
}

export default Product;