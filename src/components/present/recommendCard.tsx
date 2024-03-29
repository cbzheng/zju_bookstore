import * as React from 'react'
import {Button, Card, Image} from 'react-bootstrap'
import PageState from "../../utils/page-state";
import UserContext from '../../context/user-context'
import {useContext} from "react";

export interface Props {
    img_src: string,
    book_name: string,
    book_class: string,
    original_price: number,
    current_price: number,
    description: string,
    timestamp: string
    jump: Function,
    seller: string
    handleProductRequest : Function,
    width: string,
    height: string
}

function RecommendCard(props: Props) {

    return (
        <div style={{marginBottom: '10px'}}>
            <Card>
                <div style={{width: props.width, height: props.height}}>

                    <Image style={{maxWidth: '240', width: '100%', height: '100%'}} src={props.img_src}/>
                </div>
                <Card.Body>
                    <Card.Text>
                        {/* Original Price*/}
                        <p style={{fontSize: '20px', color: '#db222f'}}>

                                <span style={{fontSize: '18px'}}>¥</span>{props.current_price} <s
                                style={{fontSize: '16px', color: 'gray'}}>¥{props.original_price}</s>

                        </p>
                        <Card.Link
                            style={{fontSize: '18px', color: 'gray'}}
                            href={"#"}
                            onClick={()=>{
                                console.log('click');
                                props.handleProductRequest({
                                    img_src: props.img_src,
                                    book_name: props.book_name,
                                    book_class: props.book_class,
                                    original_price: props.original_price,
                                    current_price: props.current_price,
                                    description: props.description,
                                    seller: props.seller,
                                    timestamp: props.timestamp,
                                    jump: props.jump,
                                });
                                props.jump(PageState.Product)
                            }}
                        >
                            {props.book_name}
                        </Card.Link>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <div style={{width: props.width, height: '20px'}}>
                        <p
                            className="text-muted"
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                fontSize: '14px'
                            }}>
                            {props.description}
                        </p>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default RecommendCard;