import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    cartItems: state.cartItems
  };
};

const mapDispatchToProps = {
  setCurrentUser: user => {
    return { type: "CURRENT_USER", currentUser: user };
  },
  loadCartItems: cartItems => {
    return { type: "LOAD_TEMPORARY_CART", cartItems: cartItems }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(

  class Login extends React.Component {
    state = {
      username: "",
      password: ""
    };

    handleLoginSubmit = e => {
      e.preventDefault();

      let username = e.target.username.value;
      let password = e.target.password.value;

      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
        .then(res => res.json())
        .then(userData => {
          // console.log(user)
          // console.log(JSON.parse(localStorage.cart))
          // console.log(localStorage)
          // localStorage.clear()
          localStorage.setItem("token", userData.token);

          this.props.setCurrentUser(userData)
          this.handleLocalStorageCart()

          this.props.history.push('/products')
        });
    };

    handleLocalStorageCart = () => {
      // console.log(localStorage.getItem("token"))
      fetch("http://localhost:3000/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          cart: this.props.cartItems,
          userId: this.props.currentUser.id
        })
      })
        .then(res => res.json())
        .then((cartData) => {
          this.props.loadCartItems(cartData)
          // cartData.forEach( item => this.props.loadCartItems(item))

        })
    };


    handleChange = e => {
      this.setState({
        [e.target.username]: e.target.value
      });
    };

    render() {
      return (
        <div className="login-form-container">
          <h1>{this.props.location.successfulMsg}</h1>
          <br/>
          <form onSubmit={this.handleLoginSubmit}>
          
            <div className="login-form">
              <h1>Login</h1>
              <br/>
              <label for="username">
                <b>Username</b>
              </label>
              <br />
              <input
                onChange={this.handleChange}
                type="text"
                placeholder="Enter Username"
                name="username"
                required
              />
              <br />
              <label for="password">
                <b>Password</b>
              </label>
              <br />
              <input
                onChange={this.handleChange}
                type="password"
                placeholder="Enter Password"
                name="password"
                required
              />
              <br />
              <Button variant="outlined" size="small" color="primary" style={{textDecoration: 'none', color: 'black', marginRight: '5px'}}
                button
                className="tiny ui inverted red basic button"
                type="submit"
              >
                Login
              </Button>
              <br />
              <br />

              <h1>No Account Yet?</h1>
              <Link to="/registration">
              <Button variant="outlined" size="small" color="primary" style={{textDecoration: 'none', color: 'black', marginRight: '5px'}}
                  type="submit"
                >
                  Create New Account
                </Button>
              </Link>
              <br/>
              <br/>
            </div>
          </form>
        </div>
      );
    }
  }
)
