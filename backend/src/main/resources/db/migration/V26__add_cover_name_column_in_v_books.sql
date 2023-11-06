DROP VIEW IF EXISTS v_admin_bin_expired_status;
DROP VIEW IF EXISTS v_employee_bin;
DROP VIEW IF EXISTS v_admin_detailed_history;
DROP VIEW IF EXISTS v_history_detailed;
DROP VIEW IF EXISTS v_books;
DROP VIEW IF EXISTS v_average_ratings;

CREATE VIEW v_average_ratings AS
SELECT books.books_num                                             AS book_id,
       CASE WHEN (SELECT COUNT(*) > 0
                    FROM reviews
                    WHERE
                    books.books_num = reviews.books_num) = 'true'
       THEN
       AVG(reviews.stars)::NUMERIC(2, 1)::float
       ELSE
       0 END                                             AS average_rating
FROM books
          LEFT JOIN reviews ON books.books_num = reviews.books_num
GROUP BY books.books_num;

CREATE VIEW v_books AS
SELECT books_genres.books_num                                                 AS id,
       books.title,
       CONCAT(books.last_name, ' ', books.first_name, ' ', books.father_name) AS author,
       STRING_AGG(genres.name, ', ')                                          AS genres,
       v_average_ratings.average_rating                                       AS average_rating,
       providers.name                                                         AS provider,
       statuses.name                                                          AS status,
       books.cover_name
FROM books_genres
         JOIN books ON books_genres.books_num = books.books_num
         JOIN genres ON books_genres.genres_num = genres.genres_num
         JOIN providers ON books.providers_num = providers.providers_num
         JOIN statuses ON books.statuses_num = statuses.statuses_num
         JOIN v_average_ratings ON books.books_num = v_average_ratings.book_id
GROUP BY id, title, author, average_rating, provider, status, cover_name;

DROP VIEW IF EXISTS v_genres;

CREATE VIEW v_genres AS
SELECT genres.genres_num AS id, genres.name AS genre
FROM genres
ORDER BY genre ASC;

CREATE VIEW v_history_detailed AS
SELECT history.history_num                                                          AS history_id,
       history.staff_num                                                            AS employee_id,
       TRIM(CONCAT(staff.last_name, ' ', staff.first_name, ' ', staff.father_name)) AS employee_fullname,
       history.books_num                                                            AS book_id,
       v_books.title,
       v_books.author,
       v_books.genres,
       history.actions_num,
       actions.name                                                                 AS actions_name,
       history.actions_date
FROM history
         JOIN v_books
              ON history.books_num = v_books.id
         JOIN staff
              ON history.staff_num = staff.staff_num
         JOIN actions
              ON history.actions_num = actions.actions_num
ORDER BY history_id ASC;

CREATE VIEW v_employee_bin AS
SELECT history_id AS bin_id,
       employee_id,
       book_id,
       title,
       author,
       genres,
       actions_name,
       v_history_detailed.actions_date,
       history.return_date
FROM v_history_detailed
JOIN history
ON v_history_detailed.history_id = history.history_num
WHERE history_id IN (SELECT MAX(history_num)
                     FROM history
                     GROUP BY books_num)
  AND v_history_detailed.actions_num IN (1, 3);

CREATE VIEW v_admin_detailed_history AS
SELECT history_id,
       employee_id,
       employee_fullname,
       book_id,
       title,
       author,
       actions_name,
       actions_date
FROM v_history_detailed;

CREATE VIEW v_admin_bin_expired_status AS
SELECT bin_id,
       employee_id,
       TRIM(CONCAT(staff.last_name, ' ', staff.first_name, ' ', staff.father_name)) employee_fullname,
       book_id,
       title,
       author,
       actions_name,
       actions_date,
       return_date,
       DATE(now()) > return_date AS                                                 return_date_expired
FROM v_employee_bin
         JOIN staff ON employee_id = staff.staff_num
ORDER BY bin_id ASC;
