const Product = require("../models/Product");
const User = require("../models/User");
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
    console.log('we are in here')
    // index
    app.get("/carts", (req, res) => {
      // User.findOne({ where: { first_name: 'Tom' } }).then(user => user.getProducts().then(products => res.json(products)))
      res.send("hey bitch");
    });

    // edit
    app.get("/carts/:id", (req, res) => {
      res.send("jk love u")
    });

    //update
    app.patch("/carts/:id", async (req, res) => {
      // let cart = await Cart.findByPk(req.params.id);
      // cart.update(req.body);
      let cart = await Cart.findOne({ where: { userID: req.body.userId, productId: req.body.productId } })
      cart.update({ quantity: cart.quantity + 1 });
    });

    app.post("/carts", async (req, res) => {
      let token = User.authorize(req)
      try {
        token = jwt.verify(token, 'pothers')
        let response = JSON.parse(req.body.cart)
        // console.log(res)
        await Promise.all(response.map(async cartItem => {
          let product = await Product.findByPk(cartItem.id)
          await product.addUser([token.id])
        }))
        let user = await User.findByPk(token.id)
        let products = await user.getProducts()
        res.json(products)

      } catch (error) {
        res.send(error)
      }
    })
  }
}

