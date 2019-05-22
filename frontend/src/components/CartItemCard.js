import React from 'react'

export default class CartItemCard extends React.Component {

    render(){

        return(
            <div className="cart-item-card">
                <img>Image</img>
                <p>Price</p>
                <button onClick={this.props.addOneToQuantity}>Update Quantity</button>
                <button onClick={this.props.removeItemFromCart}>Remove</button>
            </div>
        )
    }
}