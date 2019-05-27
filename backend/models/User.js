const Sequelize = require("sequelize");
const { STRING } = Sequelize;
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
    // console.log(rawPassword, this.password_digest)
    return bcrypt.compareSync(rawPassword, this.password_digest); //will return true or false
  }

  static authorize(req) {
    let token = req.headers['authorization']
    // console.log(token)
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
    return token
  }

  get token() {
    return jwt.sign({ id: this.id }, "pothers"); //user gets a token for the browser to remember their session.
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
      type: STRING,
    },
    last_name: {
      type: STRING
    },
    email: {
      type: STRING
      // allowNull: false,
      // validate: {
      // isEmail: true
      // },
      // unique: {
      //   args: true,
      //   msg: 'Email address already in use!'
      // }
    },
    username: {
      type: STRING
    },
    password_digest: {
      type: STRING
    }
  },
  { sequelize, modelName: "user" }
);

User.beforeCreate(async (user) => {
  console.log(user)
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(user.password_digest, salt); //saving password into a hash
  user.password_digest = hash;
});

User.belongsToMany(Product, { through: Cart })
Product.belongsToMany(User, { through: Cart })

// let user = User.create({ first_name: "Tom", last_name: "Hanks", email: 'tom@tom.com', username: 'tom', password_digest: 'tom' }).then(user => {
//   user.addProduct([1])
//   user.save()
// })

// User.findOne({ where: {first_name: 'Tom'} }).then(user => user.getProducts().then(products => console.log(products)))



module.exports = User;

sequelize.sync();
