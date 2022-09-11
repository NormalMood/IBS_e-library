
# E-library for IBS
This is a demo backend project for [ООО "ИБС Пермь"](https://ibs.ru/career/region/perm/)
The application allows you to checkout, extend and return books. Only employees of the company can sign in via a corporate e-mail and a password. Employee sees checkouted books at his cart. Also any user can search and sort books by a few parameters, add books, add genres for books, add a review of a book, get all reviews on a certain book and know the date of returning his books. Admin is able to look at the history and expired statuses. For getting information from the database pagination is available. All names, e-mails, passwords in this work are fictitious. Any resemblance to real persons, living or dead, is purely coincidental.

# Authorization
**BasicAuth**

# APIs
### Show books at user's cart
* **URL**
   /api/user/bin/data
* **Method**
   `GET`
* **URL Params**
   **Required:**
   `page=[integer]`
   `results=[integer]`
   page - number of page (0 is the first page)
   results - amount of elements per page
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "fullName":"Венедиктов Юрий Михайлович",
	   "books":[
		   {
			   "bookId":1,
			   "title":"Совершенный код",
			   "author":"Макконнелл Стив ",
			   "genres":"Зарубежная литература, Техника",
			   "actionsName":"взять",
			   "actionsDate":"2022-06-30",
			   "returnDate":"2022-07-30"
			},
			{
				"bookId":2,
				"title":"Getting Things Done: The Art of Stress-free Productivity",
				"author":"Allen David ",
				"genres":"Литература по саморазвитию, Зарубежная литература",
				"actionsName":"взять",
				"actionsDate":"2022-07-21",
				"returnDate":"2022-08-21"
			}
		],
		"pages":1
	}
   
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
   * 
      ```json
      {
	      "timestamp":"2022-09-10T18:00:05.213+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/user/bin/data"
	  }
	  ```
 
 **OR**
  * **Code:** 401 UNAUTHORIZED
 **OR**
  * **Code:** 404 NOT FOUND
  * **Content:** 
	  ```json
	  {
		  "timestamp":"2022-09-10T18:09:07.737+00:00",
		  "status":404,
		  "error":"Not Found",
		  "path":"/api/user/bin/dat"
	  }
```

* **Sample**
   `/api/user/bin/data?page=0&results=10`

### Return books
* **URL**
   /api/user/bin/return
* **Method**
   `POST`
* **URL Params**
   None
* **Body:**
   ```json
   [
	    [integer],
	    [integer]
   ]
   ```
   `[integer]` - id of a book
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
    {
	   "message":"Books were returned successfully",
	   "status":"OK",
	   "code":200
    }
   
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T18:14:13.156+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/user/bin/return"
	  }
	  ```
    **OR**
   * **Code:** 401 UNAUTHORIZED
    **OR**
    * **Code:** 404 NOT FOUND
    * **Content:** 
    ```json
    {
	    "timestamp":"2022-09-10T18:14:53.853+00:00",
	    "status":404,
	    "error":"Not Found",
	    "path":"/api/user/bin/retur"
	}
	```
* **Sample**
   `/api/user/bin/return`
   ```json
   [
		8,
		9
   ]
   ```

### Extend books
* **URL**
   /api/user/bin/extend
* **Method**
   `POST`
* **URL Params**
   None
* **Body**
   ```json
   [
	   [integer],
	   [integer]
   ]
	```
    `[integer]` - id of a book
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "message":"Return date was successfully extended",
	   "status":"OK",
	   "code":200
   }
   
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T18:21:04.577+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/user/bin/extend"
	  }
	  ```
   **OR**
   * **Code:** 401 UNAUTHORIZED
   **OR**
   * **Code:** 404 NOT FOUND
   * **Content:**
	```json
	 {
		 "timestamp":"2022-09-10T18:22:47.905+00:00",
		 "status":404,
		 "error":"Not Found",
		 "path":"/api/user/bin/exten"
	 }
	```
