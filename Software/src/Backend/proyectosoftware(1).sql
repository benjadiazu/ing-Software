-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-06-2024 a las 07:03:54
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectosoftware`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dieta`
--

CREATE TABLE `dieta` (
  `ID_Dieta` int(11) NOT NULL,
  `Cantidad de Recetas` int(11) NOT NULL,
  `ID_Itinerario` int(11) NOT NULL,
  `Dia` int(2) NOT NULL,
  `Mes` int(2) NOT NULL,
  `Año` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dieta`
--

INSERT INTO `dieta` (`ID_Dieta`, `Cantidad de Recetas`, `ID_Itinerario`, `Dia`, `Mes`, `Año`) VALUES
(10, 3, 1, 5, 5, 2024),
(12, 4, 1, 7, 5, 2024);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dieta_receta`
--

CREATE TABLE `dieta_receta` (
  `ID_DietaReceta` varchar(50) NOT NULL,
  `ID_Dieta` int(11) NOT NULL,
  `Nombre _Receta` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingrediente`
--

CREATE TABLE `ingrediente` (
  `ID_Ingrediente` int(11) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `Ícono` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `itinerario`
--

CREATE TABLE `itinerario` (
  `ID_Itinerario` int(11) NOT NULL,
  `ID_Usuario` int(4) NOT NULL,
  `Presupuesto` int(11) NOT NULL,
  `Fecha de Inicio` date NOT NULL,
  `Fecha de Término` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `itinerario`
--

INSERT INTO `itinerario` (`ID_Itinerario`, `ID_Usuario`, `Presupuesto`, `Fecha de Inicio`, `Fecha de Término`) VALUES
(1, 1, 80000, '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receta`
--

CREATE TABLE `receta` (
  `Nombre` varchar(20) NOT NULL,
  `Descripción` varchar(100) NOT NULL,
  `Imagen` longblob NOT NULL,
  `Preparación` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receta_ingrediente`
--

CREATE TABLE `receta_ingrediente` (
  `ID_Rec_Ing` varchar(30) NOT NULL,
  `Nombre_Receta` varchar(20) NOT NULL,
  `ID_Ingrediente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID_Usuario` int(4) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Contraseña` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID_Usuario`, `Nombre`, `Correo`, `Contraseña`) VALUES
(1, 'Vicente', 'lesos.cl@yahoo.es', '$2b$12$lfewpmySe7fyDjt/g2PXV.T7MIWHi1YxMqfolN8Q7JSOltOULQSY6'),
(2, 'Thomas', 'thomas.molina@andinoapp.cl', '$2b$12$dux9XTkD2vK0qmMyjaTCdurEQK0anXywONnuwTHQzoS/1KoNsiioS');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `dieta`
--
ALTER TABLE `dieta`
  ADD PRIMARY KEY (`ID_Dieta`),
  ADD KEY `FK_ITDIET` (`ID_Itinerario`);

--
-- Indices de la tabla `dieta_receta`
--
ALTER TABLE `dieta_receta`
  ADD PRIMARY KEY (`ID_DietaReceta`),
  ADD KEY `FK_DIETTABLE` (`ID_Dieta`),
  ADD KEY `FK_RECIPETABLE` (`Nombre _Receta`);

--
-- Indices de la tabla `ingrediente`
--
ALTER TABLE `ingrediente`
  ADD PRIMARY KEY (`ID_Ingrediente`),
  ADD UNIQUE KEY `Nombre` (`Nombre`);

--
-- Indices de la tabla `itinerario`
--
ALTER TABLE `itinerario`
  ADD PRIMARY KEY (`ID_Itinerario`),
  ADD KEY `ID_Usuario` (`ID_Usuario`);

--
-- Indices de la tabla `receta`
--
ALTER TABLE `receta`
  ADD PRIMARY KEY (`Nombre`);

--
-- Indices de la tabla `receta_ingrediente`
--
ALTER TABLE `receta_ingrediente`
  ADD PRIMARY KEY (`ID_Rec_Ing`),
  ADD KEY `FK_INGTABLE` (`ID_Ingrediente`),
  ADD KEY `receta_ingrediente_ibfk_1` (`Nombre_Receta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID_Usuario`),
  ADD UNIQUE KEY `Correo` (`Correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `dieta`
--
ALTER TABLE `dieta`
  MODIFY `ID_Dieta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `ingrediente`
--
ALTER TABLE `ingrediente`
  MODIFY `ID_Ingrediente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `itinerario`
--
ALTER TABLE `itinerario`
  MODIFY `ID_Itinerario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID_Usuario` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `dieta`
--
ALTER TABLE `dieta`
  ADD CONSTRAINT `FK_ITDIET` FOREIGN KEY (`ID_Itinerario`) REFERENCES `itinerario` (`ID_Itinerario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `dieta_receta`
--
ALTER TABLE `dieta_receta`
  ADD CONSTRAINT `FK_DIETTABLE` FOREIGN KEY (`ID_Dieta`) REFERENCES `dieta` (`ID_Dieta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_RECIPETABLE` FOREIGN KEY (`Nombre _Receta`) REFERENCES `receta` (`Nombre`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `itinerario`
--
ALTER TABLE `itinerario`
  ADD CONSTRAINT `itinerario_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`ID_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `receta_ingrediente`
--
ALTER TABLE `receta_ingrediente`
  ADD CONSTRAINT `FK_INGTABLE` FOREIGN KEY (`ID_Ingrediente`) REFERENCES `ingrediente` (`ID_Ingrediente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `receta_ingrediente_ibfk_1` FOREIGN KEY (`Nombre_Receta`) REFERENCES `receta` (`Nombre`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
