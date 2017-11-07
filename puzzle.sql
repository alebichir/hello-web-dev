-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 05 Noi 2017 la 16:51
-- Versiune server: 10.1.19-MariaDB
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `numbers`
--

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `puzzle`
--

CREATE TABLE `puzzle` (
  `id` int(11) NOT NULL,
  `numbers` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Salvarea datelor din tabel `puzzle`
--

INSERT INTO `puzzle` (`id`, `numbers`) VALUES
(3, '["0","1","2","3","4","5","6","7","8"]'),
(4, '["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]'),
(5, '["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `puzzle`
--
ALTER TABLE `puzzle`
  ADD UNIQUE KEY `id` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
