const User = require("../models/User");

module.exports = {
  sockets: socket => {
    socket.on("users.index", respond => {
      User.findAll().then(users => {
        respond(users);
      });
    });

    
  },

  http: app => {
    // index
    app.get("/users", (req, res) => {
      User.findAll().then(users => {
        res.json(users);
      });
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