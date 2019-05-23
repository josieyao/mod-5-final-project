import React from 'react'
import { connect } from 'react-redux'
import CartList from './CartList'

const mapStateToProps = (state) => {
    return {
        cart: state.cartItems
    }
}

const mapDispatchToProps = () => {

}

const myConnector = connect(mapStateToProps, mapDispatchToProps)

class _CartContainer extends React.Component {

    render(){
        return(
            <div className="cart-container">
                <CartList/>
            </div>
        )
    }
}

export default /*CartContainer = */ myConnector(_CartContainer)