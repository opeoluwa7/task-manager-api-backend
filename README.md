# task-manager-api

A node.js API built with typescript that helps manage tasks, handle CRUD operations, jwt authentication with PostgreSQL.

## Documentation

For full API details, check the Postman Documentation [here](https://documenter.getpostman.com/view/42958843/2sB2cbayuZ)

## Tech Stack

- **Backend:**
  - **Node.js:** Node is a free, open-source, cross-platform Javascript runtime environment that lets developers create servers, web apps, command line tools and scripts.
  - **Express.js:** Express is a minimal and flexible Node.js web framework that simplifies building APIs and web applications by handling routing, middleware, and HTTP requests.
- **Database:**
  - **PostgresSQL(hosted on Railway):** Postgres is a powerful, open-source relational database system known for its reliability, scalability and advanced SQL compliance.
  - **Redis:** Redis is an in-memory data store known for its speed, used for caching, session management, real-time analytics, and more.
- **Authentication:**
  - **JWT(JSON Web Token):** A compact, secure way to represent authentication data, often used for user authentication and API author ization.
  - **bcrypt:** A hashing library used to securely hash and compare passwords to enhance authentication & security.
  - **Zod:** A Typescript-first schema validation library that lets you define, parse, and validate data with built-in type safety.
- **Hosting:**
  - **Railway:** A cloud platform that simplifies deploying and managing databases, backend services, and full-stack applications with minimal configurations.
  - **Cloudinary:** Cloudinary is a cloud-based platform offering end-to-end image and video management, including storage, optimization, transformation, and delivery, for websites and applications.

## Features

- Authentication with access and refresh tokens for accessing protected routes and resources.
- Uses HttpOnly cookies to store the tokens and ensures smooth perfomance for users.
- Presence of rate limiters to prevent abuse of the API.
- Can be used to create, update and delete tasks.
- Can be used to help track schedule based on factors like deadline and priority.
- Registered users can update their own data and delete their account.
- Users can upload images and retrive them.

## **Note:** By default, the API is hosted on **Railway** and is ready to use.

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
}
```

**Get all tasks (Protected route)**

**Endpoint:** GET /tasks/all

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
dist
src/
    |-- config #Config files(DB queries, pool, cloudinaryConfig, env.js)
    |-- controllers # Request handlers
    |-- middlewares # Auth and other middleware
    |-- routes # API routes
    |-- utils # jwt and other helpers
    index.ts
README.md
package-lock.json
package.json
tsconfig.json
```

## Deployment

- Hosted on [Railway](https://railway.com).
- Image storage hosted on [Cloudinary](https://cloudinary.com).
