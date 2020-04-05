# ecommerce-server

BaseUrl: http://localhost:3000

## **Register**

Return json access token after user register

-   **URL**

    /register

-   **Method:**

    `POST`

-   **URL Params**

    None

-   **Data Params**

      **Required:**

      `username=[string]`\
      `email=[string]`\
      `password=[string]`\

-   **Success Response:**

    -   **Code:** 201 <br />
        **Content:**
        ```json
        {
            "message": "Register Success!",
            "access_token": "..."
        }
        ```

-   **Error Response:**

    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request,
            "errors": [
                "user already exists"
            ]
        }
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {
            "status": 400,
            "message": "Bad Request,            
            "errors": [
                "invalid email format"
            ]
        }
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {
            "status": 400,
            "message": "Bad Request,            
            "errors": [
                "minimum password length is 6"
            ]
        }
        ```
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {
            "status": 400,
            "message": "Bad Request",            
            "errors": [
                "input can not be empty"
            ]
        }
        ```                
## **Login**

Return json access token after user login

-   **URL**

    /login

-   **Method:**

    `POST`

-   **URL Params**

    None

-   **Data Params**

      **Required:**

      `email=[string]`\
      `password=[string]`\

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
            "message": "Login Success!",
            "access_token": "..."
        }
        ```

-   **Error Response:**

    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Login Failed",
            "errors": [
                "invalid username/password!"
            ]
        }
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {
            "status": 400,
            "message": "Login Failed",            
            "errors": [
                "user does not exists"
            ]
        }

## **Create New Product (Admin Side)**

Return json of new data after create product

-   **URL**

    /products

-   **Method:**

    `POST`

-   **URL Params**

    None

-   **Data Params**

      **Required:**

      `name=[string]`\
      `image_url=[string]`\
      `price=[float]`\
      `stock=[integer]`

-   **Success Response:**

    -   **Code:** 201 <br />
        **Content:**
        ```json
        {
            "newProduct": {
                "id": 1,
                "name": "...",
                "image_url": "...",
                "price": ...,
                "stock": ...,
                "updatedAt": "...",
                "createdAt": "..."
            }
        }
        ```

-   **Error Response:**

    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "input can not be empty"
            ]
        }
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "input should be higher than 0"
            ]
        }
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "use number format"
            ]
        }

## **Find All Product (All Sides)**

Return json of all data 

-   **URL**

    /products

-   **Method:**

    `GET`

-   **URL Params**

    None

-   **Data Params**

      **Required:**
        None

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
            "products": [
                {
                    "id": 1,
                    "name": "...",
                    "image_url": "...",
                    "price": ...,
                    "stock": ...,
                    "createdAt": "...",
                    "updatedAt": "..."
                },
                {
                    "id": 2,
                    "name": "...",
                    "image_url": "...",
                    "price": ...,
                    "stock": ...,
                    "createdAt": "...",
                    "updatedAt": "..."
                }
            ]
        }
        ```

-   **Error Response:**

    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "input can not be empty"
            ]
        }
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "input should be higher than 0"
            ]
        }
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "use number format"
            ]
        }

## **Find One Product (All Sides)**

Return json of one data 

-   **URL**

    /products/:id

-   **Method:**

    `GET`

-   **URL Params**

    **Required:**

    `id=[integer]`

-   **Data Params**

      **Required:**
        None

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
            "product": {
                "id": 2,
                "name": "...",
                "image_url": "...",
                "price": ...,
                "stock": ...,
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```

-   **Error Response:**

    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "input can not be empty"
            ]
        }
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "input should be higher than 0"
            ]
        }
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "use number format"
            ]
        }

## **Edit One Product (Admin Side)**
Return json of new data after update product

-   **URL**

    /products/:id

-   **Method:**

    `POST`

-   **URL Params**

    `id=[integer]`

-   **Data Params**

      **Required:**

      `name=[string]`\
      `image_url=[string]`\
      `price=[float]`\
      `stock=[integer]`

-   **Success Response:**

    -   **Code:** 201 <br />
        **Content:**
        ```json
        {
            "product": [
                1,
                [
                    {
                        "id": 2,
                        "name": "star wars minifig",
                        "image_url": "https://cdn.hipwallpaper.com/i/2/14/xPVXd2.jpg",
                        "price": 200000,
                        "stock": 2,
                        "createdAt": "2020-02-19T15:30:55.951Z",
                        "updatedAt": "2020-02-19T15:38:15.782Z"
                    }
                ]
            ]
        }
        ```

-   **Error Response:**

    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "input can not be empty"
            ]
        }
        ```
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "input should be higher than 0"
            ]
        }
        ```
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "use number format"
            ]
        }
        ```

