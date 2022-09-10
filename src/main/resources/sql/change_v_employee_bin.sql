DROP VIEW IF EXISTS v_admin_bin_expired_status;
DROP VIEW IF EXISTS v_employee_bin;

CREATE VIEW v_employee_bin AS
SELECT history_id AS bin_id,
       employee_id,
       book_id,
       title,
       author,
       genres,
       actions_name,
       actions_date,
       DATE(
               CASE
                   WHEN actions_num = 1 THEN actions_date + INTERVAL '1 month'
                   WHEN actions_num = 3 THEN actions_date + INTERVAL '14 day'
                   END
           )      AS return_date
FROM v_history_detailed
WHERE history_id IN (SELECT MAX(history_id)
                     FROM v_history_detailed
                     GROUP BY book_id)
  AND actions_num IN (1, 3);

CREATE VIEW v_admin_bin_expired_status AS
SELECT bin_id,
       employee_id,
       CONCAT(staff.last_name, ' ', staff.first_name, ' ', staff.father_name) employee_fullname,
       book_id,
       title,
       author,
       actions_name,
       actions_date,
       return_date,
       DATE(now()) > return_date AS                                           return_date_expired
FROM v_employee_bin
         JOIN staff ON employee_id = staff.staff_num
ORDER BY bin_id ASC;
