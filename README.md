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
