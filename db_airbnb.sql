-- -------------------------------------------------------------
-- TablePlus 5.4.0(504)
--
-- https://tableplus.com/
--
-- Database: db_airbnb
-- Generation Time: 2023-08-26 20:47:03.8350
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
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE,
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id`) ON DELETE CASCADE
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
  CONSTRAINT `DatPhong_ibfk_1` FOREIGN KEY (`ma_nguoi_dat`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE,
  CONSTRAINT `DatPhong_ibfk_2` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id`) ON DELETE CASCADE
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `ma_nguoi_dung` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_vi_tri` (`ma_vi_tri`),
  KEY `ma_nguoi_dung` (`ma_nguoi_dung`),
  CONSTRAINT `Phong_ibfk_1` FOREIGN KEY (`ma_vi_tri`) REFERENCES `ViTri` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Phong_ibfk_2` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ViTri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(255) DEFAULT NULL,
  `tinh_thanh` varchar(150) DEFAULT NULL,
  `quoc_gia` varchar(150) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`id`, `noi_dung`, `sao_binh_luan`, `ngay_binh_luan`, `ma_nguoi_dung`, `ma_phong`) VALUES
(1, 'Phong dep', 5, '2023-08-26 14:52:04', 1, 1);
INSERT INTO `BinhLuan` (`id`, `noi_dung`, `sao_binh_luan`, `ngay_binh_luan`, `ma_nguoi_dung`, `ma_phong`) VALUES
(4, 'Nice', 5, '2023-08-26 14:52:04', 3, 3);
INSERT INTO `BinhLuan` (`id`, `noi_dung`, `sao_binh_luan`, `ngay_binh_luan`, `ma_nguoi_dung`, `ma_phong`) VALUES
(5, 'Nice', 4, '2023-08-26 14:52:04', 4, 3);
INSERT INTO `BinhLuan` (`id`, `noi_dung`, `sao_binh_luan`, `ngay_binh_luan`, `ma_nguoi_dung`, `ma_phong`) VALUES
(6, 'Nice', 4, '2023-08-26 14:52:04', 4, 2),
(7, 'Ok nice', 5, '2023-08-26 14:52:04', 5, 4),
(8, 'Ok nice', 5, '2023-08-26 14:52:04', 5, 5),
(9, 'Ok nice', 5, '2023-08-26 14:52:04', 5, 6);

INSERT INTO `DatPhong` (`id`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_phong`, `ma_nguoi_dat`) VALUES
(1, '2023-08-26 14:54:50', '2023-08-26 14:54:50', 2, 1, 1);
INSERT INTO `DatPhong` (`id`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_phong`, `ma_nguoi_dat`) VALUES
(3, '2023-08-26 14:54:50', '2023-08-26 14:54:50', 2, 1, 3);
INSERT INTO `DatPhong` (`id`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_phong`, `ma_nguoi_dat`) VALUES
(4, '2023-08-26 14:54:50', '2023-08-26 14:54:50', 2, 2, 4);
INSERT INTO `DatPhong` (`id`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_phong`, `ma_nguoi_dat`) VALUES
(5, '2023-08-26 14:54:50', '2023-08-26 14:54:50', 2, 5, 4),
(6, '2023-08-26 14:54:50', '2023-08-26 14:54:50', 2, 7, 4),
(7, '2023-08-26 14:54:50', '2023-08-26 14:54:50', 2, 7, 6),
(8, '2023-08-26 14:54:50', '2023-08-26 14:54:50', 2, 8, 7),
(9, '2023-08-26 14:54:50', '2023-08-26 14:54:50', 2, 8, 9),
(10, '2023-08-26 14:54:50', '2023-08-26 14:54:50', 4, 4, 1);

