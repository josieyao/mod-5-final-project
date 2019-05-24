const Sequelize = require("sequelize");
const { STRING, DATE } = Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("./Product");
const Cart = require("./Cart");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});

class User extends Sequelize.Model {
  authenticate(rawPassword) {
    return bcrypt.compareSync(rawPassword, this.password_digest); //will return true or false
  }

  set password(value) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(value, salt); //saving password into a hash
    this.password_digest = hash;
  }

  get token() {
    return jwt.sign({ id: this.id }, "dskjfhsjfh35435"); //user gets a token for the browser to remember their session.
  }

  toJSON() {
    let jsonObject = { ...this.dataValues, token: this.token }; //gets the json object with the token and user data. this is what is passed between the server and browser to authenticate instead of using the password for security reasons
    delete jsonObject.password_digest; //deletes the password from the body of the request
    return jsonObject;
  }
}

User.init(
  {
    first_name: {
      type: STRING
    },
    last_name: {
      type: STRING
    },
    email: {
      type: STRING
    },
    username: {
      type: STRING
    },
    password_digest: {
      type: STRING
    },
    birthday: {
      type: DATE
    }
  },
  { sequelize, modelName: "user" }
);

// Product.belongsTo(Cart)
// Cart.belongsTo(User)
User.belongsToMany(Product, {through: Cart})
Product.belongsToMany(User, {through: Cart})


module.exports = User;

sequelize.sync();
