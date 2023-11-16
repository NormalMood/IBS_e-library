CREATE VIEW v_reviews AS 
SELECT 
reviews_num, reviews.staff_num, books_num, 
staff.last_name, staff.first_name, staff.picture_name, 
comment, stars, reviews_date 
FROM reviews 
JOIN staff 
ON reviews.staff_num = staff.staff_num;