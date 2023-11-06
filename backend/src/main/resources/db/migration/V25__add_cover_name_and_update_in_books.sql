ALTER TABLE books
	ADD COLUMN cover_name VARCHAR(60) NOT NULL DEFAULT '841ecd62-8ce1-4ea4-b3b3-9fe09cd60383.jpg';
	
UPDATE books
 SET cover_name = '8d58438e-38f0-4508-9cae-264d2b0ef9f1.jpg' WHERE books_num = 1;
 
UPDATE books
 SET cover_name = 'd9c51083-3d45-4727-b86d-c497b40617fd.jpg' WHERE books_num = 2;
 
UPDATE books
 SET cover_name = '700c1334-b98f-4252-aba0-2a5034a7e1bc.jpg' WHERE books_num = 3;
 
UPDATE books
 SET cover_name = 'fbb70171-892e-45b0-833d-32c3cff75c80.jpg' WHERE books_num = 4;
 
UPDATE books
 SET cover_name = 'c8454632-d259-4cbf-81f4-5da256144d66.jpg' WHERE books_num = 5;
 
UPDATE books
 SET cover_name = 'bcaf609b-2915-490c-80ce-139589a45c19.jpg' WHERE books_num = 6;
 
UPDATE books
 SET cover_name = 'a2f02e0b-a62b-468e-9b8e-9afefbb0bccc.jpg' WHERE books_num = 7;
 
UPDATE books
 SET cover_name = '1e17c435-31af-4bdd-a334-94c0246618da.jpg' WHERE books_num = 8;
 
UPDATE books
 SET cover_name = '6ac63da0-449d-4a57-b693-c598c7f4af62.jpg' WHERE books_num = 10;