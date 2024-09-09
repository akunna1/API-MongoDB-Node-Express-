##### MongoDB Schema
- There's no need to create a schema in the MongoDB shell, as the schema is defined using Mongoose in the PostSchema

##### Endpoints
- Create Post (with image): POST /posts (Form-data: message, image)
- Get All Posts: GET /posts
- Get Single Post: GET /posts/:id
- Update Post (with new image): PUT /posts/:id (Form-data: message, image)
- Delete Post: DELETE /posts/:id