* **Sample**
   `/api/user/bin/extend`
   ```json
   [
	   8,
	   9
   ]
	```

### Get all books from the library
* **URL**
   /api/user/library/all
* **Method**
   `GET`
* **URL Params**
   **Required:**
   `page=[integer]`
   `results=[integer]`
   page - number of page (0 is the first page)
   results - amount of elements per page
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "objects":[
		   {
			   "id":1,
			   "title":"Совершенный код",
			   "author":"Макконнелл Стив ",
			   "genres":"Зарубежная литература, Техника",
			   "averageRating":"4.3",
			   "provider":"IBS",
			   "status":"Взята в пользование"
		   },
		   {
			   "id":2,
			   "title":"Getting Things Done: The Art of Stress-free Productivity",
			   "author":"Allen David ",
			   "genres":"Литература по саморазвитию, Зарубежная литература",
			   "averageRating":"4.0",
			   "provider":"IBS",
			   "status":"Взята в пользование"
		   },
		   {
			   "id":3,
			   "title":"Области тьмы",
			   "author":"Глинн Алан ",
			   "genres":"Фантастика, Роман, Зарубежная литература",
			   "averageRating":"5.0",
			   "provider":"IBS",
			   "status":"В наличии"
		   },
		   {
			   "id":4,
			   "title":"Герой нашего времени",
			   "author":"Лермонтов Михаил Юрьевич",
			   "genres":"Роман, Русская литература",
			   "averageRating":"Нет оценок",
			   "provider":"IBS",
			   "status":"В наличии"
		   },
		   {
			   "id":5,
			   "title":"1984",
			   "author":"Оруэлл Джордж ",
			   "genres":"Фантастика, Зарубежная литература",
			   "averageRating":"4.5",
			   "provider":"IBS",
			   "status":"В наличии"
		   },
		   {
			   "id":6,
			   "title":"Цветы для Элджернона",
			   "author":"Киз Дениэл ",
			   "genres":"Фантастика, Роман, Зарубежная литература",
			   "averageRating":"Нет оценок",
			   "provider":"IBS",
			   "status":"В наличии"
		   },
		   {
			   "id":7,
			   "title":"Грокаем алгоритмы",
			   "author":"Бхаргава Адитья ",
			   "genres":"Зарубежная литература, Техника",
			   "averageRating":"5.0",
			   "provider":"employee",
			   "status":"В наличии"
		   },
		   {
			   "id":8,
			   "title":"Алгоритмы шифрования. Специальный справочник",
			   "author":"Панасенко Сергей Петрович",
			   "genres":"Зарубежная литература, Техника",
			   "averageRating":"Нет оценок",
			   "provider":"employee",
			   "status":"В наличии"
		   },
		   {
			   "id":9,
			   "title":"Портрет Дориана Грея",
			   "author":"Уайльд Оскар ",
			   "genres":"Роман, Зарубежная литература",
			   "averageRating":"Нет оценок",
			   "provider":"employee",
			   "status":"Взята в пользование"
		   },
		   {
			   "id":10,
			   "title":"Рождение Стальной Крысы",
			   "author":"Гаррисон Гарри ",
			   "genres":"Фантастика, Приключения, Зарубежная литература",
			   "averageRating":"Нет оценок",
			   "provider":"employee",
			   "status":"В наличии"
		   }
		],
		"pages":1
	}
   
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
     **OR**
      ```json
      {
	      "timestamp":"2022-09-10T18:34:03.858+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/user/library/all"
	  }
	  ```
   * **Code:** 401 UNAUTHORIZED
    **OR**
   * **Code:** 404 NOT FOUND
   * **Content:**
	```json
   {
	   "timestamp":"2022-09-10T18:34:39.965+00:00",
	   "status":404,
	   "error":"Not Found",
	   "path":"/api/user/librar/all"
   }
	```
* **Sample**
   `http://localhost:8080/api/user/library/all?page=0&results=10`

