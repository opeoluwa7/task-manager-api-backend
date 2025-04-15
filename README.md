# task-manager-api

A node.js API built with typescript that helps manage tasks, handle CRUD operations, jwt authentication with PostgreSQL.

## Documentation

For full API details, check the Postman Documentation [here](https://documenter.getpostman.com/view/42958843/2sB2cPk5wr)

## Tech Stack

- **Backend:**
  - **Node.js:** Node is a free, open-source, cross-platform Javascript runtime environment that lets developers create servers, web apps, command line tools and scripts.
  - **Express.js:** Express is a minimal and flexible Node.js web framework that simplifies building APIs and web applications by handling routing, middleware, and HTTP requests.
- **Database:**
  - **PostgresSQL(hosted on Railway):** Postgres is a powerful, open-source relational database system known for its reliability, scalability and advanced SQL compliance.
- **Authentication:**
  - **JWT(JSON Web Token):** A compact, secure way to represent authentication data, often used for user authentication and API author ization.
  - **bcrypt:** A hashing library used to securely hash and compare passwords to enhance authentication & security.
  - **Zod:** A Typescript-first schema validation library that lets you define, parse, and validate data with built-in type safety.
- **Hosting:**
  - **Railway:** A cloud platform that simplifies deploying and managing databases, backend services, and full-stack applications with minimal configurations.
  - **Cloudinary:** Cloudinary is a cloud-based platform offering end-to-end image and video management, including storage, optimization, transformation, and delivery, for websites and applications.

## Features

- Authentication for accessing protected routes and resources.
- Can be used to create, update and delete tasks.
- Can be used to help track schedule based on factors like deadline and priority.
- Registered users can update their own data and delete their account.
- Users can upload images and retrive them.

## **Setup Guide**

> **Note:** This is only needed if you want to run the API locally. By default, the API is hosted on **Railway** and is ready to use.

### **Clone the Repository**

First, download the project files:

```
git clone https://github.com/opeoluwa7/task_manager_api_backend.git
cd task_manager_api
```

Install Dependencies

Run the following command to install required packages:

`npm install`

Configure Environment Variables

If you want to run the API locally, you’ll need to set up environment variables.

Create a .env file in the project root and add the following variables:

```
DB_URL=your_postgresql_database_url
JWT_SECRET=your_jwt_secret_key
JWT_EXP_IN_SEC=your_token_expiry_in_seconds
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Where to get these values?

    •	Database URL → Use your own PostgreSQL database or a Railway-hosted one.
    •	JWT Secrets → Set your own values for security.
    •	Cloudinary Variables → Sign up at Cloudinary to get API keys.

Run the Server Locally

Start the development server:

npm start

If everything is set up correctly, the server will start on http://localhost:3000.

Test with Postman

To test the API, use the provided [Postman documentation](https://documenter.getpostman.com/view/42958843/2sB2cPk5wr).

## API USAGE

To use this API, you will need a tool like [Postman](https://www.postman.com/) or [Httpie](https://httpie.io/) to be able to access these endpoints or you can use your browser url and pass in data with development console.

Here's a basic example of how to use the API.

**Authentication**

**Endpoint:** POST /auth/register

```
{
  "name": "username"
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**

```
{
  "success": "true",
  "data": "data",
  "token": "your_jwt_token"
}
```

**Get all tasks (Protected route)**

**Endpoint:** GET /tasks/all

**Headers:**

```
{
  "Authorization": "Bearer your_jwt_token"
}
```

**Response:**

```
[
  {
    "id": 1,
    "title": "First Task",
    "description": "...",
    "status": "..."
  }
]
```

## Project Structure

```
src/
    |-- common #Rate limiter
    |-- config #Config files(DB queries, env.js)
    |-- controllers # Request handlers
    |-- middlewares # Auth and other middleware
    |-- routes # API routes
    |-- utils # jwt and other helpers
README.md
index.js
package-lock.json
package.json
```

## Deployment

- Hosted on [Railway](https://railway.com).
- Image storage hosted on [Cloudinary](https://cloudinary.com).
