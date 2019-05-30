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
    // app.get("/carts/:id", (req, res) => {
    //   res.send("jk love u")
    // });

    //update 
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

    //update
    app.patch("/carts/:id", async (req, res) => {
      // let cart = await Cart.findByPk(req.params.id);
      // cart.update(req.body);
      let cart = await Cart.findOne({ where: { userId: req.body.userId, productId: req.body.productId } })
      cart.update({ quantity: cart.quantity + 1 });
    });

    //create
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
          // console.log(cart)
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
        // console.log(user)
        res.json(products)
      } catch (error) {
        res.send(error)
      }
    })

    //delete
    app.delete("/users/:id/carts", async (req, res) => {
      // console.log(req.body)
      // let carts = Cart.findAll({ where: { userId: req.body.userId }})
      //console.log(req.params)
      Cart.destroy({
        where: {
          userId: req.params.id,
          productId: req.query.product
        }
      })
      res.status(200).json({ status: "success" })
    });

    //stripe payment
    app.post("/users/:id/checkout", async (req, res) => {
      // console.log(req.params.id)
      let user = await User.findByPk(req.params.id)
      let userProducts = await user.getProducts()
      let productSumArray = await userProducts.map(product => product.price * product.cart.quantity)

      let sum = await productSumArray.reduce((total, productSum) => total + productSum, 0)
      let stripeSum = parseInt(((sum + '').replace('.', '')))
      // console.log(stripeSum)
      // console.log(sum);

      // Set your secret key: remember to change this to your live secret key in production
      // See your keys here: https://dashboard.stripe.com/account/apikeys
      const stripe = require('stripe')('sk_test_VJfyNP5AawyXI08TFm0MKE5U00nxmYiSEg');

      // console.log("wat"

      try {
        let intent;
        if (req.body.payment_method_id) {
          // Create the PaymentIntent
          intent = await stripe.paymentIntents.create({
            payment_method: req.body.payment_method_id,
            amount: stripeSum,
            currency: 'usd',
            confirmation_method: 'manual',
            confirm: true
          });
        } else if (req.body.payment_intent_id) {
          intent = await stripe.paymentIntents.confirm(
            req.body.payment_intent_id
          );
        }
        // Send the response to the client
        res.send(generate_payment_response(intent));
      } catch (e) {
        // Display error on client
        return res.send({ error: e.message });
      }
      // });

      const generate_payment_response = (intent) => {
        if (
          intent.status === 'requires_action' &&
          intent.next_action.type === 'use_stripe_sdk'
        ) {
          // Tell the client to handle the action
          return {
            requires_action: true,
            payment_intent_client_secret: intent.client_secret
          };
        } else if (intent.status === 'succeeded') {
          // The payment didn’t need any additional actions and completed!
          // Handle post-payment fulfillment
          return {
            success: true
          };
        } else {
          // Invalid status
          return {
            error: 'Invalid PaymentIntent status'
          }
        }
      }

      // console.log(session)
      res.json({ client_secret: session.client_secret })
    })

    // ------------------------------------which one do I use? lollllll
    app.post('/users/:id/checkout', async (request, response) => {
      try {
        let intent;
        if (request.body.payment_method_id) {
          // Create the PaymentIntent
          intent = await stripe.paymentIntents.create({
            payment_method: request.body.payment_method_id,
            amount: 1099,
            currency: 'usd',
            confirmation_method: 'manual',
            confirm: true
          });
        } else if (request.body.payment_intent_id) {
          intent = await stripe.paymentIntents.confirm(
            request.body.payment_intent_id
          );
        }
        // Send the response to the client
        response.send(generate_payment_response(intent));
      } catch (e) {
        // Display error on client
        return response.send({ error: e.message });
      }
    });

    const generate_payment_response = (intent) => {
      if (
        intent.status === 'requires_action' &&
        intent.next_action.type === 'use_stripe_sdk'
      ) {
        // Tell the client to handle the action
        return {
          requires_action: true,
          payment_intent_client_secret: intent.client_secret
        };
      } else if (intent.status === 'succeeded') {
        // The payment didn’t need any additional actions and completed!
        // Handle post-payment fulfillment
        return {
          success: true
        };
      } else {
        // Invalid status
        return {
          error: 'Invalid PaymentIntent status'
        }
      }
    };

  }
}



