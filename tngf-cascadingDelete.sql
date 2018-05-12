-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2018 at 07:54 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tngf`
--

-- --------------------------------------------------------

--
-- Table structure for table `goal`
--

CREATE TABLE `goal` (
  `MinuteScored` int(11) NOT NULL,
  `SecondScored` int(11) NOT NULL,
  `TeamID` int(11) NOT NULL,
  `PlayerID` int(11) NOT NULL,
  `MatchID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `goal`
--

INSERT INTO `goal` (`MinuteScored`, `SecondScored`, `TeamID`, `PlayerID`, `MatchID`) VALUES
(10, 17, 7, 13, 5),
(10, 55, 3, 5, 2),
(15, 12, 1, 2, 6),
(15, 51, 1, 1, 1),
(25, 17, 1, 1, 6),
(25, 30, 5, 10, 4),
(29, 30, 7, 14, 5),
(35, 11, 1, 2, 1),
(36, 52, 8, 16, 5),
(41, 39, 5, 9, 4),
(44, 15, 3, 5, 2),
(50, 50, 2, 3, 6),
(55, 21, 6, 11, 4),
(60, 36, 3, 6, 2),
(75, 59, 2, 3, 6),
(78, 10, 5, 9, 4),
(78, 19, 7, 13, 5),
(80, 19, 4, 7, 2),
(87, 9, 2, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `league`
--

CREATE TABLE `league` (
  `LeagueID` int(11) NOT NULL,
  `LeagueName` varchar(50) NOT NULL,
  `Country` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `league`
--

INSERT INTO `league` (`LeagueID`, `LeagueName`, `Country`) VALUES
(1, 'Premier League', 'England'),
(2, 'La Liga', 'Spain'),
(3, 'Series A', 'Italy'),
(4, 'Bundesliga', 'Germany'),
(5, 'Ligue 1', 'France');

-- --------------------------------------------------------

--
-- Table structure for table `match_details`
--

CREATE TABLE `match_details` (
  `MatchID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `LeagueID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `match_details`
--

INSERT INTO `match_details` (`MatchID`, `Date`, `LeagueID`) VALUES
(1, '2017-10-25', 1),
(2, '2017-11-05', 2),
(3, '2017-12-11', 1),
(4, '2018-01-05', 3),
(5, '2018-01-15', 4),
(6, '2018-02-05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `PlayerID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Nickname` varchar(50) DEFAULT NULL,
  `Number` int(11) NOT NULL,
  `TeamID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`PlayerID`, `FirstName`, `LastName`, `Nickname`, `Number`, `TeamID`) VALUES
(1, 'Paul', 'Pogba', 'Pogback', 6, 1),
(2, 'Alexis', 'Sanchez', NULL, 7, 1),
(3, 'Eden', 'Hazard', NULL, 10, 2),
(4, 'N\'Golo', 'Kante', NULL, 7, 2),
(5, 'Lionel', 'Messi', 'La Pulga', 10, 3),
(6, 'Luis', 'Suarez', NULL, 9, 3),
(7, 'Cristiano', 'Ronaldo', 'CR7', 7, 4),
(8, 'Gareth', 'Bale', 'The Cannon', 11, 4),
(9, 'Gonzalo', 'Higuain', NULL, 9, 5),
(10, 'Paulo', 'Dybala', NULL, 10, 5),
(11, 'Leonardo', 'Bonucci', NULL, 19, 6),
(12, 'Gianluigi', 'Donnarumma', NULL, 99, 6),
(13, 'Robert', 'Lewandowski', NULL, 9, 7),
(14, 'Arjen', 'Robben', NULL, 10, 7),
(15, 'Mario', 'Gotze', NULL, 10, 8),
(16, 'Marco', 'Reus', NULL, 11, 8);

-- --------------------------------------------------------

--
-- Table structure for table `player_position`
--

CREATE TABLE `player_position` (
  `Position` varchar(50) NOT NULL,
  `PlayerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `player_position`
--

INSERT INTO `player_position` (`Position`, `PlayerID`) VALUES
('CAM', 1),
('CAM', 10),
('CB', 11),
('CDM', 4),
('CF', 15),
('GK', 12),
('LW', 2),
('LW', 3),
('LW', 7),
('LW', 16),
('RW', 8),
('RW', 14),
('ST', 5),
('ST', 6),
('ST', 9),
('ST', 13);

-- --------------------------------------------------------

--
-- Table structure for table `playsin`
--

CREATE TABLE `playsin` (
  `IsHome` tinyint(1) NOT NULL,
  `TeamID` int(11) NOT NULL,
  `MatchID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `playsin`
--

INSERT INTO `playsin` (`IsHome`, `TeamID`, `MatchID`) VALUES
(1, 1, 1),
(0, 1, 6),
(0, 2, 1),
(0, 2, 3),
(1, 2, 6),
(0, 3, 2),
(1, 4, 2),
(1, 5, 4),
(0, 6, 4),
(1, 7, 5),
(0, 8, 5),
(1, 12, 3);

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `TeamID` int(11) NOT NULL,
  `TeamName` varchar(50) NOT NULL,
  `City` varchar(50) NOT NULL,
  `LeagueID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`TeamID`, `TeamName`, `City`, `LeagueID`) VALUES
(1, 'Manchester United', 'Manchester', 1),
(2, 'Chelsea', 'London', 1),
(3, 'Barcelona', 'Barcelona', 2),
(4, 'Real Madrid', 'Madrid', 2),
(5, 'Juventus', 'Turin', 3),
(6, 'AC Milan', 'Milan', 3),
(7, 'FC Bayern', 'Munich', 4),
(8, 'Dortmund', 'Dortmund', 4),
(9, 'Liverpool', 'Liverpool', 1),
(10, 'Arsenal', 'London', 1),
(11, 'Manchester City', 'Manchester', 1),
(12, 'Tottenham', 'London', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `goal`
--
ALTER TABLE `goal`
  ADD PRIMARY KEY (`MinuteScored`,`SecondScored`,`TeamID`,`PlayerID`,`MatchID`),
  ADD KEY `TeamID` (`TeamID`),
  ADD KEY `PlayerID` (`PlayerID`),
  ADD KEY `MatchID` (`MatchID`);

--
-- Indexes for table `league`
--
ALTER TABLE `league`
  ADD PRIMARY KEY (`LeagueID`);

--
-- Indexes for table `match_details`
--
ALTER TABLE `match_details`
  ADD PRIMARY KEY (`MatchID`),
  ADD KEY `LeagueID` (`LeagueID`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`PlayerID`),
  ADD KEY `TeamID` (`TeamID`);

--
-- Indexes for table `player_position`
--
ALTER TABLE `player_position`
  ADD PRIMARY KEY (`Position`,`PlayerID`),
  ADD KEY `PlayerID` (`PlayerID`);

--
-- Indexes for table `playsin`
--
ALTER TABLE `playsin`
  ADD PRIMARY KEY (`TeamID`,`MatchID`),
  ADD KEY `MatchID` (`MatchID`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`TeamID`),
  ADD KEY `LeagueID` (`LeagueID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `league`
--
ALTER TABLE `league`
  MODIFY `LeagueID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `match_details`
--
ALTER TABLE `match_details`
  MODIFY `MatchID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `PlayerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `TeamID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `goal`
--
ALTER TABLE `goal`
  ADD CONSTRAINT `goal_ibfk_1` FOREIGN KEY (`TeamID`) REFERENCES `team` (`TeamID`) ON DELETE CASCADE,
  ADD CONSTRAINT `goal_ibfk_2` FOREIGN KEY (`PlayerID`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE,
  ADD CONSTRAINT `goal_ibfk_3` FOREIGN KEY (`MatchID`) REFERENCES `match_details` (`MatchID`) ON DELETE CASCADE;

--
-- Constraints for table `match_details`
--
ALTER TABLE `match_details`
  ADD CONSTRAINT `match_details_ibfk_1` FOREIGN KEY (`LeagueID`) REFERENCES `league` (`LeagueID`) ON DELETE CASCADE;

--
-- Constraints for table `player`
--
ALTER TABLE `player`
  ADD CONSTRAINT `player_ibfk_1` FOREIGN KEY (`TeamID`) REFERENCES `team` (`TeamID`) ON DELETE CASCADE;

--
-- Constraints for table `player_position`
--
ALTER TABLE `player_position`
  ADD CONSTRAINT `player_position_ibfk_1` FOREIGN KEY (`PlayerID`) REFERENCES `player` (`PlayerID`) ON DELETE CASCADE;

--
-- Constraints for table `playsin`
--
ALTER TABLE `playsin`
  ADD CONSTRAINT `playsin_ibfk_1` FOREIGN KEY (`TeamID`) REFERENCES `team` (`TeamID`) ON DELETE CASCADE,
  ADD CONSTRAINT `playsin_ibfk_2` FOREIGN KEY (`MatchID`) REFERENCES `match_details` (`MatchID`) ON DELETE CASCADE;

--
-- Constraints for table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`LeagueID`) REFERENCES `league` (`LeagueID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
