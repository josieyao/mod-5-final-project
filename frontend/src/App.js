import React from "react";
import socketIO from "socket.io-client";
import "./App.css";
import LogInOutButton from "./components/LogInOutButton"
import Header from "./components/Header"
import NavBar from "./components/NavBar";
import ImageContainer from "./components/ImageContainer";
import Login from "./components/Login";
import Registration from "./components/Registration"
import MainContainer from "./components/MainContainer";
import HomeContainer from "./components/HomeContainer";
import ProductShowPage from "./components/ProductShowPage";
import CartContainer from "./components/CartContainer";
import KitchenList from "./components/KitchenList"
import PrivateRoute from './components/PrivateRoute'
import Footer from "./components/Footer"
import Checkout from "./components/Checkout"
import NoPageFound from "./components/NoPageFound"
import { Router, Switch } from "react-router-dom";
import history from "./history";
import { connect } from 'react-redux'

// const io = socketIO("http://10.185.2.251:8080/");

// window.io = io;

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
    }

    render() {
      // write a boolean function to conditionally render and use the "Redirect" from react router

      return (
        <Router history={history}>
          <div className="App">
            <LogInOutButton/>
            <Header/>
            <NavBar />
            <ImageContainer />
            <Switch>
              <PrivateRoute exact path="/" component={HomeContainer}/>
              <PrivateRoute path="/login" component={Login}/>
              {/* <PrivateRoute exact path="/products" component={MainContainer} /> */}
              <PrivateRoute exact path="/products" render={() => <MainContainer filter={"Products"}/>}/>
              <PrivateRoute exact path="/products/kitchen" render={() => <MainContainer filter={"Kitchen"}/>}/>
              <PrivateRoute exact path="/products/bathroom" render={() => <MainContainer filter={"Bathroom"}/>}/>
              <PrivateRoute exact path="/products/personal" render={() => <MainContainer filter={"Personal"}/>}/>
              <PrivateRoute exact path="/products/kits" render={() => <MainContainer filter={"Kits"}/>}/>
              <PrivateRoute exact path="/products/:id" component={ProductShowPage} />
              <PrivateRoute path="/cart" component={CartContainer}/>
              <PrivateRoute path="/checkout" component={Checkout}/>
              <PrivateRoute path="/registration" component={Registration}/>
              <PrivateRoute component={NoPageFound}/>
            </Switch>
            {/* <Footer/> */}
          </div>
        </Router>
      );
    }
  }
)


