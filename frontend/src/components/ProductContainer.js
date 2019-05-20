import React from 'react'
import ProductList from './ProductList'


export default class ProductContainer extends React.Component {

    render(){
        return(
            <div className="product-container">
                <ProductList products={this.props.products}/>
            </div>
        )
    }
}