### Search books by a certain parameter
* **URL**
   /api/user/library/search
* **Method**
   `GET`
* **URL Params**
   **Required:**
   `page=[integer]`
   `results=[integer]`
   page - number of page (0 is the first page)
   results - amount of elements per page
* **Body**
   ```json
   {
		"parameterName": "",
		"parameterValue": ""
   }
   ```
    "parameterName": "title", "author", "genres", "provider" or "status"
    "parameterValue": any string you want to search
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "objects":[
		   {
			   "id":1,
			   "title":"Совершенный код",
			   "author":"Макконнелл Стив ",
			   "genres":"Зарубежная литература, Техника",
			   "averageRating":"4.3",
			   "provider":"IBS",
			   "status":"Взята в пользование"
		   },
		   {
			   "id":4,
			   "title":"Герой нашего времени",
			   "author":"Лермонтов Михаил Юрьевич",
			   "genres":"Роман, Русская литература",
			   "averageRating":"Нет оценок",
			   "provider":"IBS",
			   "status":"В наличии"
		   },
		   {
			   "id":6,
			   "title":"Цветы для Элджернона",
			   "author":"Киз Дениэл ",
			   "genres":"Фантастика, Роман, Зарубежная литература",
			   "averageRating":"Нет оценок",
			   "provider":"IBS",
			   "status":"В наличии"
		   },
		   {
			   "id":8,
			   "title":"Алгоритмы шифрования. Специальный справочник",
			   "author":"Панасенко Сергей Петрович",
			   "genres":"Зарубежная литература, Техника",
			   "averageRating":"Нет оценок",
			   "provider":"employee",
			   "status":"В наличии"
		   }
		],
		"pages":1
	}
   
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T18:59:39.237+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/user/library/search"
	  }
	  ```
  * **Code:** 401 UNAUTHORIZED
     **OR**
  * **Code:** 404 NOT FOUND
  * **Content:** 
     ```json
     {
	     "timestamp":"2022-09-10T19:00:20.491+00:00",
	     "status":404,
	     "error":"Not Found",
	     "path":"/api/user/library/searh"
	 }
	 ```
* **Sample**
   `/api/user/library/search?page=0&results=10`
    ```json
    {
	    "parameterName": "title",
	    "parameterValue": "в"
    }
	```

### Get all books sorted by a certain parameter in certain order (ASC, DESC)
* **URL**
   /api/user/library/sort
* **Method**
   `GET`
* **URL Params**
   **Required:**
   `page=[integer]`
   `results=[integer]`
   page - number of page (0 is the first page)
   results - amount of elements per page
* **Body**
   ```json
   {
	   "parameterName": "",
	   "sortOrder": ""
   }
   ```
   "parameterName": "title", "author", "genres", "provider" or "status"
   "sortOrder": "ASC" or "DESC"
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "objects":[
		   {
			   "id":6,
			   "title":"Цветы для Элджернона",
			   "author":"Киз Дениэл ",
			   "genres":"Фантастика, Роман, Зарубежная литература",
			   "averageRating":"Нет оценок",
			   "provider":"IBS",
			   "status":"В наличии"
		   },
		   {
			   "id":3,
			   "title":"Области тьмы",
			   "author":"Глинн Алан ",
			   "genres":"Фантастика, Роман, Зарубежная литература",
			   "averageRating":"5.0",
			   "provider":"IBS",
			   "status":"В наличии"
		   },
		   {
			   "id":10,
			   "title":"Рождение Стальной Крысы",
			   "author":"Гаррисон Гарри ",
			   "genres":"Фантастика, Приключения, Зарубежная литература",
			   "averageRating":"Нет оценок",
			   "provider":"employee",
			   "status":"В наличии"
		   }
		],
		"pages":4
	}
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T19:09:13.815+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/user/library/sort"
	  }
	  ```
   * **Code:** 401 UNAUTHORIZED
     **OR**
   * **Code:** 404 NOT FOUND
   * **Content:**
    ```json
   {
	   "timestamp":"2022-09-10T19:09:46.428+00:00",
	   "status":404,
	   "error":"Not Found",
	   "path":"/api/user/library/sor"
   }
	```

