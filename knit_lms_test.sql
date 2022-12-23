-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 23, 2022 at 10:02 PM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `knit_lms_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_login`
--

DROP TABLE IF EXISTS `admin_login`;
CREATE TABLE IF NOT EXISTS `admin_login` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
CREATE TABLE IF NOT EXISTS `authors` (
  `author_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`author_id`, `name`) VALUES
(1, 'J.K. Rowling'),
(2, 'Stephen King'),
(3, 'Jane Austen'),
(4, 'William Shakespeare');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author_id` int(11) NOT NULL,
  `publisher_id` int(11) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `publication_year` int(11) NOT NULL,
  `availability` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`book_id`),
  KEY `author_id` (`author_id`),
  KEY `publisher_id` (`publisher_id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `title`, `author_id`, `publisher_id`, `isbn`, `publication_year`, `availability`) VALUES
(3, 'DSTL', 1, 1, '9780747542184', 1999, 1),
(5, 'Harry Potter and the Order of the Phoenix', 1, 1, '9780747550806', 2003, 1),
(6, 'Harry Potter and the Half-Blood Prince', 1, 1, '9780747555479', 2005, 1),
(25, 'Oprating System', 2, 901, '7346589285', 2020, 0),
(26, 'Oprating System', 2, 5, '763786', 2020, 0),
(20, 'HTML Tutorial', 2, 4, '48778575749', 2022, 1),
(24, 'Programming With C++', 63, 1234, '2314', 2018, 1),
(27, 'CSS Tutorial', 64, 1234, '1243', 2018, 0);

-- --------------------------------------------------------

--
-- Table structure for table `borrowed_books`
--

DROP TABLE IF EXISTS `borrowed_books`;
CREATE TABLE IF NOT EXISTS `borrowed_books` (
  `borrow_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `borrow_date` date NOT NULL,
  `due_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  PRIMARY KEY (`borrow_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `borrowed_books`
--

INSERT INTO `borrowed_books` (`borrow_id`, `user_id`, `book_id`, `borrow_date`, `due_date`, `return_date`) VALUES
(1, 10, 6, '2022-12-23', '2023-03-23', NULL),
(2, 20, 6, '2022-12-23', '2023-03-23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

DROP TABLE IF EXISTS `loans`;
CREATE TABLE IF NOT EXISTS `loans` (
  `loan_id` int(11) NOT NULL AUTO_INCREMENT,
  `book_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `loan_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  PRIMARY KEY (`loan_id`),
  KEY `book_id` (`book_id`),
  KEY `member_id` (`member_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
CREATE TABLE IF NOT EXISTS `members` (
  `member_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`member_id`, `name`, `email`, `phone`) VALUES
(1, 'John Smith', 'john@example.com', '123-456-7890'),
(2, 'Jane Doe', 'jane@example.com', '098-765-4321'),
(3, 'Bob Johnson', 'bob@example.com', '111-222-3333'),
(4, 'Alice Williams', 'alice@example.com', '444-555-6666');

-- --------------------------------------------------------

--
-- Table structure for table `publishers`
--

DROP TABLE IF EXISTS `publishers`;
CREATE TABLE IF NOT EXISTS `publishers` (
  `publisher_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`publisher_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `publishers`
--

INSERT INTO `publishers` (`publisher_id`, `name`) VALUES
(1, 'Bloomsbury'),
(2, 'Penguin Random House'),
(3, 'Simon & Schuster'),
(4, 'HarperCollins');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `student_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `enrollment_status` text NOT NULL,
  `library_card_number` text NOT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `name`, `email`, `enrollment_status`, `library_card_number`) VALUES
(1, 'John Smith', 'john@example.com', 'Enrolled', '123456'),
(2, 'Jane Doe', 'jane@example.com', 'Enrolled', '234567'),
(3, 'Bob Johnson', 'bob@example.com', 'Not Enrolled', '345678');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(2, 'Bob Johnson', 'bob@example.com', '$2b$10$drMZ0O7K5T6PLC8/05HFQezB4zUsGtLwuQ2m22wVXlk4yuYdvvK8O'),
(3, 'Calista Robertson', 'hynyk@mailinator.com', '$2b$10$PvCvl7gNaQdbxwztCSecHOmbZigWST7JYG..K1dUgx5IjjXlUhNI6'),
(4, 'Stella Anthony', 'cyledyhisy@mailinator.com', '$2b$10$QPW6JwbKKYkzPQxa7wRTieMOetkT/HDNKIQMnx2pEgBN9GUFv8lX.'),
(5, 'Coby Houston', 'ziwejavu@mailinator.com', '$2b$10$wbhjX.HhZK3swtlwyExXDekBOz9iw2R1o8fKBxdCqkaVS3mmZAOGi'),
(6, 'Charity Olsen', 'juqiviloda@mailinator.com', '$2b$10$5dBV6ecvhilaZNTcXAo7P.okJXWxNJuleq3HggnS3TysHVgHpJCEe'),
(7, 'Regina Burnett', 'lalovowy@mailinator.com', '$2b$10$O2B./5CSFs01kBjr6MP3yOGLYsSwWqmL8VmFl1WHiJI2XRedIUotW'),
(8, 'Clark Gordon', 'rylusow@mailinator.com', '$2b$10$mWRP6E9EtaZoirUXtQQ7buHXozFuEC6MrIEXb6A/FV2oytaHO0Goy'),
(9, 'Kaseem Wise', 'niqevo@mailinator.com', '$2b$10$op0AdmdBk2ykB/Y1Wax3bOwk3oouQjGnV.BUKSS5p1cwm2BjGLrzC'),
(10, 'Akash Yadav', 'ashu2612yadav@gmail.com', '$2b$10$hiN3FI3VzDENn2eySX78COOpxOSz0YxgOJGZM87fEarRZtrFnGldS');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
