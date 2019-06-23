import * as React from 'react';
import {Card, ListGroup} from 'react-bootstrap'
import Category from '../utils/category'

function Sidebar() {

    const names = Object.values(Category);
    const category = names.map(name=>(
        <ListGroup.Item action >
            {name}
        </ListGroup.Item>
    ));

    return (
        <div className={'wrapper'}>
            <Card>
                <Card.Header>图书分类</Card.Header>
                <ListGroup>
                    { category }
                </ListGroup>
            </Card>
        </div>
    )
}

export default Sidebar;