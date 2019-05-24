import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  currentProduct: state.currentProduct,
  cartItems: state.cartItems
});

const mapDispatchToProps = {
  addOneToQuantity: id => {
    return { type: "INCREMENT_QUANTITY", id: id };
  },
  deleteOneToQuantity: id => {
    return { type: "DECREMENT_QUANTITY", id: id };
  },
  updateTotalCost: () => {
    return { type: "UPDATE_TOTAL_COST" };
  },
  deleteItemFromCart: id => {
      return { type: "DELETE_ITEM_FROM_CART", id: id} 
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class CartItemCard extends React.Component {
    

    render() {
    const subtotal = this.props.price * this.props.quantity
    const roundedSubtotal = Math.floor(subtotal * 100) / 100

      return (
        <div className="cart-item-card">
          <img src={this.props.image1} alt=" " height="300" width="300" />
          <h3>{this.props.name}</h3>
          <p>${this.props.price}</p>
          <button onClick={() => this.props.addOneToQuantity(this.props.id)}>
            +
          </button>
          <p>{this.props.quantity}</p>
          <button onClick={() => this.props.deleteOneToQuantity(this.props.id)}>-</button>
          <p>Subtotal ${roundedSubtotal}</p>

          <button onClick={ () => this.props.deleteItemFromCart(this.props.id)}>Remove Item</button>
          <br/>
          <br/>
        </div>
      );
    }
  }
);
