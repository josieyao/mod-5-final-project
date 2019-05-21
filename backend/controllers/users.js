const User = require("../models/User");

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
    // index
    app.get("/users", (req, res) => {
      User.findAll().then(users => {
        res.json(users);
      });
    });

    //create jwt token with a post
    app.post("/login", async (req, res) => {
      // console.log(req.body.username, req.body.password)
      let users = await User.findAll({
        where: {
          username: req.body.username
        }
      });

      let user = users[0];
      console.log(req.body.password);
      if (user.authenticate(req.body.password)) {
        res.json(user);
      }
    });

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
