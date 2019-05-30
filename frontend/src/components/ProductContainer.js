import React from 'react'
import ProductList from './ProductList'


export default class ProductContainer extends React.Component {

    render(){
        console.log(this.props.filter)
        return(
            <div className="product-container">
                <ProductList {...this.props}/>
            </div>
        )
    }
}