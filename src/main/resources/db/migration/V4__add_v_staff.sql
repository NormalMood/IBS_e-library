CREATE VIEW v_staff AS
SELECT staff_num, last_name, first_name, father_name, login, password, roles.name as role
FROM staff
         JOIN roles ON staff.roles_num = roles.roles_num