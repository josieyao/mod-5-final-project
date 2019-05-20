import React from 'react'
import NavBar from './NavBar'
import ProductContainer from './ProductContainer'
import ImageContainer from './ImageContainer'


export default class Main extends React.Component {

    render(){
        console.log(this.props.products)

        return(
            <div className="main-container">
                {/* <NavBar/>
                <ImageContainer/> */}
                <ProductContainer products={this.props.products}/>
            </div>
        )
    }
}