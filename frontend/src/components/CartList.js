import React from "react";
import CartItemCard from "./CartItemCard";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = state => ({
  cartItems: state.cartItems
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class CartList extends React.Component {
    render() {
      const totalCost = this.props.cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity}, 0);
      const roundedCost = Math.floor(totalCost * 100) / 100

      return (
        <div className="cart-list-container">
          <h1 style={{fontSize: '70px', textAlign: 'center'}}>Your Cart</h1>
          <div className="cart-list">
            {this.props.cartItems.length === 0 ? 
            
                <h2>Your cart is currently empty</h2> : 

                <div> 
                     {this.props.cartItems.map(item => <CartItemCard {...item} />)}
                    <p style={{fontSize: '40px'}}>Total: ${roundedCost}</p>
                    <Link to={"/checkout"}>
                        <button>Checkout</button>
                    </Link>
               </div>}
            </div>
        </div>
      )
    }
  }
)
