ALTER TABLE staff
    ADD COLUMN role VARCHAR(15) NOT NULL DEFAULT 'USER';

INSERT INTO staff (last_name, first_name, father_name, login, password, role)
VALUES ('Шубин', 'Анатолий', 'Сергеевич', 'asshubin@ibs.ru', '$2a$16$5mU7MvUSf7kNxf/3jSA0GeYeQWRpX9vRc7GVeuxS9ADS3tj15hCIq', 'ADMIN');