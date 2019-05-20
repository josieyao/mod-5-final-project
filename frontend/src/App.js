import React from 'react';
import socketIO from 'socket.io-client'
import './App.css';
import Main from './components/Main'
import NavBar from './components/NavBar'
import ImageContainer from './components/ImageContainer'
import ProductShowPage from './components/ProductShowPage'
import Cart from './components/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const io = socketIO('http://192.168.0.104:8080/')

window.io = io

export default class App extends React.Component {

  state = {
    products: []
  }

  componentDidMount(){
    io.emit('products.index', products => {
      // console.log(products)
      this.setState({ products })
    })
  
    io.on('products.update', products => {
      this.setState({ products })
    })
  }

  render(){
    let products = this.state.products 
    console.log(products)

    return (
      <Router>
        <div className="App">
          <NavBar/>
          <ImageContainer/>
          <Switch>
            <Route exact path="/" render={() => <Main products={products}/>} />
            <Route path="/products/1" render={() => <ProductShowPage products={products}/>} />
            <Route path="/cart" render={() => <Cart products={products}/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}
