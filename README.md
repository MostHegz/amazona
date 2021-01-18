# souqclone
This is a souq-like website for a fashion e-commerce web application.

# Features
## Admin
* I can add other admins by creating new credentials for new accounts (they should be able to login using the generated accounts)
* I can CRUD Course Categories - [name, details, subcategories]
* I can CRUD Products - [name, description, price]
* I can add/remove one or more SubCategory to a Category
* I can add/remove one or more Tag to Products (many to many relations)
* I can add images/media to a product [BONUS]
* I can browse users (accounts) list and delete any user account. Deleted accounts should not be able to login after that.

[x] I can't add tags to products

## User
* I can register as a normal account and login using my credentials
* I can browse categories [without logging in]
* I can browse products [without logging in]
* I can list products [without logging in]
* I can filter products by their categories [without logging in]
* I can add/delete one or more product to cart [requires logging in]
* I can view my previous orders
* I shall claim my total price on each addition of product to cart
* I can add/remove products to each order [requires logging in]
* I can add the same product multiple times

[x]There is no subcategories [only one level]
[x]Product pagination still had some issues so it's not in the production version

## Other Features
* Saving cart details on browser
* Hashing password 
* Allowing for dynamic (where you add any key/attribute in the query) filters (when fetching product list) [BONUS]

# Technologies used
## This project uses MERN stack.
* Frontend is created using React
* State management is achieved using Redux
* Backend api is created using node.js and express middleware
* Database was created using MongoDB and Mongoose
* Using JWT tokens for authentication
* Handling file uploads using multer [BONUS]
* The website is deployed on heroku-app

# API Documentation
* [https://mosts-amazonclone.herokuapp.com/](https://mosts-amazonclone.herokuapp.com/) is the website home page
## `/api/users` (userRouter)
* `get('/seed')` for initializing user database (works only once)
* `post('/signin')` for user signin
* `post('/register')` for user registeration
* `get('/:id')` to fetch a specific user data
* `get('/')` fetch all users data (must be an admin)
* `delete('/:id')` delete a specific user data (must be an admin)
* `put('/:id')` edit a specific user (must be an admin)

## `/api/uploads` (uploadRouter)
* `post('/')` uploads a file in `/uploads` (must be authenticated)

## `/api/products` (productRouter)
* `get('/seed')` initialize products database
* `get('/')` fetch products from server
* `get('/:id')` fetch a specific product 
* `get('?name=${name}&category=${category}')` fetch filtered products according to their name and category
* `post('/')` create a new sample product (must be an admin)
* `put('/:id')` edit product in database (must be an admin)
* `delete('/:id')` delete product from database (must be an admin)


# To do list
* Cleaning the code a little bit
* Documenting the api
* Adding Pagination
