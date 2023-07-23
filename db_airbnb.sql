-- -------------------------------------------------------------
-- TablePlus 5.3.8(500)
--
-- https://tableplus.com/
--
-- Database: db_airbnb
-- Generation Time: 2023-07-16 20:57:51.3520
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS db_airbnb;
CREATE DATABASE db_airbnb;
USE db_airbnb;

CREATE TABLE `BinhLuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `noi_dung` varchar(255) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `ma_nguoi_dung` int DEFAULT NULL,
  `ma_phong` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_nguoi_dung` (`ma_nguoi_dung`),
  KEY `ma_phong` (`ma_phong`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `NguoiDung` (`id`),
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DatPhong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ngay_den` datetime DEFAULT NULL,
  `ngay_di` datetime DEFAULT NULL,
  `so_luong_khach` int DEFAULT NULL,
  `ma_phong` int DEFAULT NULL,
  `ma_nguoi_dat` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_nguoi_dat` (`ma_nguoi_dat`),
  KEY `ma_phong` (`ma_phong`),
  CONSTRAINT `DatPhong_ibfk_1` FOREIGN KEY (`ma_nguoi_dat`) REFERENCES `NguoiDung` (`id`),
  CONSTRAINT `DatPhong_ibfk_2` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `birthday` varchar(100) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `avatar` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Phong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_phong` varchar(150) DEFAULT NULL,
  `khach` int DEFAULT NULL,
  `phong_ngu` int DEFAULT NULL,
  `giuong` int DEFAULT NULL,
  `phong_tam` int DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `may_giat` tinyint(1) DEFAULT NULL,
  `ban_ui` tinyint(1) DEFAULT NULL,
  `tivi` tinyint(1) DEFAULT NULL,
  `dieu_hoa` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `bep` tinyint(1) DEFAULT NULL,
  `do_xe` tinyint(1) DEFAULT NULL,
  `ho_boi` tinyint(1) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_vi_tri` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_vi_tri` (`ma_vi_tri`),
  CONSTRAINT `Phong_ibfk_1` FOREIGN KEY (`ma_vi_tri`) REFERENCES `ViTri` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ViTri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(255) DEFAULT NULL,
  `tinh_thanh` varchar(150) DEFAULT NULL,
  `quoc_gia` int DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;