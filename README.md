# API-MongoDB-Node-Express

This project is a simple social media post API built using MongoDB, Express.js, and Node.js. It supports CRUD operations including image upload for posts.

---

## Features

* Create social media posts with a message and image
* Read all posts or a single post by ID
* Update posts with new messages and images
* Delete posts
* Uses MongoDB database: `social_media_db`
* Posts stored in the `posts` collection

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose (for schema and database modeling)
* Multer (for image upload handling)
* Body-parser (to parse incoming request bodies)

---

## Installation

1. Initialize npm and install dependencies:

```bash
npm init -y
npm install express mongoose multer body-parser
```

2. Run your MongoDB server locally or use a MongoDB cloud instance.

3. Start the server:

```bash
node index.js
```

*(Assuming your main file is named `index.js`)*

---

## MongoDB Schema (using Mongoose)

* The post schema is defined in code, no need to create schema manually in MongoDB shell.
* Contains fields for message (text) and image (file info).

---

## API Endpoints

| Method | Endpoint     | Description                  |
| ------ | ------------ | ---------------------------- |
| POST   | `/posts`     | Create a new post with image |
| GET    | `/posts`     | Retrieve all posts           |
| GET    | `/posts/:id` | Retrieve a single post by ID |
| PUT    | `/posts/:id` | Update a post and its image  |
| DELETE | `/posts/:id` | Delete a post by ID          |

---

## Notes

* Image uploads handled using Multer middleware.
* Requests with images must be sent as multipart/form-data.
* Message is a text string associated with each post.

---

This API serves as a foundation for building social media applications with image support and basic CRUD functionality.
