# Job Portal Server

This is the backend server for a job portal application built with Express.js and MongoDB. The server provides REST APIs for various actions such as user registration, job posting, and job search.

## Getting Started

To get started with the server, you need to have Node.js and MongoDB installed on your machine.

### Installing

1. Clone the repository:

git clone https://github.com/vr513/PR-2-Job-Portal

2. Install the dependencies:

`cd server`
`pnpm install`

3. Create a `.env.local` file and add the following environment variables:

`PORT=5050`
`MONGO_URI="mongodb://127.0.0.1:27017/job-portal"`
`JWT_SECRET="68SfzICFJSmlOBZik2i7"`

4. Start the server:

`cd server`
`pnpm run dev`


The server will start running on `http://localhost:5050`.

### Available Scripts

In the project directory, you can run:

- `pnpm start`: Starts the server in production mode.
- `pnpm run dev`: Starts the server in development mode using Nodemon.
<!-- - `npm test`: Runs the tests for the server. -->

### API Documentation

The server provides the following APIs:

- `POST /signup`: Registers a new user.
- `POST /login`: Logs in a user.
- `POST /refreshToken`: Refresh the JWT authentication token.
<!-- - `GET /api/jobs`: Returns a list of jobs.
- `POST /api/jobs`: Creates a new job.
- `GET /api/jobs/:id`: Returns details of a job.
- `PUT /api/jobs/:id`: Updates a job.
- `DELETE /api/jobs/:id`: Deletes a job. -->

You can find more information about each API in the `routes` directory.

## Built With

- [Express.js](https://expressjs.com/) - The web framework used
- [MongoDB](https://www.mongodb.com/) - The database used
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Used for password hashing
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Used for JSON web token authentication
- [morgan](https://www.npmjs.com/package/morgan) - Used for HTTP request logging

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
