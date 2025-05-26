-- Drop dependent tables first
DROP TABLE IF EXISTS user_friend;
DROP TABLE IF EXISTS trip_member;
DROP TABLE IF EXISTS trip_place;
DROP TABLE IF EXISTS trip;
DROP TABLE IF EXISTS user;

-- User table
CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(1) NOT NULL DEFAULT 'M',
    `password` VARCHAR(255) NOT NULL,
    `roles` VARCHAR(255) NOT NULL
);

-- Friendships
CREATE TABLE `user_friend` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_Id` INT NOT NULL,
    `friend_Id` INT NOT NULL,
    FOREIGN KEY (`user_Id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`friend_Id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    CONSTRAINT `unique_user_friend` UNIQUE (`user_Id`, `friend_Id`)
);

-- Trips
CREATE TABLE `trip` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `date_from` DATE NOT NULL,
    `date_to` DATE NOT NULL,
    `trip_emoji` VARCHAR(50),
    `description` VARCHAR(1000)
);

CREATE TABLE `trip_member` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `trip_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `role` VARCHAR(20) NOT NULL,
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

-- Reset auto-increment
ALTER TABLE user AUTO_INCREMENT = 1;
ALTER TABLE user_friend AUTO_INCREMENT = 1;
ALTER TABLE trip AUTO_INCREMENT = 1;
ALTER TABLE trip_member AUTO_INCREMENT = 1;
ALTER TABLE trip_place AUTO_INCREMENT = 1;

