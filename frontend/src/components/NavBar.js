import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    cartItems: state.cartItems,
    currentUser: state.currentUser
})

const mapDispatchToProps = {
    // getCurrentCartQuantity: total => {
    //     return { type: "UPDATE_TOTAL_COST", totalQuantity: total }
}

export default connect(mapStateToProps, mapDispatchToProps)(

    class NavBar extends React.Component {

        calculateQuantity = () => {
            if (this.props.currentUser && this.props.cartItems.length > 0) {
                let totalNum = 0
                this.props.cartItems.map(item => {
                    // console.log(item.quantity)
                    // console.log(item.cart)
                    item.cart ? totalNum += item.cart.quantity : totalNum += item.quantity
                })
                return totalNum
            } else if( !this.props.currentUser && this.props.cartItems.length > 0 ){
                let totalNum = 0
                this.props.cartItems.forEach(item => {
                    console.log(item)
                    totalNum += item.cart.quantity
                })
                return totalNum
            } else {
                let totalNum = 0
                return totalNum
            }
        }

        render(){
      
            return(
                <div className="navbar-container">
                    <div className="nav-links">
                        <Link to="/products">
                            <li>All Products</li>
                        </Link>
                        <Link to="/products/kitchen">
                            <li>Kitchen</li>
                        </Link>
                        <Link to={"/bathroom"}>
                            <li>Bathroom</li>
                        </Link>
                        <Link to="/bedroom">
                            <li>Bedroom</li>
                        </Link>
                        <Link to="/kits">
                            <li>Kits</li>
                        </Link>
                        <Link to="/cart">
                            <i className="fas fa-shopping-cart">({this.calculateQuantity()})</i>
                        </Link>
                    </div>
                </div>
            )
        }
    }
)