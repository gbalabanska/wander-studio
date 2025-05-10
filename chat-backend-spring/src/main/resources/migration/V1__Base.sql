-- foreign keys in mind - drop user_friend first because it depends on user
DROP TABLE IF EXISTS user_friend;
DROP TABLE IF EXISTS user;

CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(1) NOT NULL DEFAULT 'M',
    `password` VARCHAR(255) NOT NULL,
    `roles` VARCHAR(255) NOT NULL
);

CREATE TABLE `user_friend` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_Id` INT NOT NULL,
    `friend_Id` INT NOT NULL,
    FOREIGN KEY (`user_Id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`friend_Id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    CONSTRAINT `unique_user_friend` UNIQUE (`user_Id`, `friend_Id`)
);

CREATE TABLE `trip` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `date_from` DATE NOT NULL,
    `date_to` DATE NOT NULL,
    `trip_emoji` VARCHAR(50),
    `description` TEXT
);

CREATE TABLE `trip_member` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `trip_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `role` VARCHAR(20) NOT NULL, -- e.g., 'OWNER' or 'MEMBER'
    FOREIGN KEY (`trip_id`) REFERENCES `trip`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    CONSTRAINT `unique_trip_user` UNIQUE (`trip_id`, `user_id`)
);

CREATE TABLE `trip_place` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `trip_id` INT NOT NULL,
    `address` VARCHAR(500) NOT NULL,
    `latitude` DOUBLE,
    `longitude` DOUBLE,
    `place_order` INT NOT NULL,
    FOREIGN KEY (`trip_id`) REFERENCES `trip`(`id`) ON DELETE CASCADE
);

-- Step 3: Reset auto-increment values for primary keys
ALTER TABLE user AUTO_INCREMENT = 1;
ALTER TABLE user_friend AUTO_INCREMENT = 1;

ALTER TABLE trip AUTO_INCREMENT = 1;
ALTER TABLE trip_member AUTO_INCREMENT = 1;
ALTER TABLE trip_place AUTO_INCREMENT = 1;

-- decrypted password: 1
INSERT INTO `user` (`username`, `email`, `gender`, `password`, `roles`) VALUES
('Gabby Balabanska', 'gabby@example.com', 'F', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('alice99', 'alice.johnson@example.com', 'F', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('bob77', 'robert.miller@example.com', 'M', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('chaz88', 'charles.anderson@example.com', 'M', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_ADMIN'),
('didi21', 'diana.evans@example.com', 'F', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER');