* **Sample**
   `/api/user/library/sort?page=0&results=3`
   ```json
   {
	   "parameterName": "genres",
	   "sortOrder": "ASC"
   }
   ```

### Checkout books by ids
* **URL**
   /api/user/library/checkout
* **Method**
   `POST`
* **URL Params**
   None
* **Body**
   ```json
   [
	   [integer],
	   [integer]
   ]
   ```
    `[integer]` - id of a book
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "message":"Books were checked out successfully",
	   "status":"OK",
	   "code":200
   }
   
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T19:15:18.362+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/user/library/checkout"
	  }
	  ```
   * **Code:** 401 UNAUTHORIZED
      **OR**
   * **Code:** 404 NOT FOUND
   * **Content:**
      ```json
      {
	      "timestamp":"2022-09-10T19:15:52.554+00:00",
	      "status":404,
	      "error":"Not Found",
	      "path":"/api/user/library/checkou"
	  }
	  ```

* **Sample**
   `/api/user/library/checkout`
   ```json
   [
	   8,
	   9
   ]
  ```

### Show detailed history on books (Option for admin only)
#### Shows information about books that were checkouted, extended and returned
* **URL**
   /api/admin/detailed_history/all
* **Method**
   `GET`
* **URL Params**
   **Required:**
   `page=[integer]`
   `results=[integer]`
   page - number of page (0 is the first page)
   results - amount of elements per page
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "objects":[
		   {
			   "id":1,
			   "employeeId":1,
			   "employeeFullName":"Венедиктов Юрий Михайлович",
			   "bookId":1,
			   "title":"Совершенный код",
			   "author":"Макконнелл Стив ",
			   "actionsName":"взять",
			   "actionsDate":"2022-06-30"
		   },
		   {
			   "id":2,
			   "employeeId":1,
			   "employeeFullName":"Венедиктов Юрий Михайлович",
			   "bookId":2,
			   "title":"Getting Things Done: The Art of Stress-free Productivity",
			   "author":"Allen David ",
			   "actionsName":"взять",
			   "actionsDate":"2022-06-30"
		   },
		   {
			   "id":3,
			   "employeeId":1,
			   "employeeFullName":"Венедиктов Юрий Михайлович",
			   "bookId":2,
			   "title":"Getting Things Done: The Art of Stress-free Productivity",
			   "author":"Allen David ",
			   "actionsName":"продлить",
			   "actionsDate":"2022-07-15"
			}
		],
		"pages":7
	}
   
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T19:24:39.084+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/admin/detailed_history/all"
	  }
	  ```
   * **Code:** 401 UNAUTHORIZED
     **OR**
   * **Code:** 404 NOT FOUND
   * **Content:**
      ```json
      {
	      "timestamp":"2022-09-10T19:25:22.340+00:00",
	      "status":404,
	      "error":"Not Found",
	      "path":"/api/admin/detailed_histor/all"
	  }
	  ```

* **Sample**
   `/api/admin/detailed_history/all?page=0&results=3`
   

### Show detailed history on a certain book (Option for admin only)
#### Shows checkouts, extendings and returnings of a certain book
* **URL**
   /api/admin/detailed_history/certain
* **Method**
   `GET`
