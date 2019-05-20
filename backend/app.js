// const pry = require('pryjs')
// const User = require("./models/User");
const productsController = require("./controllers/products");
const usersController = require("./controllers/users");
const io = require("socket.io")();

io.on("connection", socket => {
  // console.log(socket)
  // socket.on('random-string', payload => {
  //     console.log(payload)
  // })
  productsController.sockets(socket);
  usersController.sockets(socket);
});

io.listen(8080);

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
productsController.http(app);
usersController.http(app);

app.listen(3000);

// UPDATE DONE WITHOUT ASYNC/AWAIT
// app.patch('/products/:id', (req, res) => {
//     Product.findByPk(req.params.id)
//         .then(product => {
//             product.update(req.body)
//         })
// })

// eval(pry.it)
