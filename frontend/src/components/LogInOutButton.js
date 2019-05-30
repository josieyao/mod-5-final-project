import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

const mapDispatchToProps = {
    clearCart: () => {
        return { type: "LOAD_TEMPORARY_CART", cartItems: [] };
      },
    logOutUser: () => {
        return { type: "CURRENT_USER", currentUser: null };
      },
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
    class LogInOutButton extends React.Component {

        onLogOutClick = () => {
            localStorage.clear()
            this.props.logOutUser()
            this.props.clearCart()
            this.props.history.push("/products")
        }

        render(){
            // console.log(this.props.currentUser.first_name)
            return(
                <div className="log-in-out-button">
                    
                    {!this.props.currentUser ?
                    <div>
                        <Link to="/login">
                        <Button variant="outlined" color="inherit" >Log In</Button>
                        </Link>
                        <Link to="/registration">
                        <Button variant="outlined" color="inherit">Register</Button>
                        </Link>
                    </div> :
                    <div>
                        <p style={{fontSize: '20px', marginRight: '30px'}}>Welcome, {this.props.currentUser.first_name}</p>
                        <Button variant="outlined" color="inherit" onClick = {() => this.onLogOutClick()}>Log Out</Button>
                    </div>}
                </div>
            )
        }
    }
    )
)