* **URL Params**
   **Required:**
   `bookId=[integer]`
   `page=[integer]`
   `results=[integer]`
   bookId - id of a book
   page - number of page (0 is the first page)
   results - amount of elements per page
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "objects":[
		   {
			   "id":4,
			   "employeeId":1,
			   "employeeFullName":"Венедиктов Юрий Михайлович",
			   "bookId":3,
			   "title":"Области тьмы",
			   "author":"Глинн Алан ",
			   "actionsName":"взять",
			   "actionsDate":"2022-06-30"
		   },
		   {
			   "id":5,
			   "employeeId":1,
			   "employeeFullName":"Венедиктов Юрий Михайлович",
			   "bookId":3,
			   "title":"Области тьмы",
			   "author":"Глинн Алан ",
			   "actionsName":"вернуть",
			   "actionsDate":"2022-07-10"
		   }
		],
		"pages":1
	}
   
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T19:34:27.610+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/admin/detailed_history/certain"
	  }
	  ```
   * **Code:** 401 UNAUTHORIZED
     **OR**
   * **Code:** 404 NOT FOUND
   * **Content:**
      ```json
      {
	      "timestamp":"2022-09-10T19:35:00.668+00:00",
	      "status":404,
	      "error":"Not Found",
	      "path":"/api/admin/detailed_history/certai"
	  }
	  ```

* **Sample**
   `/api/admin/detailed_history/certain?bookId=3&page=0&results=10`

### Show information about checkouted and extended books and the expired status of return data (Option for admin only)
* **URL**
   /api/admin/expired
* **Method**
   `GET`
* **URL Params**
   **Required:**
   `page=[integer]`
   `results=[integer]`
   page - number of page (0 is the first page)
   results - amount of elements per page
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "objects":[
		   {
			   "id":1,
			   "employeeId":1,
			   "employeeFullName":"Венедиктов Юрий Михайлович",
			   "bookId":1,
			   "title":"Совершенный код",
			   "author":"Макконнелл Стив ",
			   "actionsName":"взять",
			   "actionsDate":"2022-06-30",
			   "returnDate":"2022-07-30",
			   "returnDateExpired":true
		   },
		   {
			   "id":7,
			   "employeeId":1,
			   "employeeFullName":"Венедиктов Юрий Михайлович",
			   "bookId":2,
			   "title":"Getting Things Done: The Art of Stress-free Productivity",
			   "author":"Allen David ",
			   "actionsName":"взять",
			   "actionsDate":"2022-07-21",
			   "returnDate":"2022-08-21",
			   "returnDateExpired":true
			}
		],
		"pages":3
	}
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T19:43:51.652+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/admin/expired"
	  }
	  ```
   * **Code:** 401 UNAUTHORIZED
	 **OR**
   * **Code:** 404 NOT FOUND
   * **Content:**
   ```json
   {
	   "timestamp":"2022-09-10T19:44:19.690+00:00",
	   "status":404,
	   "error":"Not Found",
	   "path":"/api/admin/expire"
   }
   ```

* **Sample**
   `/api/admin/expired?page=0&results=2`

### Show all saved genres from the database
* **URL**
   /api/library/genres/all
* **Method**
   `GET`
