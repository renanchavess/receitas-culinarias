CREATE SCHEMA IF NOT EXISTS `receitas_culinarias` ;
USE `receitas_culinarias` ;

CREATE TABLE IF NOT EXISTS `receitas_culinarias`.`usuarios` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '\n',
  `nome` VARCHAR(100) NULL,
  `login` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `criado_em` DATETIME NOT NULL,
  `alterado_em` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC))


CREATE TABLE IF NOT EXISTS `receitas_culinarias`.`categorias` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC))


CREATE TABLE IF NOT EXISTS `receitas_culinarias`.`receitas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_usuarios` INT(10) UNSIGNED NOT NULL,
  `id_categorias` INT(10) UNSIGNED NULL,
  `nome` VARCHAR(45) NULL,
  `tempo_preparo_minutos` INT UNSIGNED NULL,
  `porcoes` INT UNSIGNED NULL,
  `modo_preparo` TEXT NOT NULL,
  `ingredientes` TEXT NULL,
  `criado_em` DATETIME NOT NULL,
  `alterado_em` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_receitas_1_idx` (`id_usuarios` ASC),
  INDEX `fk_receitas_2_idx` (`id_categorias` ASC),
  CONSTRAINT `fk_receitas_1`
    FOREIGN KEY (`id_usuarios`)
    REFERENCES `receitas_culinarias`.`usuarios` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_receitas_2`
    FOREIGN KEY (`id_categorias`)
    REFERENCES `receitas_culinarias`.`categorias` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)

START TRANSACTION;
INSERT INTO `receitas_culinarias`.`categorias` (`nome`) VALUES 
('Bolos e tortas doces'),
('Carnes'),
('Aves'),
('Peixes e frutos do mar'),
('Saladas, molhos e acompanhamentos'),
('Sopas'),
('Massas'),
('Bebidas'),
('Doces e sobremesas'),
('Lanches'),
('Prato Único'),
('Light'),
('Alimentação Saudável');
COMMIT;

