-- Usuário 1 - Joel
INSERT INTO users (
    phone, cep, name, administrator
) VALUES (
    '5511946181209@c.us',
    '03265030',
    'Joel',
    true
);

-- Produto 1 - Purple Haze Outdoor

INSERT INTO products (
    header,
    title,
    status,
    requiredAmount,
    currentAmount
) VALUES (
    'Purple Haze Outdoor',
    'Mensalidades e anualidade temporariamente com desconto',
    0,
    10,
    0
);

-- Produto 1 - Preços

INSERT INTO productsPrices(
    productId,
    price,
    minimum
) VALUES(
    1,
    50,
    2
);


-- Produto 1 - Participante

INSERT INTO productsParticipants(
    productId,
    userId,
    statusOrder,
    amount,
    totalPrice
) VALUES (
    1,
    1,
    0,
    2,
    100
);