# Chripy

Chripy is a backend-focused social media API built with Node.js, TypeScript, Express, PostgreSQL, and Drizzle ORM. The project models a lightweight microblogging service where users can create accounts, sign in, publish chirps, retrieve chirps, refresh tokens, revoke access, and interact with a Polka webhook flow for a premium feature flag.

This project was developed as part of a backend engineering learning path and internship-style development exercise. It focuses on building clean API contracts, secure authentication, robust error handling, and data persistence with a production-minded structure.

## Project Overview

The application exposes a JSON API for managing users and chirps. It implements user creation, authentication, authorized chirp creation, chirp retrieval with filtering and sorting, token refresh and revocation, and an admin reset endpoint. The architecture is designed to be modular and easy to extend while keeping the runtime behavior predictable and testable.

Key capabilities include:

- User account creation
- Password hashing and verification
- JWT-based access tokens
- Refresh token generation and validation
- Chirp creation and retrieval
- Chirp filtering by author
- Chirp sorting by creation date
- Structured error handling
- Admin reset endpoint for local test cleanup
- Polka webhook-based premium upgrade flow

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- Drizzle ORM
- Vitest
- Argon2 for password hashing
- JWT for authentication

## Repository Structure

```text
Chripy-recovered/
├── src/
│   ├── api/
│   │   ├── admin.ts
│   │   ├── auth.ts
│   │   ├── chirps.ts
│   │   ├── health.ts
│   │   ├── polka.ts
│   │   └── users.ts
│   ├── app/
│   │   ├── assets/
│   │   └── index.html
│   ├── authentication/
│   │   ├── auth.test.ts
│   │   └── auth.ts
│   ├── db/
│   │   ├── migrations/
│   │   ├── queries/
│   │   │   ├── chirps.ts
│   │   │   ├── refreshTokens.ts
│   │   │   └── users.ts
│   │   ├── index.ts
│   │   └── schema.ts
│   ├── errors/
│   │   ├── BadRequestError.ts
│   │   ├── ForbiddenError.ts
│   │   ├── NotFoundError.ts
│   │   └── UnauthorizedError.ts
│   ├── handlers/
│   │   ├── handleAddChirp.ts
│   │   ├── handleCreateUser.ts
│   │   ├── handleDeleteChirp.ts
│   │   ├── handleDeleteUsers.ts
│   │   ├── handleGetChirp.ts
│   │   ├── handleGetChirps.ts
│   │   ├── handleLogin.ts
│   │   ├── handleRefresh.ts
│   │   ├── handleRevoke.ts
│   │   ├── handleResetHits.ts
│   │   ├── handleUpdateInfo.ts
│   │   ├── handlerMetrics.ts
│   │   ├── handlerValidateChripy.ts
│   │   └── handlePolkaWebhook.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   ├── logResponse.ts
│   │   └── metrics.ts
│   ├── config.ts
│   ├── index.ts
│   └── types/
│       └── (if present in future additions)
├── drizzle.config.ts
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
└── src/db/migrations/
```

## Getting Started

### Prerequisites

Before running the project, make sure the following tools are installed:

- Node.js 18 or newer
- npm
- PostgreSQL
- A configured local database instance or cloud PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/rain-lab5/Chripy.git
cd Chripy
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables.

Create a `.env` file in the project root with the following values:

```env
DB_URL=postgresql://username:password@localhost:5432/chripy
PLATFORM=development
JWT_SECRET=your_jwt_secret
POLKA_KEY=your_polka_api_key
```

The configuration is loaded centrally from `src/config.ts` and validated at runtime.

### Database setup

This project uses Drizzle ORM with migration files stored under `src/db/migrations`.

Generate migrations:

```bash
npm run generate
```

Apply migrations:

```bash
npm run migrate
```

## Scripts

The project includes the following npm scripts:

```bash
npm run test
```
Runs the automated test suite.

```bash
npm run build
```
Compiles the TypeScript application to the `dist` directory.

```bash
npm run dev
```
Compiles the code and starts the Express server locally.

```bash
npm start
```
Runs the compiled application from the build output.

## Running the Application

After the environment variables and database are ready, start the service:

```bash
npm run dev
```

The application listens on:

```text
http://localhost:8080
```

## API Documentation

The API uses standard JSON request and response bodies and follows REST-style resource naming.

### Health check

```http
GET /api/healthz
```

Returns a simple success response to confirm the service is running.

### User endpoints

#### Create user

```http
POST /api/users
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Update user info

```http
PUT /api/users
```

This route is used to update a user record and is protected by authentication logic.

### Authentication endpoints

#### Login

```http
POST /api/login
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

Returns a JWT access token and refresh token.

#### Refresh token

```http
POST /api/refresh
```

#### Revoke token

```http
POST /api/revoke
```

### Chirp endpoints

#### Create chirp

```http
POST /api/chirps
```

Headers:

