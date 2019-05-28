import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

const mapDispatchToProps = {
  
}
  
export default connect(mapStateToProps, mapDispatchToProps)(
    class LogInOutButton extends React.Component {
        render(){
            return(
                <div className="log-in-out-button">
                    
                    {this.props.currentUser ?
                    <div>
                        <Link to="/login">
                            <button>Log In</button>
                        </Link>
                        <Link to="/registration">
                            <button>Register</button>
                        </Link>
                    </div> :
                    <button>Log Out</button>}
                </div>
            )
        }
    }
)