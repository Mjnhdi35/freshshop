# Fresh Shop API - Endpoints Documentation

## 🌐 Base URL

```
http://localhost:3000/api/v1
```

## 🔐 Authentication Endpoints

### POST /auth/register

Register a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "SecurePassword123!"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "statusCode": 201
}
```

### POST /auth/login

Authenticate user and receive JWT tokens.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "customer"
    },
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "statusCode": 200
}
```

### POST /auth/refresh

Refresh access token using refresh token.

**Request Body:**

```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "new_jwt_access_token",
    "refreshToken": "new_jwt_refresh_token"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "statusCode": 200
}
```

### POST /auth/logout

Logout user and invalidate tokens.

**Response:**

```json
{
  "success": true,
  "message": "Logout successful",
  "data": null,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "statusCode": 200
}
```

## 👥 User Management Endpoints

### GET /users/profile

Get current user profile.

**Headers:** `Authorization: Bearer <access_token>`

**Response:**

```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "statusCode": 200
}
```

### PUT /users/profile

Update current user profile.

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**

```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "uuid",
    "email": "johnsmith@example.com",
    "name": "John Smith",
    "role": "customer",
    "isActive": true,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "statusCode": 200
}
```

### PUT /users/change-password

Change user password.

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**

```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": null,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "statusCode": 200
}
```

## 🛍️ Product Management Endpoints

### GET /products

Get all products with pagination and filtering.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category ID
- `featured` (optional): Filter featured products (true/false)
- `search` (optional): Search in product name and description

**Response:**

```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "Product Name",
        "description": "Product description",
        "price": 99.99,
        "originalPrice": 129.99,
        "stock": 50,
        "image": "product-image.jpg",
        "images": ["image1.jpg", "image2.jpg"],
        "isActive": true,
        "isFeatured": false,
        "attributes": {
          "color": "red",
          "size": "M"
        },
        "categoryId": "category-uuid",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "statusCode": 200
}
```

### GET /products/:id

Get product by ID.

**Response:**

```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": "uuid",
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "originalPrice": 129.99,
    "stock": 50,
    "image": "product-image.jpg",
    "images": ["image1.jpg", "image2.jpg"],
    "isActive": true,
    "isFeatured": false,
    "attributes": {
      "color": "red",
      "size": "M"
    },
    "categoryId": "category-uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "statusCode": 200
}
```

### POST /products

Create new product (Admin only).

**Headers:** `Authorization: Bearer <admin_access_token>`

**Request Body:**

```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "originalPrice": 129.99,
  "stock": 50,
  "image": "product-image.jpg",
  "images": ["image1.jpg", "image2.jpg"],
  "isActive": true,
  "isFeatured": false,
  "attributes": {
    "color": "red",
    "size": "M"
  },
  "categoryId": "category-uuid"
}
```

### PUT /products/:id

Update product (Admin only).

**Headers:** `Authorization: Bearer <admin_access_token>`

### DELETE /products/:id

Delete product (Admin only).

**Headers:** `Authorization: Bearer <admin_access_token>`

## 📂 Category Management Endpoints

### GET /categories

Get all categories.

**Response:**

```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Electronics",
      "description": "Electronic products",
      "image": "electronics.jpg",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "timestamp": "2024-01-01T00:00:00.000Z",
  "statusCode": 200
}
```

### GET /categories/:id

Get category by ID.

### POST /categories

Create new category (Admin only).

**Headers:** `Authorization: Bearer <admin_access_token>`

**Request Body:**

```json
{
  "name": "New Category",
  "description": "Category description",
  "image": "category-image.jpg"
}
```

### PUT /categories/:id

Update category (Admin only).

### DELETE /categories/:id

Delete category (Admin only).

## 🛒 Shopping Cart Endpoints

### GET /cart

Get user's shopping cart.

**Headers:** `Authorization: Bearer <access_token>`

**Response:**

```json
{
  "success": true,
  "message": "Cart retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "userId": "user-uuid",
      "productId": "product-uuid",
      "quantity": 2,
      "product": {
        "id": "product-uuid",
        "name": "Product Name",
        "price": 99.99,
        "image": "product-image.jpg"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "timestamp": "2024-01-01T00:00:00.000Z",
  "statusCode": 200
}
```

### POST /cart/add

Add product to cart.

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**

```json
{
  "productId": "product-uuid",
  "quantity": 1
}
```

### PUT /cart/:id

Update cart item quantity.

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**

```json
{
  "quantity": 3
}
```

### DELETE /cart/:id

Remove item from cart.

**Headers:** `Authorization: Bearer <access_token>`

### DELETE /cart/clear

Clear entire cart.

**Headers:** `Authorization: Bearer <access_token>`

## 📝 Blog/Posts Endpoints

### GET /posts

Get all published posts with pagination.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `featured` (optional): Filter featured posts (true/false)
- `search` (optional): Search in post title and content

**Response:**

```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": {
    "posts": [
      {
        "id": "uuid",
        "title": "Post Title",
        "content": "Post content...",
        "excerpt": "Post excerpt...",
        "image": "post-image.jpg",
        "images": ["image1.jpg", "image2.jpg"],
        "isPublished": true,
        "isFeatured": false,
        "tags": ["tag1", "tag2"],
        "viewCount": 100,
        "authorId": "author-uuid",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "statusCode": 200
}
```

### GET /posts/:id

Get post by ID.

### POST /posts

Create new post (Admin only).

**Headers:** `Authorization: Bearer <admin_access_token>`

**Request Body:**

```json
{
  "title": "New Post Title",
  "content": "Post content...",
  "excerpt": "Post excerpt...",
  "image": "post-image.jpg",
  "images": ["image1.jpg", "image2.jpg"],
  "isPublished": true,
  "isFeatured": false,
  "tags": ["tag1", "tag2"]
}
```

### PUT /posts/:id

Update post (Admin only).

### DELETE /posts/:id

Delete post (Admin only).

## 🔒 Authentication Requirements

### Public Endpoints (No Authentication Required)

- `POST /auth/register`
- `POST /auth/login`
- `GET /products` (with filters)
- `GET /products/:id`
- `GET /categories`
- `GET /categories/:id`
- `GET /posts` (published only)
- `GET /posts/:id`

### Protected Endpoints (Authentication Required)

- All `/users/*` endpoints
- All `/cart/*` endpoints
- `POST /auth/refresh`
- `POST /auth/logout`

### Admin Only Endpoints (Admin Role Required)

- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`
- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`

## 📊 Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    /* response data */
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "statusCode": 200
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "error": "ErrorType",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/v1/endpoint",
  "details": [
    /* validation errors if any */
  ]
}
```

## 🚨 Error Codes

- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Invalid or missing token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found (Resource not found)
- `409` - Conflict (Duplicate resource)
- `500` - Internal Server Error

## 📝 Notes

- All timestamps are in ISO 8601 format
- All monetary values are in decimal format
- Pagination is 1-indexed
- File uploads are handled via base64 encoding or file URLs
- All endpoints support CORS for cross-origin requests
- Rate limiting may be applied in production
