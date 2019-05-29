import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

const mapDispatchToProps = {
    logOutUser: () => {
        return { type: "CURRENT_USER", currentUser: null };
      },
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
    class LogInOutButton extends React.Component {

        onLogOutClick = () => {
            this.props.logOutUser()
            localStorage.clear()
            this.props.history.push("/products")
        }

        render(){
            // console.log(this.props.currentUser.first_name)
            return(
                <div className="log-in-out-button">
                    
                    {!this.props.currentUser ?
                    <div>
                        <Link to="/login">
                            <button>Log In</button>
                        </Link>
                        <Link to="/registration">
                            <button>Register</button>
                        </Link>
                    </div> :
                    <div>
                        <p>Welcome, {this.props.currentUser.first_name}</p>
                        <button onClick = {() => this.onLogOutClick()}>Log Out</button>
                    </div>}
                </div>
            )
        }
    }
    )
)