## **Delete One Product (Admin Side)**
-   **Success Response:**

    -   **Code:** 204 <br />
        **Content:**
        ```json
        {
            "message": "Product with id 2 is deleted"
        }
        ```
-   **Error Response:**
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {
            "status": 404,
            "errors": [
                "Product with id 1 does not exists"
            ],
            "message": "Not Found"
        }
        ```

## **Find Cart (Customer Side)**

Return json of all cart 

-   **URL**

    /carts

-   **Method:**

    `GET`

-   **URL Params**

    None

-   **Data Params**

      **Required:**
        None

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
            "cart": [
                {
                    "UserId": 2,
                    "ProductId": 3,
                    "quantity": 1,
                    "isActive": true,
                    "createdAt": "...",
                    "updatedAt": "...",
                    "Product": {
                        "id": 3,
                        "name": "...",
                        "image_url": "...",
                        "price": 100000,
                        "stock": 6,
                        "createdAt": "...",
                        "updatedAt": "..."
                    }
                },
                {
                    "UserId": 2,
                    "ProductId": 2,
                    "quantity": 1,
                    "isActive": true,
                    "createdAt": "...",
                    "updatedAt": "...",
                    "Product": {
                        "id": 2,
                        "name": "...",
                        "image_url": "...",
                        "price": 200000,
                        "stock": 10,
                        "createdAt": "...",
                        "updatedAt": "..."
                    }
                }
            ]
        }
        ```

-   **Error Response:**

    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "..."
            ]
        }

## **Add to Cart (Customer Side)**

Return json of one data 

-   **URL**

    /carts

-   **Method:**

    `POST`

-   **URL Params**

    **Required:**

    none

-   **Data Params**

      **Required:**
        None

-   **Success Response:**

    -   **Code:** 201 <br />
        **Content:**
        ```json
        {
            "cart": {
                "UserId": 2,
                "ProductId": 1,
                "quantity": 1,
                "isActive": true,
                "updatedAt": "...",
                "createdAt": "...",
                "id": 1
            }
        }
        ```

-   **Error Response:**
    -   **Code:** 404 NOT FOUND <br />
        **Content:**
        ```json
        {
            "status": 404,
            "errors": [
                "product does not exists"
            ],
            "message": "Not Found"
        }
        ```
## **Remove One Product from Cart (Customer Side)**
-   **Success Response:**

    -   **Code:** 204 <br />
        **Content:**
        ```json
        {
            "message": "Cart contained a product with ID 2 is deleted"
        }
        ```
-   **Error Response:**
    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {
            "status": 404,
            "errors": [
                "Cart contained a product with ID 2000 does not exists"
            ],
            "message": "Not Found"
        }
        ```

## **Create Invoice (Customer Side)**

Return json of data 

-   **URL**

    /invoices

-   **Method:**

    `POST`

-   **URL Params**

    **Required:**

    `id=[integer]`

-   **Data Params**

      **Required:**
        None

-   **Success Response:**

    -   **Code:** 201 <br />
        **Content:**
        ```json
        {
            "cart": {
                "UserId": 2,
                "ProductId": 1,
                "quantity": 1,
                "isActive": true,
                "updatedAt": "...",
                "createdAt": "...",
                "id": 1
            }
        }
        ```

-   **Error Response:**
    -   **Code:** 404 NOT FOUND <br />
        **Content:**
        ```json
        {
            "status": 404,
            "errors": [
                "cart is empty"
            ],
            "message": "Bad Request"
        }
        ```
## **Find All Invoices (Customer Side)**

Return json of all invoices 

-   **URL**

    /invoices

-   **Method:**

    `GET`

-   **URL Params**

    None

-   **Data Params**

      **Required:**
        None

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:**
        ```json
        {
            "invoice": [
                {
                    "id": 1,
                    "UserId": 2,
                    "transactionDetails": "",
                    "total": 500000,
                    "createdAt": "...",
                    "updatedAt": "..."
                },
                {
                    "id": 2,
                    "UserId": 2,
                    "transactionDetails": "",
                    "total": 500000,
                    "createdAt": "...",
                    "updatedAt": "..."
                }                
            ]
        }
        ```

-   **Error Response:**

    -   **Code:** 400 BAD REQUEST <br />
        **Content:**
        ```json
        {   
            "status": 400,
            "message": "Bad Request",
            "errors": [
                "..."
            ]
        }
