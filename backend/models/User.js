const Sequelize = require('sequelize');
const { STRING, DATE } = Sequelize

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const User = sequelize.define('user', {
    first_name: {
        type: STRING
    },
    last_name: {
        type: STRING
    },
    email: {
        type: STRING
    },
    password: {
        type: STRING
    },
    birthday: {
        type: DATE
    }
});

module.exports = User

sequelize.sync()

// First name, last name, email
// Shipping info: address, city, state, zip code
// Optional: phone number
// Payment info: 
// Billing info
// Option to check your shipping info as your billing info
// Credit card number, expiration date, 3 numbers on the back
