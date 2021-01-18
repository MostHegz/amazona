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

# API Documentation
* [https://mosts-amazonclone.herokuapp.com/](https://mosts-amazonclone.herokuapp.com/) is the root handle of the website

# To do list
* Cleaning the code a little bit
* Documenting the api
* Adding Pagination
