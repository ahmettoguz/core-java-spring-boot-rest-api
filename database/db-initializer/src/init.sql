-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: my-sql
-- Generation Time: Apr 16, 2024 at 08:34 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spring-boot-rest-api`
--
CREATE DATABASE IF NOT EXISTS `spring-boot-rest-api` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci;
USE `spring-boot-rest-api`;

-- --------------------------------------------------------

--
-- Table structure for table `domains`
--

DROP TABLE IF EXISTS `domains`;
CREATE TABLE `domains` (
  `_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `domains`
--

INSERT INTO `domains` (`_id`, `created_at`, `updated_at`, `name`, `is_active`) VALUES
(1, '2024-04-05 14:09:19', '2024-04-05 14:09:19', 'ahmet.com.tr', 1),
(2, '2024-04-05 14:09:57', '2024-04-05 14:09:57', 'tuna.com.tr', 1);

-- --------------------------------------------------------

--
-- Table structure for table `issues`
--

DROP TABLE IF EXISTS `issues`;
CREATE TABLE `issues` (
  `_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  `description` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `issues`
--

INSERT INTO `issues` (`_id`, `created_at`, `updated_at`, `title`, `description`, `is_active`, `user_id`) VALUES
(1, '2024-04-05 14:10:21', '2024-04-05 14:10:21', 'backend', 'implement controller', 1, 3),
(2, '2024-04-01 14:10:30', '2024-04-01 14:10:30', 'deployment', 'configure deployment file', 1, 3),
(3, '2024-04-03 14:10:41', '2024-04-03 14:10:41', 'security', 'configure keys', 1, 2),
(4, '2024-04-04 14:10:48', '2024-04-04 14:10:48', 'devops', 'manage node', 1, 2),
(5, '2024-04-06 14:10:55', '2024-04-06 14:10:55', 'marketing', 'manage advertisements', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `progress` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`_id`, `created_at`, `updated_at`, `title`, `is_active`, `progress`) VALUES
(1, '2024-04-05 14:16:48', '2024-04-05 14:16:48', 'Skill-Catalyst', 1, 30),
(2, '2024-04-05 14:16:58', '2024-04-05 14:16:58', 'Colors-Of-The-World', 1, 100);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `_id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`_id`, `name`) VALUES
(1, 'admin'),
(2, 'project manager'),
(3, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `first_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  `password` varchar(68) CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `domain_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`_id`, `created_at`, `updated_at`, `first_name`, `email`, `password`, `is_active`, `domain_id`) VALUES
(1, '2024-04-05 14:11:14', '2024-04-05 14:11:14', 'admin', 'admin@hotmail.com', '$2a$10$RaU93TnN0W29vcEa9tIbKukiDlyPdXzXa3xC0BYx4nTzUP3zKWT/6', 1, NULL),
(2, '2024-04-05 14:11:55', '2024-04-05 14:11:55', 'tuna', 'tuna@hotmail.com', '$2a$10$RaU93TnN0W29vcEa9tIbKukiDlyPdXzXa3xC0BYx4nTzUP3zKWT/6', 1, 2),
(3, '2024-04-05 14:12:17', '2024-04-05 14:12:17', 'ahmet', 'ahmet@hotmail.com', '$2a$10$RaU93TnN0W29vcEa9tIbKukiDlyPdXzXa3xC0BYx4nTzUP3zKWT/6', 1, 1),
(4, '2024-04-05 14:15:25', '2024-04-05 14:15:25', 'kısmet', 'kısmet@hotmail.com', '$2a$10$RaU93TnN0W29vcEa9tIbKukiDlyPdXzXa3xC0BYx4nTzUP3zKWT/6', 1, NULL);

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
(2, 1),
(3, 1),
(3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users_roles`
--

INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 2),
(3, 3);

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
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `domain_id` (`domain_id`);

--
-- Indexes for table `users_projects`
--
ALTER TABLE `users_projects`
  ADD PRIMARY KEY (`user_id`,`project_id`),
  ADD KEY `user_id` (`user_id`,`project_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `users_roles`
--
ALTER TABLE `users_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `domains`
--
ALTER TABLE `domains`
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `issues`
--
ALTER TABLE `issues`
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
