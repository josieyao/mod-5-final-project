import React from 'react'


export default class ProductShowPage extends React.Component {

    render(){
        return(
            <div className="product-show-container">
                <div className="product-image">
                    <img src="https://cdn.shopify.com/s/files/1/1721/9289/products/togo_black_f23c06ac-6ee9-4dea-8ab0-ce1b2632fd61_900x.jpg?v=1557248571" alt=" " height="500" width="500"></img>
                </div>
                <div className="product-details">
                    <h4>Product Name</h4>
                    <p>$1.00</p>
                    <p>Bamboo travel utensils are a must have for waste-free dining on the go. The utensils are 100% bamboo and include a knife, fork, spoon and chopsticks. The case is made from recycled plastic bottles and features a handy carabiner on the back so you can clip onto your bag and go.</p>
                    <br/>
                    <button>Quantity</button><br/>
                    <button>Add to Cart</button>
                </div>
            </div>
        )
    }
}