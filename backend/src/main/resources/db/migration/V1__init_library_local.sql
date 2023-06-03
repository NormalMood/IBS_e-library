CREATE TABLE staff
(
    PRIMARY KEY (staff_num),
    staff_num   BIGSERIAL       NOT NULL,
    last_name   VARCHAR(40)  NOT NULL,
    first_name  VARCHAR(30)  NOT NULL,
    father_name VARCHAR(40),
    login       VARCHAR(50)  NOT NULL,
    password    VARCHAR(255) NOT NULL
);

INSERT INTO staff (last_name, first_name, father_name, login, password)
VALUES ('Венедиктов', 'Юрий', 'Михайлович', 'ymvenediktov@ibs.ru', '$2a$16$/fz.0agMpnnPXRmF7WXy2ub/SogD76i1CPQVWodM/DkGDsoC8nxCq'),
       ('Шингаряев', 'Петр', 'Евгеньевич', 'peshingaryaev@ibs.ru', '$2a$16$FU0tydeJKJChEHIn4Inw4u6GRaQOGNrnD6jZAs/roDtyGCvHRqgFm'),
       ('Шепелева', 'Ольга', 'Владимировна', 'ovshepeleva@ibs.ru', '$2a$16$x92vCzNf0Hrmgkf08/jqsehLA2UlvrURRB/rBxGg2FZdSrlahRjAm'),
       ('Карамзина', 'Юлия', 'Александровна', 'yakaramzina@ibs.ru', '$2a$16$QIDkEPCoYm7nvSPWsraY5.kfBGa6UkNCIVHKftHl13PFlul1pa5FO'),
       ('Пастухов', 'Олег', 'Дмитриевич', 'odpastukhov@ibs.ru', '$2a$16$uaVfR6WeaihlxmCyLBCh1uxpuR4uNDa04THh5mM1eu.E13dhdabHK'),
       ('Колпаков', 'Николай', 'Федорович', 'nfkolpakov@ibs.ru', '$2a$16$Rj6TDru5AAbgXJ3ivml24OXrMyxRipkmpVZfUzjFE0ijA8AA3fUX6'),
       ('Гостюхина', 'Олеся', 'Евгеньевна', 'oegostyukhina@ibs.ru', '$2a$16$ByAjHx9tfa9obO5/iG5he.prp9YjP7SOCZubgDRcuuMhqy98D.lei'),
       ('Мелкозеров', 'Вадим', 'Анатольевич', 'vamelkozerov@ibs.ru', '$2a$16$lErZejYNq3Q2pZxOXYf1V.jFu5DRlxjVM0E281QtZuDvAMojUeCNq'),
       ('Рябов', 'Михаил', 'Сергеевич', 'msryabov@ibs.ru', '$2a$16$sXKZocv4cU/UWEkqQxNLVeglOMGeKomXj2AOILnqXUx1yZ1ZH4jW6'),
       ('Безенцев', 'Артем', 'Викторович', 'avbezentsev@ibs.ru', '$2a$16$7fYD4v4OB2Cv6SxHG5vNi.d065FDk20nqIj/C0X9hUYIRh.onWU82');

