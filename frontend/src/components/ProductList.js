import React from 'react'
import ProductCard from './ProductCard';
// import Grid from '@material-ui/core/Grid';

export default class ProductList extends React.Component {
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

            {/* <Grid container className="product-list-container"></Grid>
                <Grid item xs style={{display: 'flex', padding: '20px', margin: '10px'}}>
                    {this.props.products.map( product => (
                    <ProductCard {...product}/> ))}
                </Grid>
            </Grid> */}