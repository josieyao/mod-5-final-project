const Product = require('./models/Product')
const User = require('./models/User')

Product.sync()
User.sync()

// Product.destroyAll
// Product.destroy({ where: { id: [1] }})

const products = [
    {
        "name": "Stainless Steel Straws, Set of 5",
        "image1": "https://cdn.shopify.com/s/files/1/1721/9289/products/straws_skinny_1512x.jpg?v=1556684135",
        "image2": null,
        "image3": null,
        "description": "These reusable, stainless steel straws come in two options—a slender 'skinny straw' for iced tea, lemonade and juice and the 'smoothie straw' for thicker beverages like smoothies and shakes. The straws come in a set of 5 with a reusable straw cleaner. BPA-free. Dishwasher safe.",
        "price": 23.99,
        "quantity": 1,
        "category": "Kitchen"
    },
    {
        "name": "Beeswax Cloths, Set of 3",
        "image1": "https://cdn.shopify.com/s/files/1/1721/9289/products/Bees_Wrap_3_900x.jpg?v=1516410409",
        "image2": "https://cdn.shopify.com/s/files/1/1721/9289/products/Bees_Wrap_6_09bec790-a7ff-4ea0-b47c-f14a020530ea_900x.jpg?v=1516410409",
        "image3": "https://cdn.shopify.com/s/files/1/1721/9289/products/Bees_Wrap_4_900x.jpg?v=1516410409",
        "description": "Beeswax cloths are our favorite way to preserve cheese, fruit and casseroles. A natural and sustainable alternative to plastic wrap, beeswax cloths are organic cotton with beeswax, jojoba oil and tree resin. Use the warmth from your hands to wrap and mold the cloth—when it cools, it hardens and seals to keep food fresh. Best of all, it's reusable. ",
        "price": 20.99,
        "quantity": 1,
        "category": "Kitchen"
    },
    {
        "name": "Cotton Muslin Produce Bags, Set of 5",
        "image1": "https://cdn.shopify.com/s/files/1/1721/9289/products/New_Muslin_Bag_1_75625563-6078-4fae-bfa7-d9f1735680ce_900x.jpg?v=1539802478",
        "image2": "https://cdn.shopify.com/s/files/1/1721/9289/products/muslin_new_900x.jpg?v=1539802478",
        "image3": null,
        "description": "These muslin produce bags are made from 100% cotton and are a sustainable and reusable alternative to plastic bags. The fabric is breathable and can be dampened to keep refrigerated greens crisp. They are also great for holding fine grain bulk items like flour, polenta and quinoa. Set of 5 (12in x 15in). Made of GOTS certified organic cotton. Machine wash, cold. Air dry.",
        "price": 23.99,
        "quantity": 1,
        "category": "Kitchen"
    },
    {
        "name": "Chemex Reusable Coffee Filters, 3 cup",
        "image1": "https://cdn.shopify.com/s/files/1/1721/9289/products/coffee_sock_3A_e4df4fb7-75b7-48f4-9203-b885ff54691d_900x.jpg?v=1556642803",
        "image2": "https://cdn.shopify.com/s/files/1/1721/9289/products/coffee_sock_3B_900x.jpg?v=1556642803",
        "image3": null,
        "description": "The Chemex Coffee Filter is made from organic cotton and is a sustainable alternative to disposable filters. Besides being good for the earth, the Chemex filter also brews a rich and robust cup of coffee, absorbing some of the coffee bean oils while allowing the acids to pass through. The filter is easy to clean—simply dump out the grounds into your compost, wash the filter under hot water and air dry. The filter is very durable and is designed to last about a year before it needs to be replaced.",
        "price": 15.99,
        "quantity": 1,
        "category": "Kitchen"
    },
    {
        "name": "Bamboo Travel Utensils",
        "image1": "https://cdn.shopify.com/s/files/1/1721/9289/products/togo_black_f23c06ac-6ee9-4dea-8ab0-ce1b2632fd61_900x.jpg?v=1557248571",
        "image2": null,
        "image3": null,
        "description": "Bamboo travel utensils are a must have for waste-free dining on the go. The utensils are 100% bamboo and include a knife, fork, spoon and chopsticks. The case is made from recycled plastic bottles and features a handy carabiner on the back so you can clip onto your bag and go.",
        "price": 14.99,
        "quantity": 1,
        "category": "Kitchen"
    },

]

const users = [
    {
        "first_name": "test first name",
        "last_name": "test last name",
        "email": "test email",
        "password": "test password",
        "birthday": 2000/01/01
    }

]

products.forEach( product => Product.create(product))
users.forEach( user => User.create(user))