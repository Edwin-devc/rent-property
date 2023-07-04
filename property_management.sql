-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2023 at 06:14 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `property_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `aid` varchar(6) NOT NULL,
  `uid` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`aid`, `uid`) VALUES
('A34519', 'U15125'),
('A40571', 'U70031');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `cid` varchar(6) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `uid` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`cid`, `firstname`, `lastname`, `contact`, `uid`) VALUES
('C60379', 'Abaho', 'Miracle', '0702345456', 'U67689');

-- --------------------------------------------------------

--
-- Table structure for table `clientrequest`
--

CREATE TABLE `clientrequest` (
  `rid` varchar(6) NOT NULL,
  `client_email` varchar(35) NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'pending',
  `pid` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `kid` varchar(6) NOT NULL,
  `comment` text NOT NULL,
  `pid` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`kid`, `comment`, `pid`) VALUES
('K46677', 'This is nice', 'P09342'),
('K57379', 'This is nice and it fits my needs', 'P09342'),
('K60038', 'This is a nice house', 'P57878'),
('K65258', 'It is not worth the price.', 'P09342');

-- --------------------------------------------------------

--
-- Table structure for table `landlord`
--

CREATE TABLE `landlord` (
  `lid` varchar(6) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `uid` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `landlord`
--

INSERT INTO `landlord` (`lid`, `firstname`, `lastname`, `contact`, `uid`) VALUES
('L12345', 'Nalukwago', 'Lydia', '0756342045', 'U12347'),
('L43629', 'Ikiriza', 'Paul', '0717432589', 'U37157');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `pid` varchar(6) NOT NULL,
  `name` varchar(30) NOT NULL,
  `type` varchar(20) NOT NULL,
  `location` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `bedrooms` int(11) NOT NULL DEFAULT 0,
  `bathrooms` int(11) NOT NULL DEFAULT 0,
  `cost` decimal(10,0) NOT NULL DEFAULT 0,
  `photo` varchar(40) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `likes` int(8) NOT NULL DEFAULT 0,
  `dislikes` int(8) NOT NULL DEFAULT 0,
  `lid` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`pid`, `name`, `type`, `location`, `description`, `bedrooms`, `bathrooms`, `cost`, `photo`, `status`, `likes`, `dislikes`, `lid`) VALUES
('P38533', 'Mirembe Apartment', 'Apartment', 'Kyanja', 'Great', 4, 2, '400000', '1687677439962.jpg', 'pending', 0, 0, 'L12345'),
('P63814', 'Masterwood', 'Apartment', 'Naalya Shrine Rd', 'Good and affordable', 4, 1, '4500000', '1687677826350.jpg', 'approved', 0, 0, 'L12345');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` varchar(6) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(35) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `email`, `password`, `role`) VALUES
('U12346', 'atukundaalvin@gmail.com', 'Alvin@client', 'Client'),
('U12347', 'lydian358@gmail.com', '123', 'Landlord'),
('U15125', 'erwakasiisi@gmail.com', 'edwin', 'Admin'),
('U37157', 'paulik@gmail.com', 'paul', 'Landlord'),
('U67689', 'miraclea@gmail.com', 'miracle', 'Client'),
('U70031', 'taras@gmail.com', 'taras', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`kid`);

--
-- Indexes for table `landlord`
--
ALTER TABLE `landlord`
  ADD PRIMARY KEY (`lid`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
