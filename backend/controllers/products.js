const Product = require("../models/Product");
var express = require('express');
var router = express.Router();

module.exports = {
  sockets: socket => {
    socket.on("products.index", respond => {
      Product.findAll().then(products => {
        respond(products);
      });
    });

    // socket.on("echo", payload => {
    //   socket.emit("message", payload);
    // });
  },

  http: app => {
    // index
    app.get("/products", (req, res) => {
      Product.findAll().then(products => {
        res.json(products);
      });
    });

    // edit
    app.get("/products/:id", (req, res) => {
      Product.findByPk(req.params.id).then(product => {
        res.json(product);
      });
    });

    //update
    app.patch("/products/:id", async (req, res) => {
      let product = await Product.findByPk(req.params.id);
      product.update(req.body);
    });
  }
};
