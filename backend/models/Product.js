const Sequelize = require('sequelize');
const { STRING, TEXT, DOUBLE, INTEGER } = Sequelize

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const Product = sequelize.define('product', {
    name: {
        type: STRING
    },
    image1: {
        type: STRING
    },
    image2: {
        type: STRING
    },
    image3: {
        type: STRING
    },
    description: {
        type: TEXT
    },
    price: {
        type: DOUBLE(4,2)
    },
    category: {
        type: STRING
    }

});


module.exports = Product 

sequelize.sync()


// TO TEST THE DATABASE:
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });