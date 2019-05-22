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
                    <div className="cart-list">
                        {this.props.cartItems.map( item => (
                            <CartItemCard {...item}/>
                        ))}
                    </div>

                </div>
            )
        }
    }
)