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