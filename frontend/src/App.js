import React from "react";
import socketIO from "socket.io-client";
import "./App.css";
import MainContainer from "./components/MainContainer";
import NavBar from "./components/NavBar";
import ImageContainer from "./components/ImageContainer";
import ProductShowPage from "./components/ProductShowPage";
import CartContainer from "./components/CartContainer";
import Login from "./components/Login";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import { connect } from 'react-redux'

const io = socketIO("http://10.185.7.20:8080/");

window.io = io;

// const mapStateToProps = (state) => {
//   return {}
// }

const mapDispatchToProps = {
  fetchProducts: () => dispatch => {
    fetch('http://localhost:3000/products')
        .then( res => res.json())
        .then( products => dispatch({ type: 'FETCH_PRODUCTS', products: products }))
  }

  // setProducts: dispatch => {
  //   fetch("http://localhost:3000/products", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(products => {
  //     dispatch({type: 'FETCH_PRODUCTS', products: products})
  //   });
  // }


}

export default connect(null, mapDispatchToProps) (
  class App extends React.Component {
    // state = {
    //   products: [],
    //   users: []
    // };

    // checkAuth = () => {
    //   if(localStorage.getItem('token') !== undefined || null){
    //     fetch("http://localhost:3000/products", {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`
    //       }
    //     })
    //     .then(res => res.json())
    //     .then(products => {
    //       this.setState({products: products})
    //     });
    //   }
    // };

    componentDidMount() {
      this.props.fetchProducts()


      // io.emit('products.index', products => {
      //   // console.log(products)
      //   this.setState({ products })
      // })

      // io.on('products.update', products => {
      //   this.setState({ products })
      // })

      // this.checkAuth();
    }

    render() {
      // console.log(products)

      return (
        <Router history={history}>
          <div className="App">
            <NavBar />
            <ImageContainer />
            <Switch>
              <Route exact path="/" component={MainContainer}/>
              <Route path="/login" render={() => (<Login checkAuth={this.checkAuth} users={this.state.users} />
                )}/>
              <Route path="/products/:id" component={ProductShowPage} />
              <Route path="/cart" component={CartContainer}
              />
            </Switch>
          </div>
        </Router>
      );
    }
  }
)
