CREATE TABLE users(
    `userId` INT NOT NULL,
    `phone` VARCHAR(18) NOT NULL,
    `cep` VARCHAR(10),
    `name` VARCHAR(100),
    `administrator` BOOLEAN DEFAULT false,
    PRIMARY KEY (`userId`)
);