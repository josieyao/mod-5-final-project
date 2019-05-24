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

// const io = socketIO("http://10.185.2.251:8080/");

// window.io = io;

// const mapStateToProps = (state) => {
//   return {}
// }

// const mapDispatchToProps = {
//   fetchProducts: () => dispatch => {
//     fetch('http://localhost:3000/products')
//         .then( res => res.json())
//         .then( products => dispatch({ type: 'FETCH_PRODUCTS', products: products }))
//   }

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


// }

const mapStateToProps = (state) => ({
  products: state.products
})

const mapDispatchToProps = {
  loadTempCart: items => ({ type: "LOAD_TEMPORARY_CART", cartItems: items })
}

export default connect(mapStateToProps, mapDispatchToProps)(

class App extends React.Component {
  componentDidMount() {
    // if(localStorage.getItem('token'))

    if(localStorage.getItem('cart'))
      this.props.loadTempCart(JSON.parse(localStorage.getItem('cart')))
      // this.props.loadTempCart({"SomeEcoThing": 3, "SomethingElse": 5})
    else
      localStorage.setItem('cart', JSON.stringify([]))
    

  //   this.props.fetchProducts()


  //   io.emit('products.index', products => {
  //     // console.log(products)
  //     this.setState({ products })
  //   })

  //   io.on('products.update', products => {
  //     this.setState({ products })
  //   })

  //   this.checkAuth();
  }

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


    render() {

      return (
        <Router history={history}>
          <div className="App">
            <NavBar />
            <ImageContainer />
            <Switch>
              
              <Route path="/login" render={() => (<Login checkAuth={this.checkAuth} users={this.state.users} />
                )}/>
              <Route exact path="/products" component={MainContainer}/>
              <Route exact path="/products/:id" component={ProductShowPage} />
              <Route path="/cart" component={CartContainer}/>
              <Route path="/checkout" component={Login}/>
            </Switch>
          </div>
        </Router>
      );
    }
  }
)


