import * as React from 'react'
import {Button, Card, Image} from 'react-bootstrap'

export interface Props {
    img_src: string,
    book_name: string,
    book_class: string,
    original_price: number,
    current_price: number,
    description: string
}

function RecommendCard(props: Props) {
    return (
        <div>
            <Card>
                <div style={{width:'240px', height:'300px'}}>

                    <Image style={{maxWidth:'240', width:'100%' ,height:'100%'}} src={props.img_src}/>
                </div>
                <Card.Body>
                    <Card.Text>

                        <p style={{fontSize: '20px', color:'#db222f'}}>
                            <span style={{fontSize: '18px'}}>¥</span>{props.current_price}  <s style={{fontSize:'16px' ,color:'gray'}}>¥{props.original_price}</s>
                        </p>
                        <p style={{fontSize: '18px', color:'gray'}}>
                        {props.book_name}
                        </p>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <div style={{width: '200px', height: '20px'}}>
                    <p
                        className="text-muted"
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize:'14px'
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