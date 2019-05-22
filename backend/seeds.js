const Product = require("./models/Product");
const User = require("./models/User");
const Sequelize = require("sequelize");

// Product.sync()
// User.sync()

// Product.destroy({ where: { id: [1] }})

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});

const products = [
  {
    name: "Stainless Steel Straws, Set of 5",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/straws_skinny_1512x.jpg?v=1556684135",
    image2: null,
    image3: null,
    description:
      "These reusable, stainless steel straws come in two options—a slender 'skinny straw' for iced tea, lemonade and juice and the 'smoothie straw' for thicker beverages like smoothies and shakes. The straws come in a set of 5 with a reusable straw cleaner. BPA-free. Dishwasher safe.",
    price: 23.99,
    quantity: 1,
    category: "Kitchen"
  },
  {
    name: "Beeswax Cloths, Set of 3",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/Bees_Wrap_3_900x.jpg?v=1516410409",
    image2:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/Bees_Wrap_6_09bec790-a7ff-4ea0-b47c-f14a020530ea_900x.jpg?v=1516410409",
    image3:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/Bees_Wrap_4_900x.jpg?v=1516410409",
    description:
      "Beeswax cloths are our favorite way to preserve cheese, fruit and casseroles. A natural and sustainable alternative to plastic wrap, beeswax cloths are organic cotton with beeswax, jojoba oil and tree resin. Use the warmth from your hands to wrap and mold the cloth—when it cools, it hardens and seals to keep food fresh. Best of all, it's reusable. ",
    price: 20.99,
    quantity: 1,
    category: "Kitchen"
  },
  {
    name: "Cotton Muslin Produce Bags, Set of 5",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/New_Muslin_Bag_1_75625563-6078-4fae-bfa7-d9f1735680ce_900x.jpg?v=1539802478",
    image2:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/muslin_new_900x.jpg?v=1539802478",
    image3: null,
    description:
      "These muslin produce bags are made from 100% cotton and are a sustainable and reusable alternative to plastic bags. The fabric is breathable and can be dampened to keep refrigerated greens crisp. They are also great for holding fine grain bulk items like flour, polenta and quinoa. Set of 5 (12in x 15in). Made of GOTS certified organic cotton. Machine wash, cold. Air dry.",
    price: 23.99,
    quantity: 1,
    category: "Kitchen"
  },
  {
    name: "Chemex Reusable Coffee Filters, 3 cup",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/coffee_sock_3A_e4df4fb7-75b7-48f4-9203-b885ff54691d_900x.jpg?v=1556642803",
    image2:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/coffee_sock_3B_900x.jpg?v=1556642803",
    image3: null,
    description:
      "The Chemex Coffee Filter is made from organic cotton and is a sustainable alternative to disposable filters. Besides being good for the earth, the Chemex filter also brews a rich and robust cup of coffee, absorbing some of the coffee bean oils while allowing the acids to pass through. The filter is easy to clean—simply dump out the grounds into your compost, wash the filter under hot water and air dry. The filter is very durable and is designed to last about a year before it needs to be replaced.",
    price: 15.99,
    quantity: 1,
    category: "Kitchen"
  },
  {
    name: "Bamboo Travel Utensils",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/togo_black_f23c06ac-6ee9-4dea-8ab0-ce1b2632fd61_900x.jpg?v=1557248571",
    image2: null,
    image3: null,
    description:
      "Bamboo travel utensils are a must have for waste-free dining on the go. The utensils are 100% bamboo and include a knife, fork, spoon and chopsticks. The case is made from recycled plastic bottles and features a handy carabiner on the back so you can clip onto your bag and go.",
    price: 14.99,
    quantity: 1,
    category: "Kitchen"
  },
  {
    name: "Beeswax Sandwich Wrap",
    image1:
      "https://cdn.shopify.com/s/files/1/1797/9639/products/Bee_s_Wrap_Sandwich_Wrap_4_1512x.jpg?v=1552424569",
    image2:
      "https://cdn.shopify.com/s/files/1/1797/9639/products/Bee_s_Wrap_Sandwich_Wrap_2_1512x.jpg?v=1552424569",
    image3:
      "https://cdn.shopify.com/s/files/1/1797/9639/products/Bee_s_Wrap_Sandwich_Wrap_1_1512x.jpg?v=1552424569",
    description:
      "Take your sandwich on the go using natural beeswax! This product replaces plastic sandwich bags that are not recyclable. Use as a wrap or a place mat for a portable lunch. This wrap can also be used to cover containers. This product comes with one wrap that has a string and wooden button to close and secure your food. Sandwich wrap is 13in x 13in. To clean, wash with cool water and gentle soap. Hang or lay flat to dry. Do not microwaves or use with hot temperatures. The wrap can last one year or longer.",
    price: 11.0,
    quantity: 1,
    category: "Kitchen"
  },
  {
    name: "Cloth Bowl Covers, Set of 5",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/Cloth_Bowl_Covers_Blue_1a471216-9842-4d8a-96a3-094b5e36bd4d_900x.jpg?v=1556423492",
    image2:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/Cloth_Bowl_Covers_2_900x.jpg?v=1556423492",
    image3: null,
    description:
      "These cloth dish covers are perfecting for wrapping a bowl when you're on you're way to a dinner party or covering a meal in the fridge. The covers are two layers thick to keep items fresh. Each set of covers comes in five different sizes—the largest covers a pie plate or casserole and the smallest will fit around a mason jar. Comes with a cloth envelope for storage. Made in California",
    price: 67.99,
    quantity: 1,
    category: "Kitchen"
  },
  {
    name: "Bento Bag",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/bento_group_05290bbc-38de-4ed8-a900-07f604ab1fce_900x.jpg?v=1556648052",
    image2:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/bento_linen_b84b1e80-7989-4ee5-9f8c-0ff8381860d0_900x.jpg?v=1556648052",
    image3:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/bento_linen_2_900x.jpg?v=1556648052",
    description:
      "The possibilities are endless with this beautiful bento bag. The bag is like a cloth basket with two pointed ends that tie together. Fill with your daily lunch, farmer's market fruits and vegetables or use as an overnight bag. Bag measures 10.5in W x 5in L x 10in H. Wash cold water, air dry. Made in California.",
    price: 29.99,
    quantity: 1,
    category: "Kitchen"
  },
  {
    name: "Reusable Glass Coffee Cup",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/keep_cup_black_900x.jpg?v=1556647006",
    image2:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/keep_cup_black_top_900x.jpg?v=1556647006",
    image3: null,
    description:
      "The reusable glass KeepCup is a stylish and sustainable way to grab coffee or tea on-the-go. Each cup features a natural cork band made from the upcycled waste of a wine cork manufacturer. The cup is made from a durable, tempered soda-lime glass and the black lid is BPA-free. 16oz available. BPA-free. Hand-wash.",
    price: 29.99,
    quantity: 1,
    category: "Kitchen"
  },
  {
    name: "Stainless Steel Lunchbox",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/tiffin_1_900x.jpg?v=1556686078",
    image2:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/tiffin_2_40123e53-92fb-454c-b0bd-135001d0d516_900x.jpg?v=1556686078",
    image3:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/tiffin_3_900x.jpg?v=1556686078",
    description:
      "The stainless steel lunchbox is a perfect carrier for lunch or picnics on-the-go. Featuring three stackable tiers, the stainless steel lunchbox has the flexibility to pack one meal or a multi-course feast. Capacity: 4.5 cups total (1.5 cup per tier). 4in H x 5.25in D. Stainless steel. Dishwasher safe.",
    price: 33.99,
    quantity: 1,
    category: "Kitchen"
  },
  {
    name: "Milk & Honey Baby Soap Bar",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/baby_soap_1_900x.jpg?v=1548701249",
    image2:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/baby_soap_2_900x.jpg?v=1548708678",
    image3: null,
    description:
      "This unscented baby soap bar is a creamy blend of goat milk, organic honey and organic oat flour and is perfect for babies or people with dry or sensitive skin. The goat milk and honey leaves skin soft and supple and helps soothe irritations like eczema and psoriasis. The oat flour has anti-inflammatory properties and helps relieve itchy skin. Each bar is cruelty-free, non-GMO and rainforest alliance certified. Handmade in Northern Ohio.",
    price: 12.99,
    quantity: 1,
    category: "Bathroom"
  },
  {
    name: "Travel Soap Case",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/soap_case_1B_b9732a87-f041-45a4-b2ba-d5ad7d4e43b1_900x.jpg?v=1550600098",
    image2:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/soap_case_2B_003dcbb1-a29f-499a-b0ce-919e7d526030_900x.jpg?v=1550600098",
    image3: null,
    description:
      "This metal soap box is perfect for carrying soap or shampoo bars on-the-go. The box is ideal for smaller, travel-sized soap and features a latched lid that fits snugly on top of the soap compartment. The box is made from aluminum and reads Savon Du Midi, Savon Traditionnel in French on the lid. Dimensions: 3.5in W x 2.5in L x 1in H.",
    price: 14.99,
    quantity: 1,
    category: "Bathroom"
  },
  {
    name: "Compostable Bamboo Toothbrushes, Set of 4",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/brush_naked_new_900x.jpg?v=1522863723",
    image2: null,
    image3: null,
    description:
      "These beautiful bamboo toothbrushes come with two options for bristles. For a 100% compostable toothbrush, try our option with plant-based bristles (made from corn and tapioca) that last about a month. For a longer lasting toothbrush, we have an option with nylon bristles. While the bamboo handle is compostable, the bristles are not and must be removed when you're ready for a new brush. Comes in a set of 4 with each brush wrapped in a compostable cello wrap made from wood and cotton pulp.",
    price: 23.99,
    quantity: 1,
    category: "Bathroom"
  },
  {
    name: "Double-Edge Safety Razor",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/razor_1_900x.jpg?v=1550345085",
    image2: "https://cdn.shopify.com/s/files/1/1721/9289/products/razor_2_900x.jpg?v=1550345085",
    image3: "https://cdn.shopify.com/s/files/1/1721/9289/products/razor_3_900x.jpg?v=1550345163",
    description:
      "Rockwell Razors double-edge safety razor is a sustainable and beautiful alternative to disposable cartridge razors. The razor features an adjustable design to accommodate your skin type and stubble length so your get a close, comfortable shave. This is a great beginner safety razor and comes with 5 Swedish stainless steel razor blades.",
    price: 34.99,
    quantity: 1,
    category: "Bathroom"
  },
  {
    name: "Refillable Dental Floss",
    image1:
      "https://cdn.shopify.com/s/files/1/1797/9639/products/dental_blue_1512x.jpg?v=1524757936",
    image2: "https://cdn.shopify.com/s/files/1/1797/9639/products/floss_1512x.jpg?v=1524757936",
    image3: "https://cdn.shopify.com/s/files/1/1797/9639/products/floss_refill_boxes_1512x.jpg?v=1524757936",
    description:
      "Who thought flossing could be so zero waste? Made from mulberry silk floss and coated in (vegan) candelilla wax, this floss is sure to make you (and the planet) smile! Glass Dental Lace container with one 33 yard spool of biodegradable mulberry silk floss coated in candlilla wax inside the container and one refill spool. The box is 100% post-consumer fiber that is certified FSC and PCF free and is manufactured using renewable biogas energy and printed with soy-based inks. Refill spool comes in Polylactide Acid bag created from the lactic acid in plants and is certified compostable.",
    price: 11.99,
    quantity: 1,
    category: "Bathroom"
  },
  {
    name: "Tea Tree Charcoal Facial Bar Soap",
    image1:
      "https://cdn.shopify.com/s/files/1/1797/9639/products/bar_soap_tea_tree_1512x.jpg?v=1524758385",
    image2: "https://cdn.shopify.com/s/files/1/1797/9639/products/bar_soap_tea_tree_stack_1512x.jpg?v=1524758385",
    image3: "https://cdn.shopify.com/s/files/1/1797/9639/products/bar_soap_tea_tree_2_1512x.jpg?v=1524758385",
    description:
      "A balanced and gentle facial soap, this bar detoxifies skin with absorbent activated charcoal. Cocoa butter promotes a youthful complexion, while ground oats soothe and mildly exfoliate. Fresh and herbaceous tea tree and eucalyptus oils act as a natural astringent to combat skin blemishes. Also great for the whole body!",
    price: 12.00,
    quantity: 1,
    category: "Bathroom"
  },
  {
    name: "Tongue Scraper",
    image1:
      "https://cdn.shopify.com/s/files/1/1797/9639/products/Clean_Planetware_Tongue_Scraper_1_1512x.jpg?v=1529519641",
    image2: "https://cdn.shopify.com/s/files/1/1797/9639/products/tongue_scraper_1_1512x.jpg?v=1529519641",
    image3: "https://cdn.shopify.com/s/files/1/1797/9639/products/Clean_Planetware_Tongue_Scraper_2_1512x.jpg?v=1529519641",
    description:
      "Use this stainless steel tongue scraper to help to freshen your breathe and fight bacteria. Plus, it also to enhance your sense of taste.",
    price: 12.00,
    quantity: 1,
    category: "Bathroom"
  },
  {
    name: "Menstrual Cup",
    image1:
      "https://cdn.shopify.com/s/files/1/1797/9639/products/purple_menstrual_cup_1_1512x.jpg?v=1533074194",
    image2: "https://cdn.shopify.com/s/files/1/1797/9639/products/menstrual_cup_comparison_1512x.jpg?v=1533074194",
    image3: "https://cdn.shopify.com/s/files/1/1797/9639/products/Clean_Planetware_Tongue_Scraper_2_1512x.jpg?v=1529519641",
    description:
      "Bell-shaped, reusable menstrual cup that gives you a comfortable, safe, odorless and eco-friendly period for up to 12 hours a day. Never buy a disposable pad or tampon again (take that pink tax!). Thanks to companies like Lunette, menstrual cups are a great option for any menstruating human looking to have a more sustainable, economical and healthier period. The cup saves the planet from millions of disposable period products ending up in the landfills.",
    price: 39.99,
    quantity: 1,
    category: "Bathroom"
  },
  {
    name: "Glass Soap Dispensers, Set of 2",
    image1:
      "https://cdn.shopify.com/s/files/1/1721/9289/products/soap_bottles_1_900x.jpg?v=1550612546",
    image2: "https://cdn.shopify.com/s/files/1/1721/9289/products/soap_bottles_2_900x.jpg?v=1550612546",
    image3: null,
    description:
      "These glass soap dispensers are the perfect addition to the minimal and sustainable home. Eliminate wasteful plastic packaging, and unknown chemicals found in commercial soap brands, by refilling these beauties with your favorite homemade soaps or lotions. Or, take them to your local bulk store or co-op and to fill them with dish soap, shampoo, conditioner, lotion and more! 16 oz. capacity (per bottle). Dishwasher safe (glass bottle only). BPA free.",
    price: 24.99,
    quantity: 1,
    category: "Bathroom"
  },
  {
    name: "Natural Conditioner (Rosemary Mint Vanilla)",
    image1:
      "https://cdn.shopify.com/s/files/1/1797/9639/products/Plaine_Products_Conditioner_1_1512x.jpg?v=1543272543",
    image2: "https://cdn.shopify.com/s/files/1/1797/9639/products/Plaine_Products_Conditioner_2_1512x.jpg?v=1543272543",
    image3: null,
    description:
      "The conditioner’s vegan ingredients restore essential nutrients to enhance your hair’s texture resulting in luminous, silky, smooth hair. Works for all hair types: rinse quickly for a light conditioning or leave in longer for ultra-hydration. A choice that’s good for you and the planet. Hypoallergenic. Baby safe. Color Safe. Biodegradable. Cruelty Free, no animal testing. Perfect for all hair types, especially for those with sensitive skin or scalp. No harmful chemicals (no PEG, PG, parabens, sulfates, dyes, synthetic fragrances or petrochemicals). You may opt for to buy this conditioner either with or without a BPA-free plastic pump.",
    price: 30.00,
    quantity: 1,
    category: "Bathroom"
  }

];

const users = [
  {
    first_name: "test first name",
    last_name: "test last name",
    email: "test email",
    username: "username",
    password: "password",
    birthday: 2000 / 01 / 01
  }
];

sequelize.drop().then(() => {
  sequelize.sync().then(() => {
    products.forEach(product => Product.create(product));
    users.forEach(userAttributes => {
      let user = User.build(userAttributes);
      user.password = userAttributes.password;
      user.save();
    });
  });
});
