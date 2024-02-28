-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: database
-- Generation Time: Feb 28, 2024 at 08:16 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spring-boot-rest-api-basic`
--
CREATE DATABASE IF NOT EXISTS `spring-boot-rest-api-basic` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci;
USE `spring-boot-rest-api-basic`;

-- --------------------------------------------------------

--
-- Table structure for table `domains`
--

DROP TABLE IF EXISTS `domains`;
CREATE TABLE `domains` (
  `_id` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `domains`
--

INSERT INTO `domains` (`_id`, `name`, `is_active`) VALUES
(1, 'ahmet.com.tr', 1),
(2, 'tuna.com.tr', 1);

-- --------------------------------------------------------

--
-- Table structure for table `issues`
--

DROP TABLE IF EXISTS `issues`;
CREATE TABLE `issues` (
  `_id` int NOT NULL,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  `description` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  `iat` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `issues`
--

INSERT INTO `issues` (`_id`, `title`, `description`, `iat`, `is_active`, `user_id`) VALUES
(1, 'backend', 'implement controller', '/Date(1708570980000)/', 1, 1),
(2, 'udpated issue', 'updated bugs :(', '/Date(1708570980000)/', 1, 1),
(3, 'security', 'configure keys', '/Date(1708570980000)/', 1, 2),
(4, 'devops', 'manage node', '/Date(1708570980000)/', 1, 2),
(5, 'marketing', 'manage advertisements', '/Date(1708570980000)/', 1, 2),
(6, 'new issue', 'new bugs :)', '/Date(1708570980000)/', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `_id` int NOT NULL,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `progress` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`_id`, `title`, `is_active`, `progress`) VALUES
(1, 'Skill-Catalyst', 0, 30),
(2, 'Colors_Of_The_World', 0, 100);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `_id` int NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`_id`, `role`) VALUES
(1, 'ROLE_EMPLOYEE'),
(2, 'ROLE_MANAGER'),
(3, 'ROLE_ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `_id` int NOT NULL,
  `first_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  `password` varchar(68) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `domain_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`_id`, `first_name`, `email`, `password`, `is_active`, `domain_id`) VALUES
(1, 'ahmet', 'ahmet@hotmail.com', '{bcrypt}$2a$10$RaU93TnN0W29vcEa9tIbKukiDlyPdXzXa3xC0BYx4nTzUP3zKWT/6', 1, 1),
(2, 'tuna', 'tuna@hotmail.com', '{bcrypt}$2a$10$RaU93TnN0W29vcEa9tIbKukiDlyPdXzXa3xC0BYx4nTzUP3zKWT/6', 1, 2),
(3, 'kisimo', 'kisimo@hotmail.com', '{bcrypt}$2a$10$RaU93TnN0W29vcEa9tIbKukiDlyPdXzXa3xC0BYx4nTzUP3zKWT/6', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_projects`
--

DROP TABLE IF EXISTS `users_projects`;
CREATE TABLE `users_projects` (
  `user_id` int NOT NULL,
  `project_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `users_projects`
--

INSERT INTO `users_projects` (`user_id`, `project_id`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles` (
  `_id` int NOT NULL,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users_roles`
--

INSERT INTO `users_roles` (`_id`, `user_id`, `role_id`) VALUES
(6, 1, 1),
(7, 2, 1),
(8, 2, 2),
(12, 3, 1),
(13, 3, 2),
(14, 3, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `domains`
--
ALTER TABLE `domains`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `issues`
--
ALTER TABLE `issues`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `domain_id` (`domain_id`);

--
-- Indexes for table `users_projects`
--
ALTER TABLE `users_projects`
  ADD KEY `user_id` (`user_id`,`project_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `users_roles`
--
ALTER TABLE `users_roles`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `domains`
--
ALTER TABLE `domains`
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `issues`
--
ALTER TABLE `issues`
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users_roles`
--
ALTER TABLE `users_roles`
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `issues`
--
ALTER TABLE `issues`
  ADD CONSTRAINT `issues_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`domain_id`) REFERENCES `domains` (`_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `users_projects`
--
ALTER TABLE `users_projects`
  ADD CONSTRAINT `users_projects_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_projects_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_roles`
--
ALTER TABLE `users_roles`
  ADD CONSTRAINT `users_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
