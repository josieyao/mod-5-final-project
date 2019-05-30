import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const mapStateToProps = state => {
  return {
    currentProduct: state.currentProduct,
    cartItems: state.cartItems,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = {
  loadCartItems: cartItems => {
    return { type: "LOAD_TEMPORARY_CART", cartItems: cartItems }
  },
  addItemToCart: product => {
    console.log("wat")
    return { type: "ADD_ITEM_TO_CART", cartItems: product }
  },
  selectProductItem: id => dispatch => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(product =>
        dispatch({ type: "SELECT_PRODUCT_ITEM", product: product })
      );
  },
  updateTotalCost: product => {
    return { type: "UPDATE_TOTAL_COST", totalCost: product.price }
  },
  addOneToQuantity: id => {
    console.log(id)
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

      // const itemAlreadyInCart = this.props.cartItems.find( item => item.id === product.id)
      // itemAlreadyInCart ? this.props.addOneToQuantity(product.id) : this.props.addItemToCart(product)

      if (this.props.currentUser) {
        console.log([this.props.currentProduct])
        fetch('http://localhost:3000/carts', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            cart: [this.props.currentProduct],
            productId: product.id,
            userId: this.props.currentUser.id
          })
        })
          .then(res => res.json())
          .then(products => {
            const itemAlreadyInCart = products.find(item => item.id === product.id)
            itemAlreadyInCart ? this.props.addOneToQuantity(product.id) : this.props.addItemToCart(product)
          })
      } else {
        const itemAlreadyInCart = this.props.cartItems.find(item => item.id === product.id)
        itemAlreadyInCart ? this.props.addOneToQuantity(product.id) : this.props.addItemToCart(product)
        // this.props.addOneToQuantity(product.id)
      }
    }

    render() {
      if (!this.props.currentProduct) return <h1>No item found</h1>;
      return (
        <div className="product-show-container">
          <div className="product-image">
            <img
              src={this.props.currentProduct.image1}
              alt=" "
              height="400"
              width="400"
            />
          </div>
          <div className="product-details">
            <h4>{this.props.currentProduct.name}</h4>
            <br />
            <p>${this.props.currentProduct.price}</p>
            <br />
            <p>{this.props.currentProduct.description}</p>
            <br />
            <br />
            {this.props.cartItems.find(item => item.id === this.props.currentProduct.id) === undefined ?
              <div>
                <Button variant="outlined" size="small" color="primary" style={{textDecoration: 'none', color: 'black'}} onClick={() => this.addToCartButtonClicked(this.props.currentProduct)}>Add to Cart</Button>
                <br />
                <br />
              </div>
              :
              <div>
                <p style={{fontWeight: 'bold'}}>Added to Cart</p>
                <br />
                <br />
              </div>
            }


            <Link to="/products">
            <Button variant="outlined" size="small" color="primary" style={{textDecoration: 'none', color: 'black'}}>Back to Products</Button>
            </Link>
          </div>
        </div>
        // </div>
      );
    }
  }
);