-- Common password hash for all: '1'
INSERT INTO `user` (`username`, `email`, `gender`, `password`, `roles`) VALUES
('Gabby Balabanska', 'gabby@example.com', 'F', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('alice99', 'alice.johnson@example.com', 'F', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('bob77', 'robert.miller@example.com', 'M', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('chaz88', 'charles.anderson@example.com', 'M', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_ADMIN'),
('didi21', 'diana.evans@example.com', 'F', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('jonathandoe', 'jonathan.doe@example.com', 'M', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('melissajane', 'melissa.jane@example.com', 'F', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('travislance', 'travis.lance@example.com', 'M', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('charlotte13', 'charlotte.lee@example.com', 'F', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('natalierocks', 'natalie.smith@example.com', 'F', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('maxwellstone', 'max.stone@example.com', 'M', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER');

-- Friendships
INSERT INTO `user_friend` (`user_Id`, `friend_Id`) VALUES
(1, 2),
(1, 3),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(2, 3),
(2, 4),
(3, 5),
(4, 6),
(5, 7),
(6, 8),
(7, 9);

-- Sample trip 1
INSERT INTO `trip` (`name`, `date_from`, `date_to`, `trip_emoji`, `description`) VALUES
('Mediterranean Sea Cruise', '2025-07-10', '2025-07-24', 'party',
'Exploring the best of the Mediterranean coast with the crew! 🏖️🍷⛵
From sun-soaked beaches and ancient ruins 🏛️ to seaside dinners and unforgettable sunsets 🌅 —
this trip is all about good vibes, great friends, and epic memories! 📸🌊🍝✨

Day 1 – Arrival and beach chill in Sofia ☀️🏝️
Day 2 – City tour and local cuisine in Sofia 🏛️🍲
Day 3 – Travel to Poland 🇵🇱✈️
Day 4 – Explore historic landmarks and cafés in Warsaw ☕🧭
Day 5 – Travel to England, AR, USA 🇺🇸✈️
Day 6 – Nature hike and photography adventure 📷🌳
Day 7 – Local market visit and sunset dinner 🌇🛍️
Day 8 – Free day for spontaneous fun 🎉🛶
Day 9 – Group activities and wrap-up dinner 🍽️👯‍♂️
Day 10 – Departure and final group selfie 📸✈️❤️');

-- Trip members: Owner = user 1, others are friendIds [2, 3, 5, 6, 7]
INSERT INTO `trip_member` (`trip_id`, `user_id`, `role`) VALUES
(1, 1, 'OWNER'),
(1, 2, 'MEMBER'),
(1, 3, 'MEMBER'),
(1, 5, 'MEMBER'),
(1, 6, 'MEMBER'),
(1, 7, 'MEMBER');

-- Trip places
INSERT INTO `trip_place` (`trip_id`, `address`, `latitude`, `longitude`, `place_order`) VALUES
(1, 'Barcelona, Spain', 41.3850639, 2.1734035, 1),
(1, 'Nice, France', 43.7101728, 7.2619532, 2),
(1, 'Rome, Italy', 41.9027835, 12.4963655, 3),
(1, 'Split, Croatia', 43.5081334, 16.4401935, 4),
(1, 'Dubrovnik, Croatia', 42.6506606, 18.0944238, 5);

-- Trip 2
INSERT INTO `trip` (`id`, `name`, `date_from`, `date_to`, `trip_emoji`, `description`) VALUES
(2, 'Alpine Adventure', '2025-12-20', '2025-12-30', 'mountain',
'Skiing, snowboarding, and cozy evenings in accessible alpine resorts! ❄️🏔️⛷️
Perfect winter escape with friends, snowball fights, and warm fires! 🔥⛄');

INSERT INTO `trip_member` (`trip_id`, `user_id`, `role`) VALUES
(2, 1, 'OWNER'),
(2, 2, 'MEMBER'),
(2, 3, 'MEMBER'),
(2, 5, 'MEMBER');

INSERT INTO `trip_place` (`trip_id`, `address`, `latitude`, `longitude`, `place_order`) VALUES
(2, 'Chamonix, France', 45.9237, 6.8694, 1),
(2, 'Courmayeur, Italy', 45.7931, 6.9698, 2),
(2, 'St. Anton am Arlberg, Austria', 47.1287, 10.2625, 3);

-- Trip 3: Japan Spring Tour
INSERT INTO `trip` (`name`, `date_from`, `date_to`, `trip_emoji`, `description`) VALUES
('Japan Spring Tour', '2026-04-01', '2026-04-15', 'camera',
'Cherry blossoms, ancient temples, and neon cityscapes! 🌸🗼⛩️
Experience Japan from Kyoto’s calm to Tokyo’s buzz.');

INSERT INTO `trip_member` (`trip_id`, `user_id`, `role`) VALUES
(3, 1, 'OWNER'),
(3, 3, 'MEMBER'),
(3, 6, 'MEMBER'),
(3, 7, 'MEMBER');

INSERT INTO `trip_place` (`trip_id`, `address`, `latitude`, `longitude`, `place_order`) VALUES
(3, 'Tokyo, Japan', 35.6762, 139.6503, 1),
(3, 'Kyoto, Japan', 35.0116, 135.7681, 2),
(3, 'Osaka, Japan', 34.6937, 135.5023, 3),
(3, 'Nara, Japan', 34.6851, 135.8048, 4);

-- Trip 4: USA Roadtrip West Coast
INSERT INTO `trip` (`id`, `name`, `date_from`, `date_to`, `trip_emoji`, `description`) VALUES
(4, 'USA Roadtrip West Coast', '2026-06-10', '2026-06-25', 'car',
'Hit the road with the squad! 🌉🏞️🎢
From San Francisco to Sequoia, Vegas, and LA. Sun, sights, and memories!');

INSERT INTO `trip_member` (`trip_id`, `user_id`, `role`) VALUES
(4, 1, 'OWNER'),
(4, 2, 'MEMBER'),
(4, 5, 'MEMBER'),
(4, 6, 'MEMBER');

-- Updated route with Sequoia (always accessible)
INSERT INTO `trip_place` (`trip_id`, `address`, `latitude`, `longitude`, `place_order`) VALUES
(4, 'San Francisco, CA, USA', 37.7749, -122.4194, 1),
(4, 'Sequoia National Park, CA, USA', 36.4864, -118.5658, 2),
(4, 'Las Vegas, NV, USA', 36.1699, -115.1398, 3),
(4, 'Los Angeles, CA, USA', 34.0522, -118.2437, 4);
