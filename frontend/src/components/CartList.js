import React from 'react'
import { connect } from 'react-redux'
import CartItemCard from './CartItemCard'


const mapStateToProps = (state) => ({
    cartItems: state.cartItems
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(
    class CartList extends React.Component {

        render(){

            return(
                <div className="cart-list-container">
                    <h1>Your Cart</h1>
                    <div className="cart-list">
                        {/* if (this.props.cartItems.length == 0) ? <p>Your cart is currently empty</p> : */}
                        {this.props.cartItems.map( item => (
                            <CartItemCard {...item}/>
                        ))}
                    </div>

                </div>
            )
        }
    }
)