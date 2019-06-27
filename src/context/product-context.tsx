import * as React from 'react'
import {ProductProps} from "../components/product/product";

export interface ProductInfo {
    img_src: string,
    book_name: string,
    book_class: string,
    original_price: number,
    current_price: number,
    description: string,
    seller: string,
    timestamp: string
}

const ProductContext = React.createContext({
    img_src: '',
    book_name: '',
    book_class: '',
    original_price: 0,
    current_price: 0,
    description: '',
    seller: '',
    timestamp: ''
})

export const myProduct: ProductInfo = {
    img_src: 'string',
    book_name: 'string',
    book_class: '',
    original_price: 0,
    current_price: 0,
    description: 'string',
    seller: 'root',
    timestamp: ''
};

export default ProductContext;