* **URL Params**
   **Required:**
   `page=[integer]`
   `results=[integer]`
   page - number of page (0 is the first page)
   results - amount of elements per page
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "objects":[
		   {
			   "id":7,
			   "genre":"Зарубежная литература"
		   },
		   {
			   "id":1,
			   "genre":"Литература по саморазвитию"
		   },
		   {
			   "id":5,
			   "genre":"Научная книга"
		   },
		   {
			   "id":3,
			   "genre":"Приключения"
		   },
		   {
			   "id":4,
			   "genre":"Роман"
		   },
		   {
			   "id":6,
			   "genre":"Русская литература"
		   },
		   {
			   "id":8,
			   "genre":"Техника"
		   },
		   {
			   "id":2,
			   "genre":"Фантастика"
		   }
		],
		"pages":1
	}
   
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T19:51:20.787+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/library/genres/all"
	  }
	  ```
	  **OR**
   * **Code:** 401 UNAUTHORIZED
      **OR**
   * **Code:** 404 NOT FOUND
   * **Content:**
      ```json
      {
	      "timestamp":"2022-09-10T19:51:55.207+00:00",
	      "status":404,
	      "error":"Not Found",
	      "path":"/api/library/genre/all"
	  }
	  ```

* **Sample**
   `/api/library/genres/all?page=0&results=10`

### Save new genres into the database
* **URL**
   /api/library/genres/add
* **Method**
   `POST`
* **URL Params**
   None
* **Body**
   ```json
	{
		"",
		"",
		""
	}
   ```
   Within "" you can write any genre you want to that isn't saved into the database before
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "message":"Genres were added",
	   "status":"OK",
	   "code":200
   }
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T19:59:10.606+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/library/genres/add"
	  }
	  ```
   **OR**
   * **Code:** 401 UNAUTHORIZED
   **OR**
   * **Code:** 404 NOT FOUND
   * **Content:** 
   ```json
   {
	   "timestamp":"2022-09-10T19:59:44.492+00:00",
	   "status":404,
	   "error":"Not Found",
	   "path":"/api/library/genres/ad"
   }
   ```
   **OR**
   * **Code:** 500 INTERNAL SERVER ERROR
   * **Content:**
   ```json
   {
	   "timestamp":"2022-09-10T20:00:12.627+00:00",
	   "status":500,
	   "error":"Internal Server Error",
	   "path":"/api/library/genres/add"
   }
   ```

* **Sample**
   `/api/library/genres/add`
   ```json
   {
	   "Антиутопия",
	   "Роман"
   }
   ```

### Add a new book from an employee's account
#### Employee can specify title, lastname, firstname, fathername, genres ids
* **URL**
   /api/library/user/add
* **Method**
   `POST`
* **URL Params**
   None
* **Body**
   ```json
   {
	   "title": "",
	   "lastName": "",
	   "firstName": "",
	   "fatherName": "",
	   "genresIds": [
		   [integer],
		   [integer]
	   ]
   }
   ```
   Within "" you can write any value you want to
   `[integer]` - id of a book
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "message":"Books were added",
	   "status":"OK",
	   "code":200
   }
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T21:49:52.969+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/library/user/add"
	  }
	  ```
    **OR**
   * **Code:** 401 UNAUTHORIZED
    **OR**
   * **Code:** 404 NOT FOUND
   * **Content:**
    ```json
    {
	    "timestamp":"2022-09-10T21:50:27.696+00:00",
	    "status":404,
	    "error":"Not Found",
	    "path":"/api/library/user/ad"
	}
	```
   **OR**
   * **Code:** 500 INTERNAL SERVER ERROR
   * **Content:**
    ```json
    {
	    "timestamp":"2022-09-10T21:58:04.568+00:00",
	    "status":500,
	    "error":"Internal Server Error",
	    "path":"/api/library/user/add"
	}
	```
* **Sample**
   `/api/library/user/add`
   ```json
   {
	   "title": "Title",
	   "lastName": "Lastname",
	   "firstName": "Firstname",
	   "fatherName": "",
	   "genresIds": [
		   1,
		   2,
		   3
	   ]
   }
   ```

### Add a new book from an admin's account
#### Admin can specify title, lastname, firstname, fathername, provider (employee or IBS) and genres ids
* **URL**
   /api/library/admin/add
* **Method**
   `POST`
* **URL Params**
   None
* **Body**
   ```json
   {
	   "title": "",
	   "lastName": "",
	   "firstName": "",
	   "fatherName": "",
	   "provider": "",
	   "genresIds": [
		   [integer],
		   [integer]
	   ]
   }
   ```
   Within "" you can write any value you want to
   `[integer]` - id of a book
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "message":"Books were added",
	   "status":"OK",
	   "code":200
   }
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T21:59:59.278+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/library/admin/add"
	  }
	  ```
   **OR**
   * **Code:** 401 UNAUTHORIZED
   **OR**
   * **Code:** 404 NOT FOUND
   * **Content:**
   ```json
   {
	   "timestamp":"2022-09-10T22:00:30.481+00:00",
	   "status":404,
	   "error":"Not Found",
	   "path":"/api/library/admin/ad"
   }
   ```
   **OR**
   * **Code:** 500 INTERNAL SERVER ERROR
   * **Content:**
    ```json
    {
	    "timestamp":"2022-09-10T22:01:49.097+00:00",
	    "status":500,
	    "error":"Internal Server Error",
	    "path":"/api/library/admin/add"
	}
	```

