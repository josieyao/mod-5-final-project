import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = state => {
  return {
    currentProduct: state.currentProduct
  }
}

const mapDispatchToProps = {
  selectProductItem: id => ({ type: "SELECT_PRODUCT_ITEM", id: id })
}

export default connect(mapStateToProps,mapDispatchToProps)(
  class ProductCard extends React.Component {

    render() {

      return (
        <div className="product-card">
          <img src={this.props.image1} alt=" " height="300" width="300" />
          <h4>{this.props.name}</h4>
          <p>${this.props.price}</p>
          <br />
          <Link to={`/products/${this.props.id}`}>
            <button onClick={() => this.props.selectProductItem(this.props.id)}>
              View
            </button>
          </Link>
        </div>
      );
    }
  }
);

