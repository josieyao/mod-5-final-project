import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        product: state.currentProduct,
        quantity: state.productItemQuantity
    }
}

const mapDispatchToProps = {
    addOneToQuantity: (number) => {
        return { type: 'UPDATE_QUANTITY_IN_CART', number: number }
    },
    deleteOneToQuantity: (number) => {
        return { type: 'REDUCE_QUANTITY_IN_CART', number: number }
    },
    addItemToCart: (e) => {
        return { type: 'ADD_ITEM_TO_CART'}
    },
    selectProductItem: (id) => ({ type: 'SELECT_PRODUCT_ITEM', id: id })
}

const myConnector = connect(mapStateToProps, mapDispatchToProps)


export default connect(mapStateToProps, mapDispatchToProps) (
    class _ProductShowPage extends React.Component {

        componentDidMount(){
            this.props.selectProductItem(this.props.match.params.id)
        }

        render(){
            if(!this.props.product) return <h1>Loading...</h1>
            return(
                <div className="product-show-container">
                    <div className="product-image">
                        <img src={this.props.image1} alt=" " height="500" width="500"></img>
                    </div>
                    <div className="product-details">
                        <h4>{this.props.name}</h4>
                        <p>${this.props.price}</p>
                        <p>{this.props.description}</p>
                        <br/>
                        <button onClick={() => this.props.addOneToQuantity()}>Add 1 to Quantity</button><br/>
                        <button onClick={() => this.props.deleteOneToQuantity()}>Add 1 to Quantity</button><br/>
                        <button onClick={this.props.addItemToCart}>Add to Cart</button>
                    </div>
                    {/* <h1>Bamboo Travel Utensils</h1>
                    <div className="product-image">
                        <img src="https://cdn.shopify.com/s/files/1/1721/9289/products/togo_black_f23c06ac-6ee9-4dea-8ab0-ce1b2632fd61_900x.jpg?v=1557248571" alt=" " height="500" width="500"></img>
                    </div>
                    <div className="product-details">
                        <h4>Product Name</h4>
                        <p>$1.00</p>
                        <p>Bamboo travel utensils are a must have for waste-free dining on the go. The utensils are 100% bamboo and include a knife, fork, spoon and chopsticks. The case is made from recycled plastic bottles and features a handy carabiner on the back so you can clip onto your bag and go.</p>
                        <br/>
                        <button onClick={() => this.props.updateQuantity(number)}>Update Quantity</button><br/>
                        <button onClick={this.props.addItemToCart}>Add to Cart</button>
                    </div> */}
                </div>
            )
        }
    }
)

//export const ProductShowPage = myConnector(_ProductShowPage)