import React from 'react'
import ProductCard from './ProductCard';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    products: state.products
})

const mapDispatchToProps = {
    fetchAllProducts: () => dispatch => {
        fetch('http://localhost:3000/products')
            .then( res => res.json())
            .then( products => dispatch({ type: 'FETCH_PRODUCTS', products: products }))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    
    class KitchenList extends React.Component {

        componentDidMount() {
            this.props.fetchAllProducts();
        }

        render(){
            let kitchenProducts = this.props.products.filter( product => product.category == "Kitchen")

            return(
                <div className="product-list-container">
                    <div className="product-list">
                        {kitchenProducts.map( product => (
                            <ProductCard {...product}/>
                        ))}
                    </div>
                </div>
            )
        }
    }
)