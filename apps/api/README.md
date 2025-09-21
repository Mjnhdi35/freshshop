# Fresh Shop API

A modern, scalable e-commerce API built with NestJS, TypeORM, PostgreSQL, and Redis. This API provides comprehensive functionality for an online shopping platform including user management, product catalog, shopping cart, and content management.

## 🌟 Overview

Fresh Shop API is designed with enterprise-grade architecture, following clean code principles and modern development practices. It provides a robust foundation for building scalable e-commerce applications with comprehensive security, performance optimization, and developer-friendly features.

## 🚀 Tech Stack

### Core Framework

- **NestJS 11.x**: Enterprise-grade Node.js framework with TypeScript
- **TypeScript 5.7**: Strong typing and modern JavaScript features
- **Express**: HTTP server foundation

### Database & ORM

- **PostgreSQL**: Primary relational database (Neon cloud)
- **TypeORM 0.3.27**: Advanced Object-Relational Mapping with lazy loading
- **Redis (Upstash)**: Distributed caching and session storage

### Authentication & Security

- **JWT**: Stateless authentication with refresh tokens
- **bcrypt**: Password hashing with configurable salt rounds
- **Passport.js**: Authentication strategies
- **class-validator**: Input validation and sanitization

### Development Tools

- **ESLint**: Code linting with TypeScript rules
- **Prettier**: Code formatting
- **Jest**: Unit and integration testing
- **Hot Reload**: Development server with watch mode

## 📁 Project Structure

```
apps/api/
├── src/
│   ├── modules/                    # Feature modules
│   │   ├── auth/                   # Authentication & Authorization
│   │   │   ├── controllers/        # HTTP handlers
│   │   │   ├── services/           # Business logic
│   │   │   ├── dto/                # Data Transfer Objects
│   │   │   ├── guards/             # Route protection
│   │   │   ├── strategies/         # Passport strategies
│   │   │   └── auth.module.ts
│   │   ├── users/                  # User management
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── dto/
│   │   │   └── users.module.ts
│   │   ├── products/               # Product catalog
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── dto/
│   │   │   └── products.module.ts
│   │   ├── categories/             # Category management
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── dto/
│   │   │   └── categories.module.ts
│   │   ├── cart/                   # Shopping cart
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── dto/
│   │   │   └── cart.module.ts
│   │   ├── posts/                  # Blog/Content management
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── dto/
│   │   │   └── posts.module.ts
│   │   └── redis/                  # Redis cache module
│   │       └── redis.module.ts
│   ├── entities/                   # Database entities with lazy loading
│   │   ├── user.entity.ts
│   │   ├── product.entity.ts
│   │   ├── category.entity.ts
│   │   ├── cart-item.entity.ts
│   │   └── post.entity.ts
│   ├── guards/                     # Global guards
│   │   ├── jwt-global.guard.ts
│   │   ├── public.guard.ts
│   │   └── roles.guard.ts
│   ├── interceptors/               # Global interceptors
│   │   └── response.interceptor.ts
│   ├── filters/                    # Exception filters
│   │   └── all-exceptions.filter.ts
│   ├── decorators/                  # Custom decorators
│   │   └── public.decorator.ts
│   ├── utils/                      # Utility functions
│   │   ├── crypto.util.ts
│   │   ├── jwt.util.ts
│   │   ├── cookie.util.ts
│   │   └── time.util.ts
│   ├── config/                     # Configuration
│   │   ├── database.config.ts
│   │   └── redis.config.ts
│   ├── app.module.ts               # Root module
│   └── main.ts                     # Application bootstrap
├── docs/                           # Comprehensive documentation
│   ├── TECHNICAL_FEATURES.md       # Technical architecture
│   ├── API_ENDPOINTS.md            # API documentation
│   ├── DATABASE_SCHEMA.md          # Database schema
│   ├── ARCHITECTURE.md             # System architecture
│   └── SETUP.md                    # Setup instructions
├── test/                           # Test files
├── package.json
├── tsconfig.json
├── eslint.config.mjs
└── README.md
```

## 🛠️ Core Features

### 🔐 Authentication & Authorization

- **JWT-based Authentication**: Stateless token-based authentication
- **Refresh Token Strategy**: Enhanced security with token rotation
- **Role-based Access Control**: Admin and customer roles
- **Global JWT Guard**: Protects all endpoints by default
- **Public Route Decorator**: Selective public access with `@Public()`
- **Password Security**: bcrypt hashing with configurable salt rounds
- **HttpOnly Cookies**: Secure token storage

### 👥 User Management

- **User Registration**: Email validation and password strength requirements
- **Profile Management**: Update user information and preferences
- **Password Management**: Secure password change functionality
- **Account Status**: Active/inactive account management
- **Role Management**: Admin and customer role assignment

### 🛍️ Product Catalog

- **Product Management**: Full CRUD operations for products
- **Category Organization**: Hierarchical product categorization
- **Inventory Management**: Stock tracking and management
- **Product Attributes**: Flexible product properties (color, size, etc.)
- **Image Management**: Multiple product images support
- **Featured Products**: Highlighted product functionality
- **Search & Filtering**: Advanced product search capabilities

### 🛒 Shopping Cart

- **Cart Management**: Add, update, remove cart items
- **Quantity Management**: Adjust item quantities
- **Cart Persistence**: User-specific cart storage
- **Cart Clearing**: Bulk cart operations

