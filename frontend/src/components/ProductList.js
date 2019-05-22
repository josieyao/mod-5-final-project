import React from 'react'
import ProductCard from './ProductCard';
import { connect } from 'react-redux'
// import Grid from '@material-ui/core/Grid';

const mapStateToProps = (state) => ({
    products: state.products
})

// Add the prop methods you want to dispatch to state here:
const mapDispatchToProps = {
    fetchProducts: () => {
        return dispatch => {
            fetch('http://localhost:3000/products')
                .then( res => res.json())
                .then( products => {
                    dispatch({ type: 'FETCH_PRODUCTS', products: products })
                })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    class ProductList extends React.Component {

        componentDidMount(){
            this.props.fetchProducts()
        }


        render(){
            return(
                <div className="product-list-container">
                    <div className="product-list">
                        {this.props.products.map( product => (
                            <ProductCard {...product}/>
                        ))}
                    </div>
                </div>

            )
        }
    }
)

            {/* <Grid container className="product-list-container"></Grid>
                <Grid item xs style={{display: 'flex', padding: '20px', margin: '10px'}}>
                    {this.props.products.map( product => (
                    <ProductCard {...product}/> ))}
                </Grid>
            </Grid> */}