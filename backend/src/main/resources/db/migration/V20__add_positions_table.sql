DROP TABLE IF EXISTS positions;

CREATE TABLE positions
(
	PRIMARY KEY(positions_num),
	positions_num SERIAL      NOT NULL,
	name		  VARCHAR(60) NOT NULL
);

INSERT INTO positions(name)
	VALUES('frontend - разработчик'),
		  ('backend - разработчик'),
		  ('тестировщик'),
		  ('ui/ux дизайнер'),
		  ('администратор баз данных'),
		  ('аналитик');
		  