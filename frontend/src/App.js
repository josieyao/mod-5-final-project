import React from 'react';
import socketIO from 'socket.io-client'
import './App.css';
import MainContainer from './components/MainContainer'
import NavBar from './components/NavBar'
import ImageContainer from './components/ImageContainer'
import ProductShowPage from './components/ProductShowPage'
import CartContainer from './components/CartContainer'
import Login from './components/Login'
import { Router as Router, Switch, Route } from 'react-router-dom'
import history from './history'

const io = socketIO('http://10.185.2.100:8080/')

window.io = io

export default class App extends React.Component {

  state = {
    products: [],
    users: []
  }

  checkAuth = () => {
    if(localStorage.getItem('token') !== null){
      fetch('http://localhost:3000/products', {
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) =>  res.json())
      .then((products) => this.setState({
        products: products
      }))
    }
  }

  componentDidMount(){
    io.emit('products.index', products => {
      // console.log(products)
      this.setState({ products })
    })
  
    io.on('products.update', products => {
      this.setState({ products })
    })

    this.checkAuth()
  }

  render(){
    let products = this.state.products 
    console.log(products)

    return (
      <Router history={history}>
        <div className="App">
          <NavBar/>
          <ImageContainer/>
          <Switch>
            <Route exact path="/" render={() => <MainContainer products={products}/>} />
            <Route path="/login" render={() => <Login checkAuth={this.checkAuth} users={this.state.users}/>}/>
            <Route path="/products/:id" component={ProductShowPage}/>
            <Route path="/cart" render={() => <CartContainer products={products}/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}
