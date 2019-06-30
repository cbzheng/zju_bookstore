import * as React from 'react'
import {Carousel} from 'react-bootstrap'
import p1 from '../static/p1.jpg'
import p2 from '../static/p2.jpg'
import p3 from '../static/p3.jpg'

function Recommend() {
    return (
    <Carousel>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={p1}
                alt="First slide"
            />
            <Carousel.Caption>
                <h1>这里有新的数学类书籍！</h1>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={p2}
                alt="Third slide"
            />

            <Carousel.Caption>
                <h1>Second slide label</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={p3}
                alt="Third slide"
            />

            <Carousel.Caption >
                <h1>Third slide label</h1>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
        </Carousel.Item>

    </Carousel>
    )
}

export default Recommend