INSERT INTO `NguoiDung` (`id`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`, `avatar`) VALUES
(1, 'admin123', 'admin@gmail.com', '123456', '12345678', '01/01/2023', 1, 'ADMIN', NULL);
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`, `avatar`) VALUES
(3, 'User1', 'user1@example.com', 'user123', '987654321', '1990-05-15', 0, 'USER', NULL);
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`, `avatar`) VALUES
(4, 'User2', 'user2@example.com', 'user456', '123456789', '1985-09-23', 1, 'USER', NULL);
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `password`, `phone`, `birthday`, `gender`, `role`, `avatar`) VALUES
(5, 'User3', 'user3@example.com', 'user789', '555555555', '2000-02-10', 0, 'USER', NULL),
(6, 'User4', 'user4@example.com', 'userabc', '777777777', '1998-11-30', 1, 'USER', NULL),
(7, 'User5', 'user5@example.com', 'userdef', '444444444', '1993-07-08', 0, 'USER', NULL),
(8, 'User6', 'user6@example.com', 'userxyz', '666666666', '1995-04-20', 1, 'USER', NULL),
(9, 'User7', 'user7@example.com', 'user123', '222222222', '1987-12-18', 1, 'USER', NULL),
(10, 'User8', 'user8@example.com', 'user456', '888888888', '1989-03-25', 0, 'USER', NULL),
(11, 'User9', 'user9@example.com', 'user789', '333333333', '2001-08-05', 1, 'USER', NULL),
(12, 'User10', 'user10@example.com', 'userabc', '111111111', '1997-06-12', 0, 'USER', NULL);

INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_ui`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `hinh_anh`, `ma_vi_tri`, `ma_nguoi_dung`) VALUES
(1, 'NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!', 2, 1, 1, 1, 'string', 28, 1, 1, 1, 1, 1, 1, 1, 1, NULL, 1, 1);
INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_ui`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `hinh_anh`, `ma_vi_tri`, `ma_nguoi_dung`) VALUES
(2, 'STUDIO MỚI NETFLIX MIỄN PHÍ/ĐỖ XE MIỄN PHÍ', 2, 1, 1, 1, 'string', 21, 1, 1, 1, 1, 1, 1, 1, 0, NULL, 1, 1);
INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_ui`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `hinh_anh`, `ma_vi_tri`, `ma_nguoi_dung`) VALUES
(3, 'Phòng sang trọng với ban công tại D.1 - 200m đến Bitexco', 2, 1, 1, 1, 'string', 17, 1, 1, 1, 1, 1, 0, 1, 1, NULL, 1, 1);
INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_ui`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `hinh_anh`, `ma_vi_tri`, `ma_nguoi_dung`) VALUES
(4, 'Closer home!!!!', 4, 2, 2, 2, 'string', 28, 1, 1, 1, 1, 1, 0, 1, 0, NULL, 2, 1),
(5, 'Toàn bộ quê hương phải của Gi ngay trung tâm Cần Thơ', 4, 2, 2, 2, 'string', 25, 1, 1, 1, 1, 1, 0, 1, 0, NULL, 2, 1),
(6, 'Ngôi nhà có hoa, nắng đẹp, trung tâm Cần Thơ', 4, 1, 2, 2, 'string', 21, 1, 1, 1, 1, 1, 1, 1, 0, NULL, 2, 1),
(7, 'Near Hon Chong-Quiet Seaview Studio to beach', 2, 1, 1, 1, 'string', 10, 1, 1, 1, 1, 1, 0, 1, 0, NULL, 3, 1),
(8, 'Tầng 25 Căn hộ 1 phòng ngủ ấm cúng và hiện đại', 4, 1, 2, 1, 'string', 15, 0, 0, 1, 1, 1, 0, 1, 0, NULL, 3, 1),
(9, 'Căn hộ mặt tiền Economy Beach với chế độ ngắm bình minh', 4, 1, 2, 1, 'string', 18, 0, 1, 1, 1, 1, 0, 1, 0, NULL, 3, 1),
(10, 'Hanoi Old Quarter Homestay - Unique Railway View', 2, 1, 1, 1, 'string', 23, 1, 1, 1, 1, 1, 1, 1, 0, NULL, 4, 1),
(11, 'Studio mới, thang máy, Hoàn Kiếm, gần khu phố cổ', 2, 1, 1, 1, 'string', 15, 1, 1, 1, 1, 1, 0, 1, 0, NULL, 4, 1),
(12, 'Fisherman homestay (phòng 2 người - B)', 2, 1, 1, 1, 'string', 15, 1, 1, 1, 1, 1, 0, 1, 1, NULL, 5, 1),
(13, 'Studio mới & ấm cúng | Riverside | Bên cạnh Cầu Hàn', 2, 1, 1, 1, 'string', 13, 0, 1, 1, 1, 1, 0, 1, 0, NULL, 6, 1),
(14, 'Căn hộ hiện đại độc đáo của Scandinavia', 2, 1, 1, 1, 'string', 17, 0, 1, 1, 1, 1, 0, 1, 0, NULL, 7, 1);

INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(1, 'Quận 1', 'Hồ Chí Minh', 'Việt Nam', NULL);
INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(2, 'Cái Răng', 'Cần Thơ', 'Việt Nam', NULL);
INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(3, 'Nha Trang', 'Khánh Hoà', 'Việt Nam', NULL);
INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(4, 'Hoàn Kiếm', 'Hà Nội', 'Việt Nam', NULL),
(5, 'Hải Châu', 'Đà Nẵng', 'Việt Nam', NULL),
(6, 'Langbiang', 'Đà Lạt', 'Việt Nam', NULL),
(7, 'Mũi Né', 'Phan Thiết', 'Việt Nam', NULL);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;