* **Sample**
   `/api/library/admin/add`
   ```json
   {
	   "title": "Title",
	   "lastName": "Lastname",
	   "firstName": "Firstname",
	   "fatherName": "",
	   "provider": "IBS"
	   "genresIds": [
		   1,
		   2,
		   3
	   ]
   }
   ```

### Show all reviews of a certain book
* **URL**
   /api/user/reviews/all
* **Method**
   `GET`
* **URL Params**
   **Required:**
	`bookId=[integer]`
	`page=[integer]`
	`results=[integer]`
   bookId - id of a book
   page - number of page (0 is the first page)
   results - amount of elements per page
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "bookId":5,
	   "bookReviews":[
		   {
			   "employeeId":11,
			   "stars":5,
			   "advantages":"advantage4",
			   "disadvantages":"none",
			   "comment":"kinda reminds me smth",
			   "reviewsDate":"2022-08-08"
		   },
		   {
			   "employeeId":1,
			   "stars":4,
			   "advantages":"found entertaining",
			   "disadvantages":"not so interesting",
			   "comment":"i've read better",
			   "reviewsDate":"2022-09-09"
		   }
		],
		"pages":1
	}
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T22:10:42.104+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/user/reviews/all"
	  }
	  ```
   * **Code:** 401 UNAUTHORIZED
   **OR**
   * **Code:** 404 NOT FOUND
   * **Content:**
     ```json
    {
	    "timestamp":"2022-09-10T22:11:14.195+00:00",
	    "status":404,
	    "error":"Not Found",
	    "path":"/api/user/review/all"
	}
	 ```
* **Sample**
   `/api/user/reviews/all?bookId=1&page=0&results=10`

### Add a new review of a certain book
* **URL**
   /api/user/reviews/add
* **Method**
   `POST`
* **URL Params**
   None
 * **Body**
   ```json
   {
	   "bookId": [integer],
	   "stars": [integer],
	   "advantages": "",
	   "disadvantages": "",
	   "comment": ""
   }
   ```
   Within "" you can write any value you want to
   `[integer]` - id of a book; value from 1 to 5 for a reviewed book
* **Success Response**
   * **Code:** 200 
   * **Content:** 
   ```json
   {
	   "message":"Book review was successfully added",
	   "status":"OK",
	   "code":200
   }
   ```

* **Error Response**
   * **Code:** 400 BAD REQUEST
   * **Content:** 
      ```json
      {
	      "timestamp":"2022-09-10T22:17:09.670+00:00",
	      "status":400,
	      "error":"Bad Request",
	      "path":"/api/user/reviews/add"
	  }
	  ```
  
   * **Code:** 401 UNAUTHORIZED
   **OR**
   * **Code:** 404 NOT FOUND
   * **Content:**
    ```json
    {
	    "timestamp":"2022-09-10T22:17:42.360+00:00",
	    "status":404,
	    "error":"Not Found",
	    "path":"/api/user/reviews/ad"
	}
	```
   
   **OR**
   * **Code:** 500 INTERNAL SERVER ERROR
   * **Content:**
	```json
	{
		"timestamp":"2022-09-10T22:19:45.851+00:00",
		"status":500,
		"error":"Internal Server Error",
		"path":"/api/user/reviews/add"
	}
	```
* **Sample**
   `/api/user/reviews/add`
   ```json
   {
	   "bookId": 5,
	   "stars": 5,
	   "advantages": "a lot",
	   "disadvantages": "a few",
	   "comment": "no comments"
   }
   ```