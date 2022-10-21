-- {
--     id: 'mf-1',
--     header: "Mensalidades e anualidade temporariamente com desconto",
--     title: "Purple Haze Outdoor",
--     status: 1,
--     goal: {
--         required: 0.5,
--         current: 0.07,
--     },
--     priceObj: [
--         {
--           minimum: 0.02,
--           price: 50.00
--         },
--         {
--           minimum: 0.05,
--           price: 45.00
--         },
--         {
--           minimum: 0.1,
--           price: 40.00
--         },
--       ],
--     participants: [
--       {
--         userId: '',
--         name: 'Joel',
--         statusOrder: 0,
--         amount: 0.02,
--         totalPrice: 100.00
--       },
--       {
--         userId: '',
--         name: 'Thiago',
--         statusOrder: 0,
--         amount: 0.05,
--         totalPrice: 225.00
--       }
--     ]
--   }

CREATE TABLE products(
    productId INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    header VARCHAR(200) NOT NULL,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    status INT NOT NULL DEFAULT 0,
    requiredAmount FLOAT NOT NULL,
    currentAmount FLOAT NOT NULL DEFAULT 0,
    PRIMARY KEY (`productId`)
);

CREATE TABLE productsPrices(
    id INT NOT NULL AUTO_INCREMENT,
    productId INT NOT NULL,
    price FLOAT NOT NULL,
    minimum FLOAT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE productsParticipants(
    id INT NOT NULL AUTO_INCREMENT,
    productId INT NOT NULL,
    userId INT NOT NULL,
    statusOrder INT DEFAULT 0,
    amount FLOAT NOT NULL,
    totalPrice FLOAT NOT NULL,
    PRIMARY KEY (`id`)
);