```http
Authorization: Bearer <access_token>
```

Request body:

```json
{
  "body": "Hello from Chripy!"
}
```

#### Get all chirps

```http
GET /api/chirps
```

Optional query parameters:

- `sort=asc` - oldest to newest
- `sort=desc` - newest to oldest
- `authorId=<user_id>` - filter by author

Examples:

```http
GET /api/chirps?sort=desc
GET /api/chirps?authorId=uuid
GET /api/chirps?sort=asc&authorId=uuid
```

#### Get chirp by id

```http
GET /api/chirps/:chirpId
```

#### Delete chirp

```http
DELETE /api/chirps/:chirpId
```

### Admin endpoints

#### Metrics

```http
GET /admin/metrics
```

#### Reset data

```http
POST /admin/reset
```

This endpoint is intended for test cleanup and local environment resets.

### Polka webhook

```http
POST /api/polka/webhooks
```

This route validates the Polka API key and is used for premium upgrade flow handling.

## Architecture

The project follows a modular backend architecture built around route groups, handlers, middleware, and database query functions.

### Application bootstrap

The root application entry point in `src/index.ts` is responsible for:

- creating the Express application
- enabling JSON parsing
- mounting app-level static assets
- registering global middleware
- registering feature-specific route modules
- attaching centralized error handling
- starting the server

### Feature modules

Routes are organized into dedicated route-registration files under `src/api`:

- `admin.ts` handles admin endpoints
- `auth.ts` handles login, refresh, and revoke routes
- `chirps.ts` handles chirp routes
- `health.ts` handles health checks
- `polka.ts` handles webhook routes
- `users.ts` handles user registration and updates

This separation keeps the main entry file concise and makes the API easier to extend.

### Handlers

Each route delegates to a dedicated handler in `src/handlers`. These handlers contain request validation, business logic, and response generation. This separation helps keep route registration simple and logic focused.

### Middleware

The middleware layer includes:

- request logging
- metrics collection
- centralized error handling

This ensures logging and instrumentation remain consistent across the application.

## Database Design

The application uses PostgreSQL with Drizzle ORM. Schema definitions are located in `src/db/schema.ts`.

### Users table

The `users` table stores:

- `id`: UUID primary key
- `created_at`: creation timestamp
- `updated_at`: last update timestamp
- `email`: unique email address
- `hashed_password`: stored password hash
- `is_chirpy_red`: boolean flag for premium status

### Chirps table

The `chirps` table stores:

- `id`: UUID primary key
- `created_at`: creation timestamp
- `updated_at`: last update timestamp
- `body`: chirp text content
- `user_id`: foreign key referencing the user who created the chirp

### Refresh tokens table

The `refresh_tokens` table stores:

- `token`: primary key
- `created_at`: creation time
- `updated_at`: refresh time
- `user_id`: foreign key to user
- `expires_at`: expiration timestamp
- `revoked_at`: optional revocation timestamp

These relationships enforce referential integrity and support secure token lifecycle management.

## Database Queries

The database query layer sits under `src/db/queries` and abstracts persistence operations away from the HTTP layer.

### `users.ts`

Responsibilities include:

- creating a user
- retrieving a user by email
- retrieving a user by id
- updating user details
- promoting a user to Chirpy Red status

### `chirps.ts`

Responsibilities include:

- creating a chirp
- retrieving all chirps
- retrieving chirps by author
- retrieving a chirp by id
- deleting a chirp

### `refreshTokens.ts`

Responsibilities include:

- storing refresh tokens
- validating token expiry and validity
- revoking tokens as needed

## Security Model

The application follows a token-based security design:

- passwords are hashed before persistence
- access tokens are JWTs
- refresh tokens are stored server-side
- protected routes require a valid JWT bearer token
- webhook routes verify an API key
- custom application errors map cleanly to HTTP responses

## Testing

The project includes unit tests in `src/authentication/auth.test.ts`.

Tests cover:

- JWT creation and validation
- invalid secret rejection
- expired token rejection
- refresh token generation
- bearer token parsing
- malformed header rejection

Run the test suite:

```bash
npm test
```

## Error Handling

The application uses a centralized error handler to return clear HTTP responses for issues such as:

- invalid credentials
- malformed requests
- forbidden access
- missing resources
- unauthorized requests

This helps maintain a clean API contract and improves developer debugging.

## Future Enhancements

This project provides a strong backend foundation and can be extended with:

- pagination for chirp feeds
- search and filtering improvements
- profile endpoints
- follower and follow relationships
- real-time notifications
- CI/CD pipeline setup
- Docker support

## Conclusion

Chripy is a practical full-stack backend exercise focused on secure authentication, database persistence, REST API design, and clean application structure. It demonstrates the type of engineering work expected in a professional software environment and provides a strong base for further expansion.

The project balances learning, implementation discipline, and maintainability, making it suitable as both a technical portfolio project and a strong foundation for future backend work.


