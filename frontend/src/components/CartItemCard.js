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

  //   incrementButtonClicked = (product) => {
  //   if(this.props.currentUser){
  //       fetch(`http://localhost:3000/carts/${id}`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           productId: product.id,
  //           userId: this.props.currentUser.id
  //       })
  //       .then( res => res.json())
  //       .then( product => {
  //         this.props.addOneToQuantity(product.id)
  //       })
  //   })} else {
  //     this.props.addOneToQuantity(product.id)
  //   }
  // }

    render() {
    const subtotal = this.props.price * this.props.quantity
    const roundedSubtotal = Math.floor(subtotal * 100) / 100
      console.log(this.props.quantity)
      return (
        <div className="cart-item-card">
          <img src={this.props.image1} alt=" " height="200" width="200" />

          <div className="card-item-details" style={{marginLeft: '10px'}}>
            <h3>{this.props.name}</h3>
            <br/>
            <p>Price: ${this.props.price}</p>
            <br/>
            <div className="add-and-minus-quantity">
              
              <i className="far fa-minus-square" style={{cursor: 'pointer', marginRight: '10px'}} onClick={() => this.props.deleteOneToQuantity(this.props.id)}></i>

              <p>{this.props.quantity}</p>

              <i className="far fa-plus-square" style={{cursor: 'pointer', marginLeft: '10px'}} onClick={() => this.props.addOneToQuantity(this.props.id)}></i>
            </div>
            <br/>
            <p>Subtotal ${roundedSubtotal}</p>
            <br/>
            <DeleteRoundedIcon style={{cursor: 'pointer'}} onClick={ () => this.props.deleteItemFromCart(this.props.id)}></DeleteRoundedIcon>
            <br/>
            <br/>
          </div>
        </div>
      );
    }
  }
);