### 📝 Content Management

- **Blog Posts**: Content creation and management
- **Post Publishing**: Draft and published post states
- **Featured Posts**: Highlighted content functionality
- **Tag System**: Content categorization and tagging
- **View Tracking**: Post view counter
- **Rich Content**: Support for images and rich text

### 🚀 Performance & Scalability

- **Lazy Loading**: Database relationships loaded on-demand
- **Redis Caching**: Distributed caching for performance
- **Connection Pooling**: Efficient database connections
- **Pagination**: Built-in pagination for large datasets
- **Query Optimization**: Optimized database queries
- **Response Interceptors**: Consistent API response format

### 🔒 Security Features

- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: TypeORM parameterized queries
- **XSS Protection**: Input sanitization and validation
- **CORS Configuration**: Controlled cross-origin access
- **Error Handling**: Centralized exception management
- **Rate Limiting**: API rate limiting (configurable)

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher
- **PostgreSQL**: Database server (or Neon cloud account)
- **Redis**: Cache server (or Upstash cloud account)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fresh_shop/apps/api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   # Database Configuration
   DATABASE_URL=postgresql://username:password@host:port/database
   NODE_ENV=development

   # Redis Configuration
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=15m
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRES_IN=7d

   # Security Configuration
   BCRYPT_SALT_ROUNDS=12

   # Server Configuration
   PORT=3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000/api/v1`

## 📚 Documentation

### Comprehensive Documentation

- **[Technical Features](./docs/TECHNICAL_FEATURES.md)**: Detailed technical architecture and features
- **[API Endpoints](./docs/API_ENDPOINTS.md)**: Complete API endpoint documentation
- **[Database Schema](./docs/DATABASE_SCHEMA.md)**: Database structure and relationships
- **[Architecture](./docs/ARCHITECTURE.md)**: System architecture overview
- **[Setup Guide](./docs/SETUP.md)**: Detailed setup instructions

### Key Documentation Highlights

#### Entity Relationships with Lazy Loading

All database entities implement lazy loading for optimal performance:

- **User Entity**: Relationships with posts and cart items
- **Product Entity**: Relationships with categories and cart items
- **Category Entity**: Relationship with products
- **CartItem Entity**: Relationships with users and products
- **Post Entity**: Relationship with author (user)

#### Security Implementation

- **JWT Authentication**: Stateless token-based authentication
- **Role-based Access Control**: Admin and customer roles
- **Password Security**: bcrypt hashing with configurable salt rounds
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: TypeORM parameterized queries

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Test Configuration

- **Jest**: Testing framework with TypeScript support
- **Supertest**: HTTP assertion library for API testing
- **Coverage Reports**: Comprehensive code coverage tracking
- **Test Database**: Separate test database configuration

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
UPSTASH_REDIS_REST_URL=your_production_redis_url
UPSTASH_REDIS_REST_TOKEN=your_production_redis_token
JWT_SECRET=your_production_jwt_secret
REFRESH_TOKEN_SECRET=your_production_refresh_secret
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run start:debug  # Start with debugging enabled

# Building
npm run build        # Build for production
npm run start:prod   # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:cov     # Run tests with coverage
npm run test:watch   # Run tests in watch mode
```

### Code Style

- **ESLint**: Enforces code quality and consistency
- **Prettier**: Automatic code formatting
- **TypeScript**: Strong typing and modern features
- **Conventional Commits**: Standardized commit messages

## 🏗️ Architecture Patterns

### Clean Architecture

- **Separation of Concerns**: Clear separation between layers
- **Dependency Injection**: NestJS built-in DI container
- **Repository Pattern**: Data access abstraction
- **Service Layer**: Business logic encapsulation

### Design Patterns

- **Module Pattern**: Feature-based module organization
- **Guard Pattern**: Route protection and authorization
- **Interceptor Pattern**: Cross-cutting concerns
- **Filter Pattern**: Exception handling

## 📊 Performance Considerations

### Database Optimization

- **Lazy Loading**: Relationships loaded on-demand
- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Optimized database queries
- **Indexing Strategy**: Proper database indexing

### Caching Strategy

- **Redis Integration**: Distributed caching
- **Session Storage**: Redis-based session management
- **Query Result Caching**: Frequently accessed data
- **Token Caching**: Refresh token storage

### Scalability Features

- **Stateless Design**: Horizontal scaling support
- **Microservice Ready**: Modular architecture
- **Load Balancing**: Multiple instance support
- **Database Sharding**: Large-scale data support

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Standards

- Follow TypeScript best practices
- Write comprehensive tests
- Document new features
- Follow conventional commit format
- Ensure code passes linting

## 📄 License

This project is licensed under the UNLICENSED license.

## 🆘 Support

For support and questions:

- Check the [documentation](./docs/) for detailed guides
- Review the [API endpoints](./docs/API_ENDPOINTS.md) for usage examples
- Examine the [technical features](./docs/TECHNICAL_FEATURES.md) for architecture details

## 🔄 Changelog

### Recent Updates

- ✅ Implemented lazy loading for all entity relationships
- ✅ Added comprehensive technical documentation
- ✅ Enhanced security with role-based access control
- ✅ Improved performance with Redis caching
- ✅ Added shopping cart functionality
- ✅ Implemented content management system
- ✅ Added comprehensive API documentation

---

**Fresh Shop API** - Building the future of e-commerce with modern technology and best practices.
