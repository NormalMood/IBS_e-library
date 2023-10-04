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
		  

ALTER TABLE staff
	ADD COLUMN positions_num INT NOT NULL DEFAULT 1;
	
ALTER TABLE staff
	ADD CONSTRAINT fk_positions FOREIGN KEY(positions_num) REFERENCES positions (positions_num);
	
UPDATE staff
 SET positions_num = 2 WHERE staff_num >= 4 AND staff_num <= 6;

UPDATE staff
 SET positions_num = 3 WHERE staff_num IN (7, 8);
 
UPDATE staff
 SET positions_num = 4 WHERE staff_num = 9;
 
UPDATE staff
 SET positions_num = 5 WHERE staff_num = 11;
 
UPDATE staff
 SET positions_num = 6 WHERE staff_num = 10;