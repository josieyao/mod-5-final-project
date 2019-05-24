import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    currentProduct: state.currentProduct,
    cartItems: state.cartItems
  };
};

const mapDispatchToProps = {
  addItemToCart: product => {
    return { type: "ADD_ITEM_TO_CART", cartItems: product };
  },
  selectProductItem: id => dispatch => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(product =>
        dispatch({ type: "SELECT_PRODUCT_ITEM", product: product })
      );
  },
  updateTotalCost: product => {
    return { type: "UPDATE_TOTAL_COST", totalCost: product.price}
  },
  addOneToQuantity: id => {
    return { type: "INCREMENT_QUANTITY", id: id };
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(
  class ProductShowPage extends React.Component {

    componentDidMount() {
        this.props.selectProductItem(this.props.match.params.id);
    }

    addToCartButtonClicked = (product) => {
      // this.props.addItemToCart(product)
      this.props.updateTotalCost(product)

      const itemAlreadyInCart = this.props.cartItems.find( item => item.id === product.id)
      itemAlreadyInCart ? this.props.addOneToQuantity(product.id) : this.props.addItemToCart(product)
    }

    render() {
      if (!this.props.currentProduct) return <h1>No item found</h1>;
      return (
        <div className="product-show-container">
          <div className="product-image">
            <img
              src={this.props.currentProduct.image1}
              alt=" "
              height="500"
              width="500"
            />
          </div>
          <div className="product-details">
            <h4>{this.props.currentProduct.name}</h4>
            <p>${this.props.currentProduct.price}</p>
            <p>{this.props.currentProduct.description}</p>
            <br/>
            <br/>
            <button onClick={() => this.addToCartButtonClicked(this.props.currentProduct)}>Add to Cart</button>
            
          </div>
        </div>
      );
    }
  }
);
