import React from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends React.Component {

    render(){

        return(
            <div className="navbar-container">
                <div className="nav-links">
                    <Link to="/kitchen">
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
                        <li>Cart</li>
                    </Link>
                </div>
            </div>
        )
    }
}