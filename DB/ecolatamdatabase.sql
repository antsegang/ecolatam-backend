-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-06-2023 a las 07:10:50
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- DATE recive en formato yyyy-mm-dd 


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecolatam`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bcategory`
--

CREATE TABLE `bcategory` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(70) NOT NULL UNIQUE,
  `description` VARCHAR(150) NOT NULL,
  `created_at` DATE NOT NULL,
  `added_by` INT(11) NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `idtype`
--

CREATE TABLE `idtype` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(70) NOT NULL UNIQUE,
  `description` VARCHAR(255) NOT NULL,
  `created_at` DATE NOT NULL,
  `added_by` INT(11) NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE `pais` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `created_at` DATE NOT NULL,
  `added_by` INT(11) NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincia`
--

CREATE TABLE `provincia` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_pais` INT NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `created_at` DATE NOT NULL,
  `added_by` INT(11) NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canton`
--

CREATE TABLE `canton` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_provincia` INT(11) NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `created_at` DATE NOT NULL,
  `added_by` INT(11) NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `distrito`
--

CREATE TABLE `distrito` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_canton` INT(11) NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `created_at` DATE NOT NULL,
  `added_by` INT(11) NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `lastname` VARCHAR(70) NOT NULL,
  `birthdate` DATE NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `id_pais` INT(11) NOT NULL,
  `id_provincia` INT(11) NOT NULL,
  `id_canton` INT(11) NOT NULL,
  `id_distrito` INT(11) NOT NULL,
  `zip` VARCHAR(70) NOT NULL,
  `cellphone` VARCHAR(11) NOT NULL UNIQUE,
  `phone` VARCHAR(11) NOT NULL UNIQUE,
  `created_at` DATE NOT NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth`
--

