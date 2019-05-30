import React from 'react'
import NavBar from './NavBar'
import ProductContainer from './ProductContainer'
import ImageContainer from './ImageContainer'


export default class MainContainer extends React.Component {

    render(){
        // console.log(this.props)

        return(
            <div className="main-container">
                {/* <NavBar/>
                <ImageContainer/> */}
                <ProductContainer/>
            </div>
        )
    }
}