ALTER TABLE staff
	ADD COLUMN positions_num INT NOT NULL DEFAULT 1;
	
ALTER TABLE staff
	ADD CONSTRAINT fk_positions FOREIGN KEY(positions_num) REFERENCES positions (positions_num);