CREATE TABLE `auth` (
  `id` INT(11) PRIMARY KEY NOT NULL,
  `username` VARCHAR(70) NOT NULL UNIQUE,
  `email` VARCHAR(70) NOT NULL UNIQUE,
  `password` VARCHAR(255)NOT NULL,
  `created_at` DATE NOT NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kyc`
--

CREATE TABLE `ukyc` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL UNIQUE,
  `id_idtype` INT(11) NOT NULL,
  `identity` VARCHAR(15) NOT NULL UNIQUE,
  `pictures` VARCHAR(255) NOT NULL, 
  `approved_by` INT(11) NULL,
  `sended_at` DATE NOT NULL,
  `approved_at` DATE NULL,
  `approve` BOOLEAN NOT NULL DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `business`
--

CREATE TABLE `business` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `id_pais` INT(11) NOT NULL,
  `id_provincia` INT(11) NOT NULL,
  `id_canton` INT(11) NOT NULL,
  `id_distrito` INT(11) NOT NULL,
  `zip` VARCHAR(70) NOT NULL,
  `email` VARCHAR(70) NOT NULL UNIQUE,
  `id_bcategory` INT(11) NOT NULL,
  `phone` VARCHAR(11) NOT NULL UNIQUE,
  `created_at` DATE NOT NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bkyc`
--

CREATE TABLE `bkyc` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_business` INT(11) NOT NULL UNIQUE,
  `id_user` INT(11) NOT NULL,
  `id_idtype` INT(11) NOT NULL,
  `identity` VARCHAR(15) NOT NULL UNIQUE,
  `pictures` VARCHAR(255) NOT NULL, 
  `approved_by` INT(11) NULL,
  `approved_at` DATE NULL,
  `sended_at` DATE NOT NULL,
  `approve` BOOLEAN NOT NULL DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regel`
--

CREATE TABLE `regel` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL,
  `id_business` INT(11) NOT NULL UNIQUE,
  `document` VARCHAR(255) NOT NULL,
  `approved_by` INT(11) NULL,
  `approved_at` DATE NULL,
  `sended_at` DATE NOT NULL,
  `approve` BOOLEAN NOT NULL DEFAULT FALSE,
  `renewed_at`DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `csagent`
--

CREATE TABLE `csagent` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL UNIQUE,
  `added_by` INT(11) NOT NULL,
  `added_at` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `superadmin`
--

CREATE TABLE `superadmin` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL UNIQUE,
  `added_by` INT(11) NOT NULL,
  `added_at` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL UNIQUE,
  `added_by` INT(11) NOT NULL,
  `added_at` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inspector`
--

CREATE TABLE `inspector` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL UNIQUE,
  `approved_by` INT(11) NULL,
  `approved_at` DATE NULL,  
  `approve` BOOLEAN NOT NULL DEFAULT FALSE,
  `sended_at` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vip`
--

CREATE TABLE `vip` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL UNIQUE,
  `approved_by` INT(11) NULL,
  `approved_at` DATE NULL,
  `approve` BOOLEAN NOT NULL DEFAULT FALSE,
  `sended_at` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `volunteer`
--

CREATE TABLE `volunteer` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL UNIQUE,
  `approved_by` INT(11) NULL,
  `approve` BOOLEAN NOT NULL DEFAULT FALSE,
  `approved_at` DATE NULL,
  `sended_at` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tour_guide`
--

CREATE TABLE `tour_guide` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL UNIQUE,
  `approved_by` INT(11) NULL,
  `approve` BOOLEAN NOT NULL DEFAULT FALSE,
  `approved_at` DATE NULL,
  `sended_at` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` INT(100) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_business` INT(100) NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `price` INT(11) NOT NULL,
  `approved_by` INT(11) NULL,
  `approved_at` DATE NULL,
  `approve` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` DATE NOT NULL,
  `edited_at` DATE NOT NULL,
  `disponibility` BOOLEAN NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service`
--

CREATE TABLE `service` (
  `id` INT(100) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_business` INT(100) NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `price` INT(11) NOT NULL,
  `approved_by` INT(11) NULL,
  `approved_at` DATE NULL,
  `approve` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` DATE NOT NULL,
  `edited_at` DATE NOT NULL,
  `disponibility` BOOLEAN NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `business_review`
--

CREATE TABLE `business_review` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL,
  `id_business` INT(11) NOT NULL,
  `score` INT(2) NOT NULL,
  `comment` VARCHAR(255) NULL,
  `added_at` DATE NOT NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_review`
--

CREATE TABLE `product_review` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL,
  `id_product` INT(11) NOT NULL,
  `score` INT(2) NOT NULL,
  `comment` VARCHAR(255) NULL,
  `added_at` DATE NOT NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service_review`
--

CREATE TABLE `service_review` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL,
  `id_service` INT(11) NOT NULL,
  `score` INT(2) NOT NULL,
  `comment` VARCHAR(255) NULL,
  `added_at` DATE NOT NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `csagent_review`
--

CREATE TABLE `csagent_review` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL,
  `id_csagent` INT(11) NOT NULL,
  `score` INT(2) NOT NULL,
  `comment` VARCHAR(255) NULL,
  `added_at` DATE NOT NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tour_guide_review`
--

CREATE TABLE `tour_guide_review` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_user` INT(11) NOT NULL,
  `id_tour_guide` INT(11) NOT NULL,
  `score` INT(2) NOT NULL,
  `comment` VARCHAR(255) NULL,
  `added_at` DATE NOT NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `volunteer_review_business`
--

CREATE TABLE `volunteer_review_business` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_volunteer` INT(11) NOT NULL,
  `id_business` INT(11) NOT NULL,
  `score` INT(2) NOT NULL,
  `comment` VARCHAR(255) NULL,
  `added_at` DATE NOT NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `business_review_volunteer`
--

CREATE TABLE `business_review_volunteer` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `id_volunteer` INT(11) NOT NULL,
  `id_business` INT(11) NOT NULL,
  `score` INT(2) NOT NULL,
  `comment` VARCHAR(255) NULL,
  `added_at` DATE NOT NULL,
  `edited_at` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Filtros para la tabla `bcategory`
--
ALTER TABLE `bcategory`
  ADD CONSTRAINT `bcategory_added_by` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `idtype`
--
ALTER TABLE `idtype`
  ADD CONSTRAINT `idtype_added_by` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pais`
--
ALTER TABLE `pais`
  ADD CONSTRAINT `pais_added_by` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `provincia`
--
ALTER TABLE `provincia`
  ADD CONSTRAINT `provincia_id_pais` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `provincia_added_by` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `canton`
--
ALTER TABLE `canton`
  ADD CONSTRAINT `canton_id_provincia` FOREIGN KEY (`id_provincia`) REFERENCES `provincia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `canton_added_by` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `distrito`
--
ALTER TABLE `distrito`
  ADD CONSTRAINT `distrito_id_canton` FOREIGN KEY (`id_canton`) REFERENCES `canton` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `distrito_added_by` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_id_pais` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `users_id_provincia` FOREIGN KEY (`id_provincia`) REFERENCES `provincia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `users_id_canton` FOREIGN KEY (`id_canton`) REFERENCES `canton` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `users_id_distrito` FOREIGN KEY (`id_distrito`) REFERENCES `distrito` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ukyc`
--
ALTER TABLE `ukyc`
  ADD CONSTRAINT `ukyc_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ukyc_id_idtype` FOREIGN KEY (`id_idtype`) REFERENCES `idtype` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ukyc_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `business`
--
ALTER TABLE `business`
  ADD CONSTRAINT `business_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `business_id_pais` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `business_id_provincia` FOREIGN KEY (`id_provincia`) REFERENCES `provincia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `business_id_canton` FOREIGN KEY (`id_canton`) REFERENCES `canton` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `business_id_distrito` FOREIGN KEY (`id_distrito`) REFERENCES `distrito` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `business_id_bcategory` FOREIGN KEY (`id_bcategory`) REFERENCES `bcategory` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `bkyc`
--
ALTER TABLE `bkyc`
  ADD CONSTRAINT `bkyc_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `bkyc_id_idtype` FOREIGN KEY (`id_idtype`) REFERENCES `idtype` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `bkyc_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `regel`
--
ALTER TABLE `regel`
  ADD CONSTRAINT `regel_id_business` FOREIGN KEY (`id_business`) REFERENCES `business` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `regel_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `regel_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `csagent`
--
ALTER TABLE `csagent`
  ADD CONSTRAINT `csagent_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `csagent_added_by` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `superadmin`
--
ALTER TABLE `superadmin`
  ADD CONSTRAINT `superadmin_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `superadmin_added_by` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `admin_added_by` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `inspector`
--
ALTER TABLE `inspector`
  ADD CONSTRAINT `inspector_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `inspector_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vip`
--
ALTER TABLE `vip`
  ADD CONSTRAINT `vip_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `vip_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `volunteer`
--
ALTER TABLE `volunteer`
  ADD CONSTRAINT `volunteer_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `volunteer_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tour_guide`
--
ALTER TABLE `tour_guide`
  ADD CONSTRAINT `tour_guide_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tour_guide_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_id_business` FOREIGN KEY (`id_business`) REFERENCES `business` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_id_business` FOREIGN KEY (`id_business`) REFERENCES `business` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `service_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `business_review`
--
ALTER TABLE `business_review`
  ADD CONSTRAINT `business_review_id_business` FOREIGN KEY (`id_business`) REFERENCES `business` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `business_review_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `product_review`
--
ALTER TABLE `product_review`
  ADD CONSTRAINT `product_review_id_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_review_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `service_review`
--
ALTER TABLE `service_review`
  ADD CONSTRAINT `service_review_id_service` FOREIGN KEY (`id_service`) REFERENCES `service` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `service_review_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `csagent_review`
--
ALTER TABLE `csagent_review`
  ADD CONSTRAINT `csagent_review_id_csagent` FOREIGN KEY (`id_csagent`) REFERENCES `csagent` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `csagent_review_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tour_guide_review`
--
ALTER TABLE `tour_guide_review`
  ADD CONSTRAINT `tour_guide_review_id_tour_guide` FOREIGN KEY (`id_tour_guide`) REFERENCES `tour_guide` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tour_guide_review_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `volunteer_review_business`
--
ALTER TABLE `volunteer_review_business`
  ADD CONSTRAINT `volunteer_review_business_id_volunteer` FOREIGN KEY (`id_volunteer`) REFERENCES `volunteer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `volunteer_review_business_id_business` FOREIGN KEY (`id_business`) REFERENCES `business` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `business_review_volunteer`
--
ALTER TABLE `business_review_volunteer`
  ADD CONSTRAINT `business_review_volunteer_id_volunteer` FOREIGN KEY (`id_volunteer`) REFERENCES `volunteer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `business_review_volunteer_id_business` FOREIGN KEY (`id_business`) REFERENCES `business` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
