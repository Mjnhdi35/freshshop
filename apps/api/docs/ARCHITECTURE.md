# Architecture Documentation

## System Overview

Fresh Shop API is built using a modular, scalable architecture with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │    │   Web Browser   │    │   Mobile App    │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │     NestJS API Server     │
                    │                           │
                    │  ┌─────────────────────┐  │
                    │  │   Global Guards     │  │
                    │  │   - JWT Guard       │  │
                    │  │   - Public Guard    │  │
                    │  └─────────────────────┘  │
                    │                           │
                    │  ┌─────────────────────┐  │
                    │  │   Controllers       │  │
                    │  │   - Auth Controller │  │
                    │  │   - Users Controller│  │
                    │  └─────────────────────┘  │
                    │                           │
                    │  ┌─────────────────────┐  │
                    │  │   Services          │  │
                    │  │   - Auth Service    │  │
                    │  │   - Users Service   │  │
                    │  │   - Redis Service   │  │
                    │  └─────────────────────┘  │
                    └─────────────┬─────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      Data Layer           │
                    │                           │
                    │  ┌─────────────────────┐  │
                    │  │   PostgreSQL        │  │
                    │  │   (Neon)            │  │
                    │  │   - Users Table     │  │
                    │  │   - Sessions        │  │
                    │  └─────────────────────┘  │
                    │                           │
                    │  ┌─────────────────────┐  │
                    │  │   Redis Cache       │  │
                    │  │   (Upstash)         │  │
                    │  │   - Refresh Tokens  │  │
                    │  │   - Session Data    │  │
                    │  └─────────────────────┘  │
                    └───────────────────────────┘
```

## Core Components

### 1. Application Layer

#### Global Guards

- **JwtGlobalGuard**: Protects all endpoints by default
- **PublicGuard**: Checks for @Public() decorator to bypass JWT

#### Controllers

- **AuthController**: Handles authentication endpoints
- **UsersController**: Handles user management endpoints

### 2. Business Logic Layer

#### Services

- **AuthService**: Authentication and authorization logic
- **UsersService**: User management business logic
- **RedisService**: Cache operations

#### Utils

- **CryptoUtil**: Password hashing and token generation
- **JwtUtil**: JWT token utilities
- **TimeUtil**: Time and expiry calculations
- **CookieUtil**: Cookie management

### 3. Data Access Layer

#### Entities

- **User**: User entity with TypeORM decorators

#### Repositories

- TypeORM repositories for database operations

### 4. Infrastructure Layer

#### Database

- **PostgreSQL (Neon)**: Primary database
- **Redis (Upstash)**: Caching and session storage

#### Configuration

- **Environment Variables**: Application configuration
- **TypeORM Config**: Database connection settings

## Security Architecture

### Authentication Flow

```
1. User Login
   ├── Validate credentials
   ├── Generate access token (15min)
   ├── Generate refresh token (7days)
   ├── Store refresh token in Redis
   └── Set cookies (HttpOnly, Secure, SameSite)

2. API Request
   ├── Check @Public() decorator
   ├── If public → Allow
   ├── If protected → Validate JWT
   ├── If valid → Allow
   └── If invalid → Reject (401)

3. Token Refresh
   ├── Extract refresh token from cookie
   ├── Validate in Redis
   ├── Generate new access token
   └── Update cookie
```

### Security Features

#### JWT Security

- **Short-lived access tokens** (15 minutes)
- **Long-lived refresh tokens** (7 days)
- **Secure token storage** in Redis
- **Automatic token rotation**

#### Cookie Security

- **HttpOnly**: Prevents XSS attacks
- **Secure**: HTTPS only in production
- **SameSite**: Prevents CSRF attacks
- **Automatic expiry**: Tokens expire automatically

#### Password Security

- **bcrypt hashing** with configurable salt rounds
- **Password validation** (minimum 6 characters)
- **No plain text storage**

## Module Structure

### Users Module

```
src/modules/users/
├── dto/
│   ├── create-user.dto.ts
│   ├── update-user.dto.ts
│   └── user-response.dto.ts
├── services/
│   └── users.service.ts
├── controllers/
│   └── users.controller.ts
└── users.module.ts
```

### Auth Module

```
src/modules/auth/
├── dto/
│   ├── login.dto.ts
│   └── register.dto.ts
├── services/
│   └── auth.service.ts
├── controllers/
│   └── auth.controller.ts
├── guards/
│   └── jwt-auth.guard.ts
├── strategies/
│   └── jwt.strategy.ts
└── auth.module.ts
```

## Data Flow

### Request Flow

```
1. HTTP Request
2. CORS Middleware
3. Cookie Parser
4. Global JWT Guard
   ├── Check @Public() decorator
   ├── If public → Continue
   └── If protected → Validate JWT
5. Route Handler
6. Controller
7. Service
8. Repository
9. Database/Redis
10. Response
```

### Error Handling

```
1. Validation Errors (400)
2. Authentication Errors (401)
3. Authorization Errors (403)
4. Not Found Errors (404)
5. Conflict Errors (409)
6. Server Errors (500)
```

## Scalability Considerations

### Horizontal Scaling

- **Stateless design**: No server-side sessions
- **Database connection pooling**: Efficient DB connections
- **Redis clustering**: Distributed caching
- **Load balancer ready**: Can handle multiple instances

### Performance Optimizations

- **Connection pooling**: Database connections
- **Redis caching**: Fast data access
- **JWT validation**: Stateless authentication
- **Efficient queries**: TypeORM optimizations

### Monitoring & Logging

- **Structured logging**: JSON format
- **Error tracking**: Centralized error handling
- **Performance metrics**: Response time tracking
- **Health checks**: Service availability

## Future Enhancements

### Planned Features

- **Rate limiting**: API request throttling
- **API versioning**: Backward compatibility
- **WebSocket support**: Real-time features
- **File upload**: Image and document handling
- **Email service**: Notifications and verification
- **Audit logging**: User action tracking

### Infrastructure Improvements

- **Docker containerization**: Easy deployment
- **Kubernetes orchestration**: Container management
- **CI/CD pipeline**: Automated deployment
- **Monitoring dashboard**: Real-time metrics
- **Backup strategy**: Data protection
