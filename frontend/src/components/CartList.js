import React from "react";
import CartItemCard from "./CartItemCard";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  cartItems: state.cartItems,
  currentUser: state.currentUser
});

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class CartList extends React.Component {

    componentDidMount = () => {
      // console.log(this.props.currentUser)
      if (this.props.currentUser) {
        fetch(`http://localhost:3000/carts?user=${this.props.currentUser.id}`)
          .then(res => res.json())
          .then(cart => {
            // console.log(cart)
            localStorage.removeItem("cart")
            localStorage.setItem("cart", JSON.stringify(cart))
          })
        // console.log(localStorage.getItem("cart"))
      }
    }

    totalRoundedCost = () => {
      //if user is logged in & has something in their cart
      if (this.props.currentUser && this.props.cartItems.length > 0) {
        let total = 0
        this.props.cartItems.map(item => {
          total += item.price * item.cart.quantity
        })
        let totalCost = total
        let roundedCost = Math.floor(totalCost * 100) / 100
        return roundedCost

        //user is not logged in & has something in their cart
      } else if (!this.props.currentUser && this.props.cartItems.length > 0) {
        const totalCost = this.props.cartItems.reduce((acc, item) => {
          return acc + item.price * item.cart.quantity
        }, 0);
        let roundedCost = Math.floor(totalCost * 100) / 100
        return roundedCost

        //user is either logged in or not logged in & has nothing in their cart
      } else {
        let roundedCost = 0
        return roundedCost
      }
    }

    render() {

      // const roundedCost = Math.floor(totalCost * 100) / 100

      return (
        <div className="cart-list-container">
          <h1 style={{ fontSize: '70px', textAlign: 'center' }}>Your Cart</h1>
          <div className="cart-list">
            {this.props.cartItems.length === 0 ?
              <div style={{marginLeft: '-70px'}}>
                <br/>
                <h2 style={{textAlign: 'center', fontSize: '35px'}}>Your cart is currently empty.</h2> 
              </div>
              :

              <div>
                {this.props.cartItems.map(item => <CartItemCard {...item} />)}
                <p style={{ fontSize: '30px', textAlign: 'left', fontWeight: 'bold', padding: '10px', marginTop: '20px'}}>Total: ${this.totalRoundedCost()}</p>
                <br/>
                <Link to={"/checkout"}>
                <Button variant="outlined" size="small" color="primary" style={{textDecoration: 'none', color: 'black', marginLeft: '10px', cursor: 'pointer', marginBottom: '100px'}}>Checkout</Button>
                </Link>
              </div>}
          </div>
        </div>
      )
    }
  }
)
