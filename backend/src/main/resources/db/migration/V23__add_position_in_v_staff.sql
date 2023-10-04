DROP VIEW IF EXISTS v_staff;

CREATE VIEW v_staff AS
SELECT 
staff_num, last_name, first_name, 
father_name, login, password, 
roles.name as role, positions.name as position
FROM staff
         JOIN roles ON staff.roles_num = roles.roles_num
		 JOIN positions ON staff.positions_num = positions.positions_num;