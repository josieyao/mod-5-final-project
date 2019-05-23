import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    currentProduct: state.currentProduct
})

const mapDispatchToProps = {
    addOneToQuantity: () => {
        return { type: "INCREMENT_QUANTITY" };
    },
    deleteOneToQuantity: () => {
        return { type: "DECREMENT_QUANTITY" };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    class CartItemCard extends React.Component {

        render(){

            return(
                <div className="cart-item-card">
                    <img src={this.props.image1} alt=" " height="300" width="300" ></img>
                    <h3>{this.props.name}</h3>
                    <p>${this.props.price}</p>
                    <button onClick={() => this.props.addOneToQuantity()}>+</button>
                    <p>{this.props.currentProduct.quantity}</p>
                    <button onClick={() => this.props.deleteOneToQuantity()}>-</button>
                </div>
            )
        }
    }
)