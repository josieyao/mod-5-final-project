import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    products: state.products,
    currentUser: state.currentUser
})

const mapDispatchToProps = {
    setCurrentUser: user => {
        return { type: "CURRENT_USER", currentUser: user };
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(

    class Registration extends React.Component {

        state = {
            username: '',
            password: ''
        }

        handleRegistrationSubmit = (e) => {
            e.preventDefault()

            let firstname =  e.target.firstname.value
            let lastname =  e.target.lastname.value
            let email =  e.target.email.value
            let username =  e.target.username.value
            let password = e.target.password.value
            
            fetch('http://localhost:3000/registration',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        username: username,
                        password: password
                })
            })
            .then(res=> res.json())
            .then(user => {
                // console.log(user)
                // this.props.setCurrentUser(user.user)
                // localStorage.setItem('token', user.auth_token)
                // this.props.history.push("/products")
                this.props.history.push({pathname: "/login", successfulMsg: "Registration Successful! Please log in."})
            })
        }

        handleChange = (e) => {
        this.setState({
            [e.target.username]: e.target.value
        })}

        render(){
            return(
                <div className="registration-form-container">
                    <h1>Create a New Account</h1>
                    <form onSubmit={this.handleRegistrationSubmit}>
                        <div class="registration-form">

                            <label for="firstname"><b>First Name</b></label><br/>
                            <input onChange={this.handleChange} type="firstname" placeholder="Enter First Name" name="firstname" required/>
                            <br/>

                            <label for="lastname"><b>Last Name</b></label><br/>
                            <input onChange={this.handleChange} type="lastname" placeholder="Enter Last Name" name="lastname" required/>
                            <br/>

                            <label for="email"><b>Email</b></label><br/>
                            <input onChange={this.handleChange} type="email" placeholder="Enter Email" name="email" required/>
                            <br/>

                            <label for="username"><b>Username</b></label><br/>
                            <input onChange={this.handleChange} type="text" placeholder="Enter Username" name="username" required/>
                            <br/>

                            <label for="password"><b>Password</b></label><br/>
                            <input onChange={this.handleChange} type="password" placeholder="Enter Password" name="password" required/>
                            <br/>
                            <br/>

                            {/* <Link to="/login"> */}
                                <button button className="tiny ui inverted red basic button" type="submit">Submit</button>
                            {/* </Link> */}
                            <br/>
                            <br/>

                            {/* <h4>No Account Yet?</h4>
                            <Link to="/new">
                            <button button className="tiny ui inverted red basic button" type="submit">Create New Account</button>
                            </Link> */}
                        </div>
                    </form>
             </div>
            )
        } 
    }
)
