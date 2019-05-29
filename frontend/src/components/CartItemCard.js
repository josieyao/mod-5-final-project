import React from "react";
import { connect } from "react-redux";
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';


const mapStateToProps = state => ({
  currentProduct: state.currentProduct,
  cartItems: state.cartItems,
  currentUser: state.currentUser
});

const mapDispatchToProps = {
  addOneToQuantity: id => {
    return { type: "INCREMENT_QUANTITY", id: id };
  },
  setQuantity: (id, quantity) => {
    return { type: "SET_QUANTITY", id: id, quantity: quantity };
  },
  deleteOneToQuantity: id => {
    return { type: "DECREMENT_QUANTITY", id: id };
  },
  updateTotalCost: () => {
    return { type: "UPDATE_TOTAL_COST" };
  },
  deleteItemFromCart: id => {
      alert('Are you sure you want to delete this item?')
      return { type: "DELETE_ITEM_FROM_CART", id: id} 
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  class CartItemCard extends React.Component {
    
    quantityButtonClicked = (product, action) => {
    if(this.props.currentUser){
      // console.log(this.props.currentUser.id)
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}/carts?product=${product}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  action: action
                })
              })
          .then( res => res.json())
          .then( data => {
            // console.log('data')
            this.props.setQuantity(product, data.quantity)
          })
        } else {
             this.props.addOneToQuantity(product)
          }
    }

    getCurrentSubtotal = () => {
      if(this.props.currentUser){
        // console.log(this.props.price)
        // console.log(this.props.cart.quantity)
        
        let subtotal = this.props.price * this.props.cart.quantity
        let roundedSubtotal = Math.floor(subtotal * 100) / 100
        // console.log(roundedSubtotal)
        return roundedSubtotal
      } else {
        let subtotal = this.props.price * this.props.cart.quantity
        let roundedSubtotal = Math.floor(subtotal * 100) / 100
        return roundedSubtotal
      }
    }

    deleteButtonClicked = (product) => {
      if(this.props.currentUser){
        // console.log(this.props.currentUser.id)
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}/carts?product=${product}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  product: product
                })
              })
          .then( res => res.json())
          .then( data => {
            // console.log(data)

            //needs to decrease cart quantity and remove item from card
            if (data.status === "success") {
              this.props.deleteItemFromCart(product)
            }
          })
        } else {
            //needs to decrease cart quantity and remove item from card
            this.props.deleteItemFromCart(product)
          }
      }

    render() {

    // console.log(this.props.cartItems)
      return (
        <div className="cart-item-card">
          <img src={this.props.image1} alt=" " height="200" width="200" />

          <div className="card-item-details" style={{marginLeft: '10px'}}>
            <h3>{this.props.name}</h3>
            <br/>
            <p>Price: ${this.props.price}</p>
            <br/>
            <div className="add-and-minus-quantity">
              
              <i className="far fa-minus-square" style={{cursor: 'pointer', marginRight: '10px'}} onClick={() => this.quantityButtonClicked(this.props.id, "decrement")}></i>

              <p>{this.props.quantity || this.props.cart.quantity}</p>

              <i className="far fa-plus-square" style={{cursor: 'pointer', marginLeft: '10px'}} onClick={() => this.quantityButtonClicked(this.props.id, "increment")}/*this.props.addOneToQuantity(this.props.id)}*/></i>
            </div>
            <br/>
            <p>Subtotal ${this.getCurrentSubtotal()}</p>
            <br/>
            <DeleteRoundedIcon style={{cursor: 'pointer'}} onClick={ () => this.deleteButtonClicked(this.props.id)}/*this.props.deleteItemFromCart(this.props.id)}*/></DeleteRoundedIcon>
            <br/>
            <br/>
          </div>
        </div>
      );
    }
  }
)
