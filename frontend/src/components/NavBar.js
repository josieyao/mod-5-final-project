import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    cartItems: state.cartItems
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(

    class NavBar extends React.Component {

        render(){
        const cartQuantity = this.props.cartItems.reduce((acc, item) => {return acc + item.quantity }, 0)

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
                            <i className="fas fa-shopping-cart">({cartQuantity})</i>
                        </Link>
                    </div>
                </div>
            )
        }
    }
)