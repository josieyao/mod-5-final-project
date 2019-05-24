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
      // let cartPrices = this.props.cartItems.map( item => item.price )

      const totalCost = this.props.cartItems.reduce((acc, item) => {
          console.log(acc, item, item.price )
        return acc + item.price * item.quantity;
      }, 0);
      const roundedCost = Math.floor(totalCost * 100) / 100

      return (
        <div className="cart-list-container">
          <h1>Your Cart</h1>
          <div className="cart-list">
            {this.props.cartItems.length === 0 ? 
            
                <h2>Your cart is currently empty</h2> : 
                
                <div> 
                     {this.props.cartItems.map(item => <CartItemCard {...item} />)}
                    <p>Total ${roundedCost}</p>
                    <Link to={"/checkout"}>
                        <button>Checkout</button>
                    </Link>
               </div>}
            </div>
        </div>
      );
    }
  }
);
