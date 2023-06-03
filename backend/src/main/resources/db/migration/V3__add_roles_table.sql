DROP TABLE IF EXISTS roles;

CREATE TABLE roles
(
    PRIMARY KEY (roles_num),
    roles_num SMALLSERIAL      NOT NULL,
    name      VARCHAR(15) NOT NULL
);

INSERT INTO roles(name)
VALUES ('ADMIN'),
       ('USER');

ALTER TABLE staff
    DROP COLUMN IF EXISTS role;

ALTER TABLE staff
    ADD COLUMN roles_num INT NOT NULL DEFAULT 2;

ALTER TABLE staff
    ADD CONSTRAINT fk_roles FOREIGN KEY (roles_num) REFERENCES roles (roles_num);

UPDATE staff
SET roles_num = 1 WHERE staff_num = 11