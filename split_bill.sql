-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220524.9aa859bdd3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2022 at 10:11 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `split_bill`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `group_id`, `user_id`) VALUES
(1, 1, 19),
(4, 3, 19),
(6, 1, 20),
(7, 2, 20),
(8, 3, 20),
(9, 3, 21),
(10, 2, 21),
(11, 2, 22),
(12, 5, 22),
(13, 1, 22),
(15, 5, 19),
(18, 4, 19),
(19, 5, 20),
(20, 4, 21),
(21, 5, 21),
(22, 1, 23),
(23, 4, 23),
(24, 5, 23),
(25, 2, 24),
(26, 4, 24);

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `group_id`, `amount`, `description`) VALUES
(1, 1, '101', 'flat tyre'),
(2, 1, '33', 'ice cream'),
(3, 1, '5', 'water'),
(4, 1, '124', 'bus tickets'),
(5, 1, '456', 'opera ticket'),
(6, 2, '879', 'flight tickets'),
(7, 2, '2478', 'hotel price'),
(8, 2, '145', 'airport transfer'),
(9, 2, '1300', '7 day meals'),
(10, 2, '256', 'souvenirs'),
(11, 3, '3600', 'cabin rent'),
(12, 3, '600', 'gear rent'),
(13, 3, '2400', 'food and drinks'),
(14, 3, '340', 'petrol'),
(15, 4, '457', 'flight tickets'),
(16, 4, '89', 'airport transfer'),
(17, 4, '465', 'hotel bill'),
(18, 4, '377', 'meals'),
(19, 5, '777', 'flight tickets'),
(20, 5, '246', 'cabin rent'),
(21, 5, '688', 'hostel bill'),
(22, 5, '133', 'guide tour'),
(23, 5, '3576', 'food and drinks'),
(24, 5, '245', 'souvenirs'),
(25, 5, '290', 'sauna'),
(26, 2, '13', 'for coffee'),
(27, 2, '14', 'uz ledus'),
(28, 2, '14', 'for coffee'),
(29, 2, '14', 'for coffee');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(1, 'test1'),
(2, 'Trip to Spain'),
(3, 'Going to Alps'),
(4, 'Dinner in Belgium'),
(5, 'Trip to Finland');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `reg_timestamp`) VALUES
(19, 'test one', 'test@one.com', '$2b$15$ENia3SIFq8JuGE9WiX13uO.bhFTo4nkVOxyBhEDO4CW1tym5HrMzC', '2022-05-26 17:32:55'),
(20, 'test two', 'test@two.com', '$2b$15$xyIOLh1hnaIUjXQ9X32DuORtu4x6NsCOKwHIFqa6pXdga8WK5GSxS', '2022-05-27 11:44:08'),
(21, 'test three', 'test@three.com', '$2b$15$hnOkJI3oXSLkkyMNUpkgYOUAYNfw2aHjQ7Ktm91X1IT3wFt1IrxOq', '2022-05-27 11:44:23'),
(22, 'test four', 'test@four.com', '$2b$15$0mQ2ww7eN7Wc5fspWR9KIerkIqdTQtuVrNwrayORAiCNecfAk0Xgm', '2022-05-27 11:44:39'),
(23, 'test five', 'test@five.com', '$2b$15$RqoOw7cq1HV56BfWzS.vO.WCT8crXkwVc3edsNvDMaBZ8x9DRwYdC', '2022-05-27 16:51:40'),
(24, 'test six', 'test@six.com', '$2b$15$usTcQ1Credb2MUrqVrNXtephDrKbqTvomKahx/xv/eIgHyHcJWkXK', '2022-05-29 14:05:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