CREATE TABLE actions
(
    PRIMARY KEY (actions_num),
    actions_num SMALLSERIAL      NOT NULL,
    name        VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO actions (name)
VALUES ('взять'),
       ('вернуть'),
       ('продлить');

CREATE TABLE providers
(
    PRIMARY KEY (providers_num),
    providers_num SMALLSERIAL      NOT NULL,
    name          VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO providers (name)
VALUES ('IBS'),
       ('user');

CREATE TABLE statuses
(
    PRIMARY KEY (statuses_num),
    statuses_num SMALLSERIAL      NOT NULL,
    name         VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO statuses (name)
VALUES ('В наличии'),
       ('Взята в пользование'),
       ('Изъята из библиотеки'),
       ('Утеряна');

CREATE TABLE genres
(
    PRIMARY KEY (genres_num),
    genres_num SMALLSERIAL      NOT NULL,
    name       VARCHAR(40) NOT NULL UNIQUE
);

INSERT INTO genres(name)
VALUES ('Литература по саморазвитию'),
       ('Фантастика'),
       ('Приключения'),
       ('Роман'),
       ('Научная книга'),
       ('Русская литература'),
       ('Зарубежная литература'),
       ('Техника');

CREATE TABLE books
(
    PRIMARY KEY (books_num),
    books_num     BIGSERIAL      NOT NULL,
    title         VARCHAR(70) NOT NULL,
    last_name     VARCHAR(40) NOT NULL,
    first_name    VARCHAR(30) NOT NULL,
    father_name   VARCHAR(40),
    providers_num SMALLSERIAL         NOT NULL,
    statuses_num  SMALLSERIAL         NOT NULL,
    CONSTRAINT fk_providers
        FOREIGN KEY (providers_num)
            REFERENCES providers (providers_num),
    CONSTRAINT fk_statuses
        FOREIGN KEY (statuses_num)
            REFERENCES statuses (statuses_num)
);

INSERT INTO books (title, last_name, first_name, father_name, providers_num, statuses_num)
VALUES ('Совершенный код', 'Макконнелл', 'Стив', '', 1, 1),
       ('Getting Things Done: The Art of Stress-free Productivity', 'Allen', 'David', '', 1, 1),
       ('Области тьмы', 'Глинн', 'Алан', '', 1, 1),
       ('Герой нашего времени', 'Лермонтов', 'Михаил', 'Юрьевич', 1, 1),
       ('1984', 'Оруэлл', 'Джордж', '', 1, 1),
       ('Цветы для Элджернона', 'Киз', 'Дениэл', '', 1, 1),
       ('Грокаем алгоритмы', 'Бхаргава', 'Адитья', '', 2, 1),
       ('Алгоритмы шифрования. Специальный справочник', 'Панасенко', 'Сергей', 'Петрович', 2, 1),
       ('Портрет Дориана Грея', 'Уайльд', 'Оскар', '', 2, 1),
       ('Рождение Стальной Крысы', 'Гаррисон', 'Гарри', '', 2, 1);

CREATE TABLE books_genres
(
    PRIMARY KEY (books_genres_num),
    books_genres_num BIGSERIAL NOT NULL,
    books_num        BIGSERIAL    NOT NULL,
    genres_num       SMALLSERIAL    NOT NULL,
    CONSTRAINT fk_books
        FOREIGN KEY (books_num)
            REFERENCES books (books_num),
    CONSTRAINT fk_genres
        FOREIGN KEY (genres_num)
            REFERENCES genres (genres_num)
);

INSERT INTO books_genres (books_num, genres_num)
VALUES (1, 7),
       (1, 8),
       (2, 1),
       (2, 7),
       (3, 2),
       (3, 4),
       (3, 7),
       (4, 4),
       (4, 6),
       (5, 2),
       (5, 7),
       (6, 2),
       (6, 4),
       (6, 7),
       (7, 7),
       (7, 8),
       (8, 7),
       (8, 8),
       (9, 4),
       (9, 7),
       (10, 2),
       (10, 3),
       (10, 7);

CREATE TABLE history
(
    PRIMARY KEY (history_num),
    history_num  BIGSERIAL NOT NULL,
    staff_num    BIGSERIAL    NOT NULL,
    books_num    BIGSERIAL    NOT NULL,
    actions_num  SMALLSERIAL    NOT NULL,
    actions_date DATE   NOT NULL,
    CONSTRAINT fk_staff
        FOREIGN KEY (staff_num)
            REFERENCES staff (staff_num),
    CONSTRAINT fk_books
        FOREIGN KEY (books_num)
            REFERENCES books (books_num),
    CONSTRAINT fk_actions
        FOREIGN KEY (actions_num)
            REFERENCES actions (actions_num)
)
