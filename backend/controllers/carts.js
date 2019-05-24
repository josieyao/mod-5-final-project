const Cart = require("../models/Cart");

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
    // index
    app.get("/carts", (req, res) => {
      Cart.findAll().then(carts => {
        res.json(carts);
      });
    });

    // edit
    app.get("/carts/:id", (req, res) => {
      Cart.findByPk(req.params.id).then(cart => {
        res.json(cart);
      });
    });

    //update
    app.patch("/carts/:id", async (req, res) => {
      let cart = await Cart.findByPk(req.params.id);
      cart.update(req.body);
    });
  }
};