const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");

module.exports = {
  sockets: socket => {
    socket.on("carts.index", respond => {
      Cart.findAll().then(carts => {
        respond(carts);
      });
    });

    // socket.on("echo", payload => {
    //   socket.emit("message", payload);
    // });
  },

  http: app => {
    //console.log('we are in here')
    // index
    app.get("/carts", async (req, res) => {
      let user = await User.findByPk(req.query.user)
      let cart = await user.getProducts()
      res.send(cart)
    });

    // edit
    app.get("/carts/:id", (req, res) => {
      res.send("jk love u")
    });

    app.patch("/users/:id/carts", async (req, res) => {
      // console.log(req.body)
      // let carts = Cart.findAll({ where: { userId: req.body.userId }})
      //console.log(req.params)
      let cart = await Cart.findOne({
        where: {
          userId: req.params.id,
          productId: req.query.product
        },
      });
      switch (req.body.action) {
        case "increment":
          await cart.update({ quantity: cart.quantity + 1 });
          break;
        case "decrement":
          if (cart.quantity > 1) {
            await cart.update({ quantity: cart.quantity - 1 });
          }
          break;
      }
      res.send(cart)
    })
    //1. app.patch(same address)  
    // let cart = find the cart by product id
    //update  Q

    //update
    app.patch("/carts/:id", async (req, res) => {
      // let cart = await Cart.findByPk(req.params.id);
      // cart.update(req.body);
      let cart = await Cart.findOne({ where: { userId: req.body.userId, productId: req.body.productId } })
      cart.update({ quantity: cart.quantity + 1 });
    });

    app.post("/carts", async (req, res) => {
      let token = User.authorize(req)
      // console.log(req.body.userId)
      try {
        token = jwt.verify(token, 'pothers')
        //console.log(req.body.cart)
        //let response = JSON.parse(req.body.cart)
        // console.log(res)
        Promise.all(req.body.cart.map(async cartItem => {
          // console.log(cartItem.id)
          let product = await Product.findByPk(cartItem.id)
          let cart = await Cart.findOne({ where: { userId: req.body.userId, productId: product.id } })
          console.log(cart)
          if (cart) {
            let newQuantity = cart.quantity += 1
            cart.update({
              quantity: newQuantity
            })
          } else {
            product.addUser([token.id])
            // await product.addUser([token.id])
          }
        }))
        let user = await User.findByPk(token.id)
        let products = await user.getProducts()
        console.log(user)
        res.json(products)
      } catch (error) {
        res.send(error)
      }
    })
  }
}

