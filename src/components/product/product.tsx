import * as React from 'react'
import { Card } from 'react-bootstrap'

export interface Props {
    
}

// new Feature in React: Hoop
function Product(props: Props) : React.ReactNode{



    return (
        <div>
            <Card>
                <Card.Body>

                </Card.Body>
            </Card>
        </div>
    )
}

export default Product;