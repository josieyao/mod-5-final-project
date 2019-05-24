const Sequelize = require('sequelize');
// const { INTEGER } = Sequelize

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const Cart = sequelize.define('cart', {
    // user_id: {
    //     type: INTEGER
    // },
    // product_id: {
    //     type: INTEGER
    // }
});


module.exports = Cart

sequelize.sync()