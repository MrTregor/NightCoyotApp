-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 05 2022 г., 22:24
-- Версия сервера: 8.0.24
-- Версия PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `bar_app`
--

-- --------------------------------------------------------

--
-- Структура таблицы `big_categories`
--

CREATE TABLE `big_categories` (
  `big_category_id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `big_categories`
--

INSERT INTO `big_categories` (`big_category_id`, `name`) VALUES
(1, 'БЕЗАЛКОГОЛЬНЫЕ НАПИТКИ'),
(2, 'ПИВО'),
(3, 'АЛКОГОЛЬНЫЕ НАПИТКИ'),
(4, 'ВИНО'),
(5, 'АЛКОГОЛЬНЫЕ КОКТЕЙЛИ'),
(6, 'ЗАКУСКИ');

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `category_id` int NOT NULL,
  `big_category_id` int NOT NULL DEFAULT '1',
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`category_id`, `big_category_id`, `name`) VALUES
(1, 1, 'Согревающий чай'),
(2, 1, 'Чай'),
(3, 1, 'Кофе'),
(4, 1, 'Вода'),
(5, 1, 'Сок'),
(6, 1, 'Сок свежевыжатый'),
(7, 1, 'Энергетик'),
(8, 1, 'Безалкогольные коктейли'),
(11, 2, 'Разливное'),
(12, 2, 'Бутылочное'),
(21, 3, 'Водка'),
(22, 3, 'Виски'),
(23, 3, 'Ром'),
(24, 3, 'Джин'),
(25, 3, 'Текила'),
(26, 3, 'Коньяк'),
(27, 3, 'Вермут'),
(28, 3, 'Аперитивы и биттеры'),
(29, 3, 'Настойки'),
(31, 4, 'Белое'),
(32, 4, 'Красное'),
(33, 4, 'Игристое'),
(41, 5, 'На игристом'),
(42, 5, 'Классика'),
(43, 5, 'Автороские коктели'),
(44, 5, 'Шоты'),
(45, 5, 'Микс-дринки'),
(51, 6, 'Холодные закуски'),
(52, 6, 'Горячие закуски'),
(58, 1, '111'),
(59, 1, ''),
(60, 1, '333333333333333'),
(61, 1, '11'),
(62, 1, '22'),
(63, 1, '33'),
(64, 1, '44'),
(65, 1, '55'),
(66, 1, '51'),
(67, 1, '123123123'),
(68, 1, '123123'),
(69, 1, '123'),
(70, 2, 'Бутерброды'),
(71, 6, 'Пельмени');

-- --------------------------------------------------------

--
-- Структура таблицы `events`
--

CREATE TABLE `events` (
  `id` int NOT NULL,
  `date` varchar(10) NOT NULL,
  `time` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `title` text NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `events`
--

INSERT INTO `events` (`id`, `date`, `time`, `title`, `description`, `image`) VALUES
(30, '2022-05-12', NULL, 'ПРЯМАЯ ТРАНСЛЯЦИЯ ЧЕ-2022 БЕЛЬГИЯ и РОССИЯ ФИНАЛЬНЫЙ РАУНД, ГРУППА В', NULL, '/events/XrxZhh81GQZEZnoVm6a8wD2hm2XFSDyYCvojSfDZTnU_iC3CIPaQRvDbfqHhJvUyGhNsnyX5QLlcfZ4JuU03TsGR.jpg'),
(31, '2022-02-23', NULL, 'ПРЯМАЯ ТРАНСЛЯЦИЯ в 22:45 ЛИГИ ЧЕМПИОНОВ 2021 АТЛЕТИКО и ЧЕЛСИ', NULL, '/events/uRBOME4jXvbVbG_Ss7ZHzLiR7-djNiSyTw9BKXC3ramqYKjRm7TvogtMfsXKfW-dP6VuSzcM97pnFkLqrIxT9OAq.jpg'),
(32, '2022-05-19', NULL, 'ПРЯМАЯ ТРАНСЛЯЦИЯ в 22:00 ЧЕ-2022 ИСПАНИЯ и ПОЛЬША ГРУППА Е. 2-Й ТУР', NULL, '/events/iDZjJZCDt4tPmRM1IgjAGF_g8jbAqNxUZpYdD2ATVhh68BgICLzPrmdXht-HDpSvREh9v0YMPkq3-oQ08x3EfAm_.jpg'),
(33, '2022-05-13', NULL, 'ПРЯМАЯ ТРАНСЛЯЦИЯ в 18:25 ПРЕМЬЕР-ЛИГА, РОССИЯ ДИНАМО и СПАРТАК', NULL, '/events/g2q3KB7sUHEy-hZlWk3emM14lQ8oVl2EWciiUGf79f6GURadgPkGRFFPIGZtL4CntX-8ssmcJvziPkcdwnhzYA6l.jpg'),
(34, '2022-05-19', NULL, 'ПРЯМАЯ ТРАНСЛЯЦИЯ в 19:00 ЧЕ-2022 ПОРТУГАЛИЯ и ГЕРМАНИЯ ГРУППА F. 2-Й ТУР', NULL, '/events/81QjUSUVrC46fDeKKnEr76ZmtQ9_hwQIOTDMsqZ8cgWs60AKrfalYFp158PKTWmaXABixNnuDxo4XxyVGP9fAuUr.jpg'),
(35, '2022-05-18', NULL, 'ПРЯМЫЕ ТРАНСЛЯЦИИ ЧМ ПО ХОККЕЮ 2022  в 13:05 ЛАТВИЯ и РОССИЯ', NULL, '/events/Ez4XGklkOH5R3uZgv61bWOzW0G-_IpYblipop_gHnfCCHz4dAo8WqGUpW4KxFJsIVVSsPf8t.jpg'),
(36, '2022-05-18', NULL, 'ПРЯМЫЕ ТРАНСЛЯЦИИ ЧМ ПО ХОККЕЮ 2022  в 17:05 КАНАДА и ГЕРМАНИЯ', NULL, '/events/Ez4XGklkOH5R3uZgv61bWOzW0G-_IpYblipop_gHnfCCHz4dAo8WqGUpW4KxFJsIVVSsPf8t.jpg'),
(37, '2022-05-18', NULL, 'ПРЯМЫЕ ТРАНСЛЯЦИИ ЧМ ПО ХОККЕЮ 2022  в 19:05 ШВЕЦИЯ и ШВЕЙЦАРИЯ', NULL, '/events/Ez4XGklkOH5R3uZgv61bWOzW0G-_IpYblipop_gHnfCCHz4dAo8WqGUpW4KxFJsIVVSsPf8t.jpg'),
(39, '2022-05-19', NULL, 'ПРЯМАЯ ТРАНСЛЯЦИЯ в 19:05 ЧМ ПО ХОККЕЮ 2022 ШВЕЦИЯ и ШВЕЙЦАРИЯ - ГРУППОВОЙ ЭТАП ', NULL, '/events/0mWnEkt1q6Qzs1XgFRPIM3X-vIaQ0z_ulnWgal4DI6vE2XzaRXOFP2ftAD-OoGQTgOckNNIJ.jpg'),
(40, '2022-05-18', NULL, 'ПРЯМАЯ ТРАНСЛЯЦИЯ в 17:05 ЧМ ПО ХОККЕЮ 2022 КАНАДА и ГЕРМАНИЯ - ГРУППОВОЙ ЭТАП ', NULL, '/events/1097DnK_I12HLfYPT6a_fgeyvKo_pqpkhkZz2TBQ4CrV3PN6o09QDwWPm6i-nc7XlWACSCsp.jpg'),
(41, '2022-04-13', NULL, 'КОСМИЧЕСКАЯ НОЧЬ 23:00-04:00', NULL, '/events/eXFEv0WB7dNXo0CRdJ8rLNjQyBMAIAWhvV9Nm6x5DqzKr92VXQb6H8fWmaXe2KWJUt2K3uo8.jpg'),
(42, '2022-04-13', NULL, 'КОСМИЧЕСКАЯ НОЧЬ 23:00-04:00 АКЦИИ ОТ БАРА', NULL, '/events/3tW_N_h0FkXjxjIccE0GtMobxM58gCUKMSZ6gvhtbO2lP6EZdaaUg9S-UnXurMSxBbpMxGPO.jpg'),
(49, '2022-05-12', NULL, 'Прямая трансляция фиксиков', NULL, '1');

-- --------------------------------------------------------

--
-- Структура таблицы `meals`
--

CREATE TABLE `meals` (
  `meal_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `category` int NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `image` text,
  `grams` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `meals`
--

INSERT INTO `meals` (`meal_id`, `name`, `category`, `price`, `image`, `grams`) VALUES
(1, 'Рузская зима (клюква, сок лимона и апельсина, каркаде)', 1, 250, '/meals/0RZKSLIAK.jpg', '500 мл'),
(2, 'Чайный советник  (облепиха, сок лимона и апельсина, мед)', 1, 250, '/meals/1ChSOSLIAM.jpg', '500 мл'),
(3, 'Малиново-имбирный (малина, имбирь, сок лимона, мед, каркаде) ', 1, 250, '/meals/2MMISLMK.jpg', '500 мл'),
(4, 'Ассам (черный чай)', 2, 190, '/meals/3AChCh.jpg', '500 мл'),
(5, 'Эрл-грей (черный чай)', 2, 190, '/meals/4AChCh.jpg', '500 мл'),
(6, 'Сенча (зеленый чай)', 2, 190, '/meals/5SZCh.jpg', '500 мл'),
(7, 'Молочный улун (зеленый чай)', 2, 190, '/meals/6MUZCh.jpg', '500 мл'),
(8, 'Летние травы (травяной чай)', 2, 190, '/meals/7LTTCh.jpg', '500 мл'),
(9, 'Эспрессо', 3, 100, '/meals/8A.jpg', '40 мл'),
(10, 'Американо', 3, 100, '/meals/9A.jpg', '150 мл'),
(11, 'Молоко', 3, 40, '/meals/10M.jpg', '50 мл'),
(12, 'Сироп ', 3, 20, '/meals/11S.jpg', '10 мл'),
(13, 'Ледяная жемчужина б/г ', 4, 180, '/meals/12LJB.jpg', '500 мл'),
(14, 'Нарзан с/г', 4, 190, '/meals/13NS.jpg', '500 мл'),
(15, 'Кока-Кола ', 4, 170, '/meals/14K.jpg', '330 мл'),
(16, 'Швепс', 4, 150, '/meals/15Sh.jpg', '250 мл'),
(17, 'PAGO Яблоко', 5, 180, '/meals/16PY.jpg', '200 мл'),
(18, 'PAGO Вишня', 5, 180, '/meals/17PV.jpg', '200 мл'),
(19, 'PAGO Апельсин', 5, 180, '/meals/18PA.jpg', '200 мл'),
(20, 'PAGO Томат', 5, 180, '/meals/19PT.jpg', '200 мл'),
(21, 'Апельсиновый', 6, 250, '/meals/20A.jpg', '250 мл'),
(22, 'Грейпфртутовый', 6, 250, '/meals/21G.jpg', '250 мл'),
(23, 'Ред Булл', 7, 250, '/meals/22RB.jpg', '250 мл'),
(24, 'Коктейль Айсберг (на основе сока грейпфрута и лимона)', 8, 250, '/meals/23KANOSGIL.jpg', '260 мл'),
(25, 'Коктейль Sunrise (на основе сока апельсина)', 8, 250, '/meals/24KSNOSA.jpg', '280 мл'),
(26, 'Афанасий  в ассотр.', 11, 150, '/meals/25AVA.jpg', '300 мл'),
(27, 'Афанасий  в ассотр.', 11, 190, '/meals/26AVA.jpg', '500 мл'),
(28, 'Гиннес (темное)', 12, 290, '/meals/27GT.jpg', '450 мл'),
(29, 'Боулер (янтарный эль)', 12, 230, '/meals/28BYA.jpg', '500 мл'),
(30, 'Клаусталер                                                                (безалкогольное)', 12, 250, '/meals/29KB.jpg', '330 мл'),
(31, 'Русский стандарт', 21, 130, '/meals/30RS.jpg', '50 мл'),
(32, 'Царская', 21, 150, '/meals/31Z.jpg', '50 мл'),
(33, 'Финляндия', 21, 210, '/meals/32F.jpg', '50 мл'),
(34, 'Тичерс', 22, 270, '/meals/33T.jpg', '50 мл'),
(35, 'Джек Дэниэлс', 22, 350, '/meals/34DD.jpg', '50 мл'),
(36, 'Чивас Ригал 12 лет', 22, 550, '/meals/35ChR1L.jpg', '50мл'),
(37, 'Макаллан 12 лет', 22, 690, '/meals/36M1L.jpg', '50 мл'),
(38, 'Макаллан 18 лет', 22, 1190, '/meals/37M1L.jpg', '50 мл'),
(39, 'Бакарди Карта Бланка', 23, 290, '/meals/38BKB.jpg', '50 мл'),
(40, 'Бакарди Карта Нэгра', 23, 290, '/meals/39BKN.jpg', '50 мл'),
(41, 'Гордонс/Бифитер', 24, 290, '/meals/40G.jpg', '50 мл'),
(42, 'Эсполон Бланко ', 25, 290, '/meals/41AB.jpg', '50 мл'),
(43, 'Метакса 5*', 26, 290, '/meals/42M5.jpg', '50 мл'),
(44, 'Реми Мартан VS', 26, 470, '/meals/43RMV.jpg', '50 мл'),
(45, 'Курвуазье VS', 26, 600, '/meals/44KV.jpg', '50 мл'),
(46, 'Мартини Бьянко', 27, 270, '/meals/45MB.jpg', '100 мл'),
(47, 'Мартини Экстра Драй', 27, 270, '/meals/46MAD.jpg', '100 мл'),
(48, 'Мартини Россо', 27, 270, '/meals/47MR.jpg', '100 мл'),
(49, 'Самбука', 28, 240, '/meals/48S.jpg', '50 мл'),
(50, 'Егермастер', 28, 250, '/meals/49E.jpg', '50 мл'),
(51, 'Абсент Ксента', 28, 350, '/meals/50AK.jpg', '50 мл'),
(52, 'Мятно-лаймовая', 29, 190, '/meals/51M.jpg', '50 мл'),
(53, 'Лимончелло', 29, 190, '/meals/52L.jpg', '50 мл'),
(54, 'На Гибискусе', 29, 190, '/meals/53NG.jpg', '50 мл'),
(55, 'Пино Гриджио (Италия)', 31, 1200, '/meals/54PGI.jpg', '750 мл'),
(56, 'Шираз (Испания)', 32, 1450, '/meals/55ShI.jpg', '750 мл'),
(57, 'Мальбек (Аргентина)', 32, 1550, '/meals/56MA.jpg', '750 мл'),
(58, 'Абрау Дюрсо брют', 33, 240, '/meals/57ADB.jpg', '150 мл'),
(59, 'Чинзано Просекко', 33, 2000, '/meals/58ChP.jpg', '750 мл'),
(60, 'Мартини Асти', 33, 2900, '/meals/59MA.jpg', '750 мл'),
(61, 'Мимоза (апельсиновый фреш, игристое, трипл сек)', 41, 280, '/meals/60MAFITS.jpg', '180 мл'),
(62, 'Аперол спритс                                      (аперол, содовая, игристое)', 41, 350, '/meals/61ASASI.jpg', '180 мл'),
(63, 'Соленый пес (водка, грейпфрутовый фреш, соль)', 42, 290, '/meals/62SPVGFS.jpg', '200 мл'),
(64, 'Космополитен (цитрусовая водка, апельсиновый ликер, клюква, лайм)', 42, 350, '/meals/63KZVALKL.jpg', '120 мл'),
(65, 'Гарибальди (кампари, апельсиновый фреш)', 42, 330, '/meals/64GKAF.jpg', '200 мл'),
(66, 'Негрони (джин, кампари, красный вермут)', 42, 350, '/meals/65NDKKV.jpg', '120 мл'),
(67, 'Белый русский (водка, кофейный ликер, сливки)', 42, 350, '/meals/66BRVKLS.jpg', '120 мл'),
(68, 'Маргарита (текила, апельсиновый ликер, сок лайма, соль)', 42, 350, '/meals/67MTALSLS.jpg', '90 мл'),
(69, 'Мама Люба (персиковый ликер, блю кюрасао, трипл сек)', 43, 300, '/meals/68MLPLBKTS.jpg', '45 мл'),
(70, 'Валера  (мятный ликер, сок лимона, водка)', 43, 310, '/meals/69VMLSLV.jpg', '50 мл'),
(71, 'Девушка созрела (жасминовая водка,   сок лимона, содовая, персиковый ликер)', 43, 310, '/meals/70DSJVSLSPL.jpg', '200 мл'),
(72, 'Ночной койот (водка, сливочный ликер, эспрессо, сливки, сахарный сироп)', 43, 330, '/meals/71NKVSLASSS.jpg', '120 мл'),
(73, 'Крепкий орешек (водка, трипл сек, клюква, сок лимона)', 43, 330, '/meals/72KOVTSKSL.jpg', '110 мл'),
(74, 'Мятный Фриман (водка, содовая, ром, кокосовый ликер, гренадин)', 43, 330, '/meals/73MFVSRKLG.jpg', '170 мл'),
(75, 'Семён Семёныч (мятный ликер, кокосовый ликер,апельсиновый фреш)', 43, 330, '/meals/74SSMLKLF.jpg', '170 мл'),
(76, 'Пчела (кофейный ликер, апельсиновый сок, егермастер)', 44, 270, '/meals/75PKLASE.jpg', '50 мл'),
(77, '18+  (кокосовый ром, светлый ром, карамель)', 44, 270, '/meals/761KRSRK.jpg', '50 мл'),
(78, 'Б-52  (кофейный и сливочный ликеры, трипл сек)', 44, 290, '/meals/77BKISLTS.jpg', '50 мл'),
(79, 'Граната (гренадин,питч,кофейный ликер, абсент)', 44, 290, '/meals/78GGLA.jpg', '50 мл'),
(80, 'Б-53 (кофейный и сливочный ликеры, абсент)', 44, 300, '/meals/79BKISLA.jpg', '50 мл'),
(81, 'Ром с колой', 45, 290, '/meals/80RSK.jpg', '200 мл'),
(82, 'Джин с тоником', 45, 290, '/meals/81DST.jpg', '200 мл'),
(83, 'Виски с колой', 45, 310, '/meals/82VSK.jpg', '200 мл'),
(84, 'Брускетта с томатами и соусом Песто', 51, 140, '/meals/83BSTISP.jpg', '100 гр.'),
(85, 'Сало на ржаных гренках', 51, 200, '/meals/84SNRG.jpg', '100 гр.'),
(86, 'Цезарь с курицей', 51, 320, '/meals/85ZSK.jpg', '220 гр.'),
(87, 'Цезарь с креветками', 51, 350, '/meals/86ZSK.jpg', '190 гр.'),
(88, 'Сырное ассорти с медом', 51, 350, '/meals/87SASM.jpg', '200 гр.'),
(89, 'Хрустящий картофель фри с томатным соусом', 52, 150, '/meals/88HKFSTS.jpg', '200 гр.'),
(90, 'Гренки чесночные с сырным соусом', 52, 150, '/meals/89GChSSS.jpg', '110 гр.'),
(91, 'Луковые колечки с соусом BBQ', 52, 150, '/meals/90LKSSB.jpg', '130 гр.'),
(92, 'Креветки с пикантным соусом', 52, 310, '/meals/91KSPS.jpg', '100 гр.'),
(93, 'Бургер с говядиной и картофелем фри', 52, 350, '/meals/92BSGIKF.jpg', '360 гр.'),
(94, 'Бургер с индейкой и картофелем фри', 52, 350, '/meals/93BSIIKF.jpg', '360 гр.'),
(95, 'Ребрышки свиные BBQ', 52, 470, '/meals/94RSB.jpg', '320 гр.'),
(96, 'Закуска для доброй компании «На троих» (говяжьи колбаски, куриные снеки, луковые кольца)', 52, 700, '/meals/95ZDDK«TGKKSLK.jpg', '800 гр.'),
(164, 'Бутерброд со шпротами', 70, 50, '10', '100'),
(165, 'Пельмени', 71, 150, '1', '100');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `order_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `meal_id` int NOT NULL,
  `status` varchar(100) NOT NULL,
  `order_num` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `meal_id`, `status`, `order_num`) VALUES
(398, NULL, 2, 'completed', 98),
(399, NULL, 2, 'completed', 98),
(400, NULL, 2, 'completed', 98),
(401, NULL, 55, 'completed', 98),
(402, NULL, 69, 'completed', 98),
(403, NULL, 87, 'completed', 98),
(404, NULL, 87, 'completed', 98),
(405, NULL, 31, 'completed', 99),
(406, NULL, 31, 'completed', 99),
(407, NULL, 32, 'completed', 99),
(408, NULL, 55, 'completed', 100),
(409, NULL, 32, 'completed', 101),
(410, NULL, 33, 'completed', 101),
(411, NULL, 61, 'completed', 102),
(412, NULL, 61, 'completed', 102),
(413, NULL, 31, 'completed', 105),
(414, NULL, 31, 'completed', 105),
(415, NULL, 32, 'completed', 105),
(416, NULL, 1, 'completed', 106),
(417, NULL, 31, 'completed', 106),
(418, NULL, 31, 'completed', 107),
(419, NULL, 33, 'completed', 107),
(420, NULL, 1, 'completed', 108),
(421, NULL, 85, 'completed', 108),
(422, NULL, 1, 'completed', 109),
(423, NULL, 1, 'completed', 109),
(424, NULL, 1, 'completed', 109),
(425, NULL, 26, 'completed', 109),
(426, NULL, 26, 'completed', 109),
(427, NULL, 27, 'completed', 109),
(428, 31, 1, 'completed', 110),
(429, 31, 1, 'completed', 110),
(430, 31, 2, 'completed', 110),
(431, 31, 2, 'completed', 110),
(432, 31, 2, 'completed', 110),
(433, 31, 2, 'completed', 110),
(434, 31, 2, 'completed', 110),
(435, 31, 2, 'completed', 110),
(436, 31, 2, 'completed', 110),
(437, 31, 2, 'completed', 110),
(438, 31, 2, 'completed', 110),
(439, 31, 2, 'completed', 110),
(440, 31, 2, 'completed', 110),
(441, 31, 2, 'completed', 110),
(442, 31, 2, 'completed', 110),
(443, 31, 2, 'completed', 110),
(444, 31, 2, 'completed', 110),
(445, 31, 2, 'completed', 110),
(446, 31, 3, 'completed', 110),
(447, 31, 31, 'completed', 111),
(448, 31, 32, 'completed', 111),
(449, 31, 59, 'completed', 112),
(450, 31, 60, 'completed', 112),
(451, 31, 60, 'completed', 112),
(452, 31, 60, 'completed', 112),
(453, 31, 55, 'completed', 113),
(454, 31, 55, 'completed', 113),
(455, 31, 56, 'completed', 113),
(456, 31, 33, 'completed', 114),
(457, 31, 56, 'completed', 115),
(458, 31, 1, 'completed', 116),
(459, 31, 1, 'completed', 116),
(460, 31, 1, 'completed', 116),
(461, 31, 26, 'completed', 117),
(462, 31, 26, 'completed', 117),
(463, 31, 26, 'completed', 117),
(464, 31, 55, 'completed', 118),
(465, 31, 55, 'completed', 118),
(466, 31, 32, 'completed', 119),
(467, 31, 1, 'completed', 120),
(468, 31, 1, 'completed', 120),
(469, 31, 3, 'completed', 120),
(470, 31, 3, 'completed', 120),
(471, 31, 3, 'completed', 120),
(472, 31, 3, 'completed', 120),
(473, 31, 3, 'completed', 120),
(474, 31, 3, 'completed', 120),
(475, 31, 5, 'completed', 120),
(476, 31, 7, 'completed', 120),
(477, 31, 7, 'completed', 120),
(478, 31, 7, 'completed', 120),
(479, 31, 7, 'completed', 120),
(480, 31, 9, 'completed', 120),
(481, 31, 9, 'completed', 120),
(482, 31, 11, 'completed', 120),
(483, 31, 13, 'completed', 120),
(484, 31, 13, 'completed', 120),
(485, 31, 13, 'completed', 120),
(486, 31, 13, 'completed', 120),
(487, 31, 16, 'completed', 120),
(488, 31, 18, 'completed', 120),
(489, 31, 18, 'completed', 120),
(490, 31, 18, 'completed', 120),
(491, 31, 18, 'completed', 120),
(492, 31, 18, 'completed', 120),
(493, 31, 18, 'completed', 120),
(494, 31, 55, 'completed', 0),
(495, 31, 56, 'completed', 0),
(496, 31, 31, 'completed', 1),
(497, 31, 90, 'completed', 2),
(498, 31, 90, 'completed', 2),
(499, 31, 90, 'completed', 2),
(500, 31, 90, 'completed', 2),
(501, 31, 90, 'completed', 2),
(502, 31, 90, 'completed', 2),
(503, 31, 90, 'completed', 2),
(504, 31, 90, 'completed', 2),
(505, 31, 90, 'completed', 2),
(506, 31, 90, 'completed', 2),
(507, 31, 90, 'completed', 2),
(508, 31, 90, 'completed', 2),
(509, 31, 90, 'completed', 2),
(510, 31, 90, 'completed', 2),
(511, 31, 90, 'completed', 2),
(512, 31, 90, 'completed', 2),
(513, 31, 90, 'completed', 2),
(514, 31, 90, 'completed', 2),
(515, 31, 90, 'completed', 2),
(516, 31, 90, 'completed', 2),
(517, 31, 90, 'completed', 2),
(518, 31, 90, 'completed', 2),
(519, 31, 90, 'completed', 2),
(520, 31, 90, 'completed', 2),
(521, 31, 90, 'completed', 2),
(522, 31, 90, 'completed', 2),
(523, 31, 90, 'completed', 2),
(524, 31, 90, 'completed', 2),
(525, 31, 90, 'completed', 2),
(526, 31, 90, 'completed', 2),
(527, 31, 90, 'completed', 2),
(528, 31, 90, 'completed', 2),
(529, 31, 90, 'completed', 2),
(530, 31, 90, 'completed', 2),
(531, 31, 90, 'completed', 2),
(532, 31, 90, 'completed', 2),
(533, 31, 90, 'completed', 2),
(534, 31, 90, 'completed', 2),
(535, 31, 90, 'completed', 2),
(536, 31, 90, 'completed', 2),
(537, 31, 90, 'completed', 2),
(538, 31, 90, 'completed', 2),
(539, 31, 90, 'completed', 2),
(540, 31, 90, 'completed', 2),
(541, 31, 90, 'completed', 2),
(542, 31, 90, 'completed', 2),
(543, 31, 90, 'completed', 2),
(544, 31, 90, 'completed', 2),
(545, 31, 90, 'completed', 2),
(546, 31, 90, 'completed', 2),
(547, 31, 90, 'completed', 2),
(548, 31, 90, 'completed', 2),
(549, 31, 90, 'completed', 2),
(550, 31, 90, 'completed', 2),
(551, 31, 90, 'completed', 2),
(552, 31, 90, 'completed', 2),
(553, 31, 90, 'completed', 2),
(554, 31, 91, 'completed', 2),
(555, 31, 31, 'completed', 3),
(556, 31, 31, 'completed', 3),
(557, 31, 31, 'completed', 3),
(558, 31, 32, 'completed', 3),
(559, 31, 26, 'completed', 4),
(560, 31, 26, 'completed', 4),
(561, NULL, 85, 'completed', 5),
(562, NULL, 31, 'completed', 6),
(563, NULL, 31, 'completed', 7),
(564, NULL, 32, 'completed', 7),
(565, NULL, 61, 'completed', 8),
(566, NULL, 62, 'completed', 8),
(567, NULL, 31, 'completed', 9),
(568, NULL, 32, 'completed', 9),
(569, NULL, 32, 'completed', 9),
(570, NULL, 26, 'completed', 10),
(571, NULL, 26, 'completed', 10),
(572, NULL, 26, 'completed', 10),
(573, NULL, 55, 'completed', 11),
(574, NULL, 55, 'completed', 11),
(575, NULL, 55, 'completed', 11),
(576, NULL, 1, 'completed', 12),
(577, NULL, 1, 'completed', 12),
(578, NULL, 1, 'completed', 12),
(579, NULL, 87, 'completed', 13),
(580, NULL, 89, 'completed', 13),
(581, NULL, 89, 'completed', 13),
(582, NULL, 32, 'completed', 14),
(583, NULL, 32, 'completed', 15),
(584, NULL, 27, 'completed', 16),
(585, NULL, 55, 'completed', 17),
(586, NULL, 55, 'completed', 17),
(587, NULL, 55, 'completed', 17),
(588, NULL, 55, 'completed', 17),
(589, NULL, 86, 'completed', 18),
(590, NULL, 26, 'completed', 19),
(591, NULL, 81, 'completed', 20),
(592, NULL, 62, 'completed', 21),
(593, NULL, 26, 'completed', 22),
(594, NULL, 85, 'completed', 23),
(595, NULL, 85, 'completed', 23),
(596, NULL, 31, 'completed', 24),
(597, NULL, 31, 'completed', 25),
(598, NULL, 31, 'completed', 25),
(599, NULL, 32, 'completed', 25),
(600, NULL, 26, 'completed', 26),
(601, NULL, 27, 'completed', 26),
(602, NULL, 55, 'completed', 27),
(603, NULL, 55, 'completed', 27),
(604, NULL, 27, 'completed', 28),
(605, NULL, 26, 'completed', 29),
(606, NULL, 85, 'completed', 30),
(607, NULL, 1, 'completed', 31),
(608, NULL, 1, 'completed', 31),
(609, NULL, 32, 'completed', 32),
(610, NULL, 32, 'completed', 33),
(611, NULL, 88, 'completed', 33),
(612, NULL, 31, 'completed', 34),
(613, NULL, 32, 'completed', 34),
(614, NULL, 31, 'completed', 35),
(615, NULL, 49, 'completed', 35),
(616, NULL, 51, 'completed', 35),
(617, NULL, 84, 'completed', 36),
(618, NULL, 85, 'completed', 36),
(619, NULL, 1, 'completed', 37),
(620, NULL, 1, 'completed', 37),
(621, NULL, 1, 'completed', 37),
(622, NULL, 26, 'completed', 38),
(623, 24, 26, 'completed', 39),
(624, 24, 1, 'completed', 40),
(625, 24, 1, 'completed', 40),
(626, 24, 1, 'completed', 40),
(627, 24, 85, 'completed', 41),
(628, 24, 85, 'completed', 41),
(629, 24, 85, 'completed', 41),
(630, 24, 86, 'completed', 41),
(631, 24, 86, 'completed', 41),
(632, 24, 88, 'completed', 41),
(633, 24, 90, 'completed', 41),
(634, 24, 32, 'completed', 42),
(635, 32, 26, 'completed', 43),
(636, 32, 27, 'completed', 43),
(637, 32, 28, 'completed', 43),
(638, 32, 29, 'completed', 43),
(639, 32, 30, 'completed', 43),
(640, 32, 84, 'completed', 43),
(641, 32, 85, 'completed', 43),
(642, 32, 86, 'completed', 43),
(643, 32, 87, 'completed', 43),
(644, 32, 88, 'completed', 43),
(645, 32, 89, 'completed', 43),
(646, 32, 90, 'completed', 43),
(647, 32, 91, 'completed', 43),
(648, 32, 92, 'completed', 43),
(649, 32, 93, 'completed', 43),
(650, 32, 94, 'completed', 43),
(651, 32, 95, 'completed', 43),
(652, 32, 96, 'completed', 43),
(653, 32, 26, 'completed', 44),
(654, 32, 26, 'completed', 44),
(655, 32, 29, 'completed', 44),
(656, 32, 29, 'completed', 44),
(657, 32, 29, 'completed', 44),
(658, 32, 30, 'completed', 44),
(659, 32, 55, 'completed', 44),
(660, 32, 55, 'completed', 44),
(661, 32, 56, 'completed', 44),
(662, 32, 31, 'completed', 45),
(663, 32, 31, 'completed', 45),
(664, 32, 31, 'completed', 45),
(665, 32, 31, 'completed', 45),
(666, 32, 32, 'completed', 45),
(667, 32, 63, 'completed', 46),
(668, 32, 31, 'completed', 47),
(669, 32, 31, 'completed', 47),
(670, 32, 31, 'completed', 47),
(671, 32, 31, 'completed', 47),
(672, 32, 32, 'completed', 48),
(673, 32, 84, 'completed', 49),
(674, 32, 85, 'completed', 49),
(675, 32, 31, 'completed', 50),
(676, 32, 32, 'completed', 50),
(677, 32, 55, 'completed', 51),
(678, 32, 55, 'completed', 51),
(679, 32, 55, 'completed', 51),
(680, 32, 55, 'completed', 51),
(681, 32, 55, 'completed', 51),
(682, 32, 55, 'completed', 51),
(683, 32, 55, 'completed', 51),
(684, 32, 31, 'completed', 52),
(685, 32, 31, 'completed', 52),
(686, 32, 31, 'completed', 52),
(687, 32, 31, 'completed', 53),
(688, 32, 32, 'completed', 53),
(689, 32, 61, 'completed', 54),
(690, 32, 62, 'completed', 54),
(691, 32, 59, 'completed', 55),
(692, 32, 60, 'completed', 55),
(693, 32, 31, 'completed', 56),
(694, 32, 32, 'completed', 56),
(695, 32, 1, 'completed', 57),
(696, 32, 2, 'completed', 57),
(697, 32, 3, 'completed', 57),
(698, 32, 4, 'completed', 57),
(699, 32, 5, 'completed', 57),
(700, 32, 7, 'completed', 57),
(701, 32, 9, 'completed', 57),
(702, 32, 31, 'completed', 58),
(703, 32, 27, 'completed', 59),
(704, 32, 84, 'completed', 60),
(705, 32, 85, 'completed', 60),
(706, 32, 1, 'completed', 61),
(707, 32, 26, 'completed', 62),
(708, 32, 31, 'completed', 63),
(709, 32, 55, 'completed', 64),
(710, 32, 56, 'completed', 64),
(711, 32, 1, 'completed', 65),
(712, 32, 1, 'completed', 66),
(713, 32, 1, 'completed', 66),
(714, 32, 1, 'completed', 66),
(715, 32, 1, 'completed', 66),
(716, 32, 63, 'completed', 67),
(717, 32, 31, 'completed', 68),
(718, 32, 1, 'completed', 69),
(719, 32, 1, 'completed', 70),
(720, 32, 2, 'completed', 70),
(721, 32, 31, 'completed', 70),
(722, 32, 26, 'completed', 71),
(723, 32, 61, 'completed', 72),
(724, 32, 85, 'completed', 73),
(725, 32, 32, 'completed', 74),
(726, 32, 31, 'completed', 75),
(727, 32, 32, 'completed', 76),
(728, 32, 85, 'completed', 77),
(729, 32, 85, 'completed', 78),
(730, 32, 31, 'completed', 79),
(731, NULL, 10, 'completed', 80),
(732, NULL, 11, 'completed', 80),
(733, NULL, 12, 'completed', 80),
(734, NULL, 13, 'completed', 80),
(735, NULL, 14, 'completed', 80),
(736, NULL, 15, 'completed', 80),
(737, NULL, 1, 'completed', 81),
(738, NULL, 1, 'completed', 81),
(739, 33, 26, 'completed', 82),
(740, 33, 26, 'completed', 82),
(741, 33, 26, 'completed', 82),
(742, 33, 89, 'completed', 83),
(743, 33, 89, 'completed', 83),
(744, 18, 31, 'completed', 84),
(745, 18, 32, 'completed', 84),
(746, 18, 33, 'completed', 84),
(747, NULL, 26, 'completed', 85),
(748, NULL, 26, 'completed', 85),
(749, NULL, 61, 'completed', 85),
(750, NULL, 65, 'completed', 85),
(751, NULL, 67, 'completed', 85),
(752, NULL, 68, 'completed', 85),
(753, NULL, 69, 'completed', 85),
(754, NULL, 86, 'completed', 85),
(755, NULL, 88, 'completed', 85),
(756, NULL, 89, 'completed', 85),
(757, NULL, 90, 'completed', 85),
(758, NULL, 62, 'completed', 86),
(759, NULL, 62, 'completed', 86),
(760, NULL, 85, 'completed', 86),
(761, NULL, 85, 'completed', 86),
(762, NULL, 85, 'completed', 86),
(763, NULL, 86, 'completed', 86),
(764, NULL, 87, 'completed', 86),
(765, NULL, 26, 'completed', 87),
(766, NULL, 26, 'completed', 87),
(767, NULL, 31, 'completed', 88),
(768, 35, 55, 'completed', 89),
(769, 35, 57, 'completed', 89),
(770, NULL, 26, 'completed', 90),
(771, NULL, 1, 'completed', 91),
(772, NULL, 1, 'completed', 91),
(773, NULL, 96, 'completed', 92),
(774, NULL, 96, 'completed', 92),
(775, NULL, 31, 'completed', 93),
(776, NULL, 31, 'completed', 93),
(777, NULL, 31, 'completed', 93),
(778, NULL, 26, 'completed', 94),
(779, 36, 26, 'completed', 95),
(780, 36, 26, 'completed', 95),
(781, 36, 26, 'completed', 95),
(782, 36, 26, 'completed', 96),
(783, 36, 26, 'completed', 96),
(784, 36, 55, 'completed', 97),
(785, 36, 31, 'completed', 98),
(786, 36, 32, 'completed', 98),
(787, 36, 29, 'completed', 99),
(788, 36, 30, 'completed', 99),
(789, 36, 31, 'completed', 1),
(790, 36, 31, 'completed', 1),
(791, 36, 31, 'completed', 1),
(792, 36, 32, 'completed', 1),
(793, NULL, 1, 'completed', 2),
(794, NULL, 2, 'completed', 2),
(795, 37, 26, 'completed', 3),
(796, 37, 55, 'completed', 3),
(797, 37, 26, 'completed', 4),
(798, NULL, 4, 'completed', 5),
(799, NULL, 4, 'completed', 5),
(800, NULL, 4, 'completed', 5),
(801, NULL, 4, 'completed', 5),
(802, NULL, 4, 'completed', 5),
(803, NULL, 4, 'completed', 5),
(804, NULL, 4, 'completed', 5),
(805, NULL, 4, 'completed', 5),
(806, NULL, 4, 'completed', 5),
(807, NULL, 4, 'completed', 5),
(808, NULL, 6, 'completed', 5),
(809, NULL, 6, 'completed', 5),
(810, NULL, 6, 'completed', 5),
(811, NULL, 28, 'completed', 5),
(812, NULL, 28, 'completed', 5),
(813, NULL, 28, 'completed', 5),
(814, NULL, 28, 'completed', 5),
(815, NULL, 28, 'completed', 5),
(816, NULL, 26, 'completed', 6),
(817, 38, 76, 'completed', 7),
(818, 38, 76, 'completed', 7);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `fname` text,
  `sname` text,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pass` varchar(255) NOT NULL,
  `phone` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'user',
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bonus_points` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `fname`, `sname`, `email`, `pass`, `phone`, `role`, `register_date`, `last_login_date`, `bonus_points`) VALUES
(18, '2', '1', '3@3', 'eccbc87e4b5ce2fe28308fd9f2a7baf3', '+7(555) 555-5555', 'admin', '2021-11-17 16:12:25', '2021-11-17 16:12:25', 3),
(20, '2', '2', '2@2', 'c81e728d9d4c2f636f067f89cc14862c', '+7(222) 222-2222', 'user', '2021-11-17 18:49:05', '2021-11-17 18:49:05', 0),
(21, '4', '4', '4@4', 'a87ff679a2f3e71d9181a67b7542122c', '+7(444) 444-4444', 'cooker', '2021-11-18 21:00:33', '2021-11-18 21:00:33', 0),
(22, '11', '11', '5@5', 'e4da3b7fbbce2345d7772b0674a318d5', '+7(555) 555-5555', 'user', '2021-12-20 19:29:03', '2021-12-20 19:29:03', 0),
(24, '11', '1', '1@1', 'c4ca4238a0b923820dcc509a6f75849b', '+7(111) 111-1111', 'user', '2022-03-16 15:14:31', '2022-03-16 15:14:31', 12),
(31, 'Виктор', 'Кузнецов', 'kuznez@mail.ru', 'ad0951a90132f9a401a1f1e308165713', '+7(891) 128-6689', 'user', '2022-04-15 10:54:03', '2022-04-15 10:54:03', 65),
(32, 'Иннокентий', 'Скуратов', 'innokentiy25@mail.ru', '6925f5a4a692a7d97dfef1a09ff1e581', '+7(978) 354-5435', 'user', '2022-04-26 07:59:19', '2022-04-26 07:59:19', 279),
(33, 'Александра', 'Актжанова', 'aleksandra8813@rambler.ru', '3ca919eb87283fb34d5aa0dfd1eb9e46', '+7(930) 595-4882', 'user', '2022-04-29 09:54:35', '2022-04-29 09:54:35', 5),
(34, 'Инна', 'Трапезникова', '355@55', '202cb962ac59075b964b07152d234b70', '+7(712) 312-3123', 'user', '2022-06-13 19:53:09', '2022-06-13 19:53:09', 0),
(35, 'Алиса', 'Арданкина', 'alisa67@gmail.com', '2bdbdcad065dc438dd710f07c89b0dc8', '+7(949) 894-6937', 'user', '2022-06-14 10:30:51', '2022-06-14 10:30:51', 2),
(36, '2', '1', '33@33', '182be0c5cdcd5072bb1864cdee4d3d6e', '+7(333) 333-3333', 'user', '2022-06-15 13:03:13', '2022-06-15 13:03:13', 9),
(37, 'Егор', 'Гордейчик', 'egor@mail.ru', '202cb962ac59075b964b07152d234b70', '+7(928) 822-7756', 'user', '2022-06-16 15:12:43', '2022-06-16 15:12:43', 1),
(38, 'Егор', 'Гордейчик', 'cool_proger@mail.com', '202cb962ac59075b964b07152d234b70', '+7(972) 726-5252', 'user', '2022-06-17 11:00:35', '2022-06-17 11:00:35', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `variables`
--

CREATE TABLE `variables` (
  `name` varchar(100) NOT NULL,
  `value` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `variables`
--

INSERT INTO `variables` (`name`, `value`) VALUES
('orderNum', 8);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `big_categories`
--
ALTER TABLE `big_categories`
  ADD PRIMARY KEY (`big_category_id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `big_category_id` (`big_category_id`);

--
-- Индексы таблицы `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`meal_id`),
  ADD KEY `category` (`category`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `meal_id` (`meal_id`),
  ADD KEY `status` (`status`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `big_categories`
--
ALTER TABLE `big_categories`
  MODIFY `big_category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT для таблицы `events`
--
ALTER TABLE `events`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT для таблицы `meals`
--
ALTER TABLE `meals`
  MODIFY `meal_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=819;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
