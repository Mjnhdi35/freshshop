# API Documentation

## Base URL

```
http://localhost:3000
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Tokens are stored in HttpOnly cookies for security.

### Token Types

- **Access Token**: Short-lived (15 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used to get new access tokens

## Endpoints

### Authentication

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "isActive": true
  },
  "message": "Registration successful"
}
```

**Cookies Set:**

- `access_token`: JWT access token
- `refresh_token`: Refresh token

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "isActive": true
  },
  "message": "Login successful"
}
```

#### Refresh Token

```http
POST /auth/refresh
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "isActive": true
  },
  "message": "Token refreshed successfully"
}
```

#### Logout

```http
POST /auth/logout
```

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

#### Get Profile

```http
GET /auth/profile
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### User Management

#### Get All Users

```http
GET /users
Authorization: Bearer <access_token>
```

**Response:**

```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get User by ID

```http
GET /users/{id}
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Create User

```http
POST /users
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "email": "newuser@example.com",
  "name": "Jane Doe",
  "password": "password123"
}
```

**Response:**

```json
{
  "id": "uuid",
  "email": "newuser@example.com",
  "name": "Jane Doe",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Update User

```http
PATCH /users/{id}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "isActive": false
}
```

**Response:**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Updated Name",
  "isActive": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Delete User

```http
DELETE /users/{id}
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "message": "User deleted successfully"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

### 409 Conflict

```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "error": "Conflict"
}
```

## Status Codes

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 404  | Not Found             |
| 409  | Conflict              |
| 500  | Internal Server Error |

## Rate Limiting

Currently no rate limiting is implemented, but it's recommended to add rate limiting for production use.

## CORS

The API supports CORS with the following configuration:

- **Origin**: All origins allowed
- **Credentials**: Enabled
- **Methods**: All standard HTTP methods
- **Headers**: All standard headers
