# todo-api-app
Todo API is a RESTful API built with Node.js and Express. It allows users to manage their todo tasks including creating, reading, updating and deleting (CRUD) operations.


# Prerequisites
- Node.js (>=12.x)
- MongoDB (>=4.x)
- npm (>=6.x)

# Setup

### 1. Clone the Repository
Use the following command to clone the repository:
```bash
git clone https://github.com/yourusername/todo-api.git
```

### 2. Install dependencies
Once you've cloned the repository, navigate into the directory and install the required dependencies with
```bash
 npm install
 ```
 ### 3. Environment variables
Create a .env file in the root directory and add your environment variables. The following variables are required:
```bash
MONGODB_URI='mongodb://localhost:27017/{test_database}'
JWT_SECRET='{your_jwt_secret}'

//repalce the string inside {} with your owns
 ```
 ### 4. Start the server
 You can start the server by running : 
 ```bash
 npm start
 ```
 The server will start running on http://localhost:5000 (or whatever your PORT environment variable is set to).


# API Documentation
A Postman collection is uploaded in the repo: todo-api .postman_collection.json
The base URL for all the endpoints is http://localhost:5000. The API includes the following endpoints:

## User Authentication

### POST /register

Body Parameters:

- username (string): The username of the user
- password (string): The password of the user

Response:
- A success message indicating that the user has been successfully registered

### POST /login

Body Parameters:

- username (string): The username of the user
- password (string): The password of the user

Response: 
- A JWT token for authenticating further requests

## Todo Management
### GET /todos

Headers:
- auth-token: The JWT token received from the login endpoint

Query Parameters:
#### sorting
- sortBy (string): The field to sort by (e.g., 'name')
- example: http://localhost:5000/todos?sortBy=name,+dueDate (i.e. sort by name, and dueDate in descending order)

#### Filtering
- filter (string): The field to filter by (e.g., 'status')
- example:  http://localhost:5000/todos?name=exercise 

Response:
- An array of todo items for the authenticated user, sorted and filtered as per the query parameters

### POST /todos

Headers:

- auth-token: The JWT token received from the login endpoint

Body Parameters:

- name (string): The name of the todo task
- description (string): The description of the todo task
- status (string): The status of the todo task
- dueDate (string): The due date for the task (in 'YYYY-MM-DD' format)
- priority (string): The priority of the task
- tags (array): The tags associated with the task

 Response: 
 - The created todo item

### PUT /todos/:id

Headers:

- auth-token: The JWT token received from the login endpoint

Body Parameters:

- name (string): The name of the todo task
- description (string): The description of the todo task
- status (string): The status of the todo task
- dueDate (string): The due date for the task (in 'YYYY-MM-DD' format)
- priority (string): The priority of the task
- tags (array): The tags associated with the task

 Response: 
 - The updated todo item

### DELETE /todos/:id

Headers:

- auth-token: The JWT token received from the login endpoint

Response: 
- A confirmation message indicating the successful deletion of the todo item
