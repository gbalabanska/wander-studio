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

-- Step 3: Reset auto-increment values for primary keys
ALTER TABLE user AUTO_INCREMENT = 1;
ALTER TABLE user_friend AUTO_INCREMENT = 1;

--decrypted password: 1
INSERT INTO `user` (`username`, `email`, `gender`, `password`, `roles`) VALUES
('alice', 'alice@example.com', 'F', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('bob', 'bob@example.com', 'M', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER'),
('charlie', 'charlie@example.com', 'M', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_ADMIN'),
('diana', 'diana@example.com', 'F', '$2a$10$owZ6ydjUfbVP4GXbyCJwg.ULxnGLvWf.FMAoKf9DXimiaGzb6SvrS', 'ROLE_USER');
