const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  sockets: socket => {
    // console.log(socket)
    socket.on("users.index", respond => {
      User.findAll().then(users => {
        respond(users);
      });
    }),
      socket.on("users.update", async params => {
        let user = await User.findByPk(params.id);
        await user.update(params);
        let users = await User.findAll();
        io.emit("users.update", users);
      });
  },

  http: app => {
    app.get('/authorize', async (req, res, next) => {
      let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      let userToken = jwt.decode(token)
      let user = await User.findByPk(userToken.id, {
        attributes: {exclude: ['password_digest', 'token']}
      })
      res.json({
        user: user
      })
    })

    // index
    app.get("/users", (req, res) => {
      User.findAll().then(users => {
        res.json(users);
      });
    });

    //create jwt token with a post request
    app.post("/login", async (req, res) => {
      // console.log(req.body.username, req.body.password)

      User.findOne({ where: { username: req.body.username } })
        .then(user => {
          let hash = user.password_digest
          bcrypt.compare(req.body.password, hash, (err, result) => {
            if (result == true) {
              //jwt.sign({user: user}, 'pothers', (err, token) => {
              // console.log('correct')
              res.json(user)
              //})
            } else {
              console.log('wrong')
            }
          })
        })
      // let users = await User.findAll({
      //   where: {
      //     username: req.body.username
      //   }
      // });
      // //console.log(users)

      // let user = users[0];
      // /////authentication

      // console.log(req.body.password);
      // if (user.authenticate(req.body.password)) {
      //   console.log('correct')
      //   res.json(user);
      // }
    });

    //registration
    app.post("/registration", async (req, res) => {
      User.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password_digest: req.body.password
      }).then(user => {
        // user.password = req.body.password
        // user.save()
        res.json({ user: user, auth_token: user.token })
      })
    })

    // edit
    app.get("/users/:id", (req, res) => {
      User.findByPk(req.params.id).then(user => {
        res.json(user);
      });
    });

    //update
    app.patch("/users/:id", async (req, res) => {
      let user = await User.findByPk(req.params.id);
      user.update(req.body);
    });
  }
};
