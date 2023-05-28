CREATE TABLE reviews
(
    PRIMARY KEY (reviews_num),
    reviews_num     BIGSERIAL          NOT NULL,
    staff_num       BIGSERIAL             NOT NULL,
    books_num       BIGSERIAL             NOT NULL,
    stars           SMALLINT             NOT NULL,
    advantages      VARCHAR(150),
    disadvantages   VARCHAR(150),
    comment         VARCHAR(300),
    reviews_date    DATE            NOT NULL,
    CONSTRAINT fk_staff
        FOREIGN KEY (staff_num)
            REFERENCES staff(staff_num),
    CONSTRAINT fk_books
        FOREIGN KEY (books_num)
            REFERENCES books(books_num)
);

INSERT INTO reviews (staff_num, books_num, stars, advantages, disadvantages, comment, reviews_date)
VALUES (1, 1, 5, 'advantage1', 'none', 'heyo', '2022-08-10'),
       (1, 2, 4, 'advantage2', 'dis1', 'hehe', '2022-09-08'),
       (1, 3, 5, 'advantage3', 'none', 'liked MDT-48 effects in the book', '2022-09-08'),
       (11, 5, 5, 'advantage4', 'none', 'kinda reminds me smth', '2022-08-08'),
       (11, 7, 5, 'liked algos', 'can''t remember', 'improved my hard skills', '2022-09-08'),
       (11, 1, 4, 'too many', 'i found', 'changed my mind', '2022-09-08'),
       (2, 1, 4, 'very good', 'there are some', 'i was blown away', '2022-09-08')