# Fresh Shop API

A modern e-commerce API built with NestJS, TypeORM, PostgreSQL, and Redis.

## 🚀 Tech Stack

- **Backend**: NestJS (Node.js framework)
- **Database**: PostgreSQL (Neon)
- **Cache**: Redis (Upstash)
- **Authentication**: JWT with refresh tokens
- **Validation**: class-validator
- **ORM**: TypeORM
- **Language**: TypeScript

## 📁 Project Structure

```
apps/api/
├── src/
│   ├── modules/              # Feature modules
│   │   ├── users/           # User management
│   │   │   ├── dto/         # Data Transfer Objects
│   │   │   ├── services/    # Business logic
│   │   │   ├── controllers/ # HTTP handlers
│   │   │   └── users.module.ts
│   │   └── auth/            # Authentication
│   │       ├── dto/
│   │       ├── services/
│   │       ├── controllers/
│   │       ├── guards/
│   │       ├── strategies/
│   │       └── auth.module.ts
│   ├── entities/            # Database entities
│   ├── utils/               # Utility functions
│   ├── guards/              # Global guards
│   ├── decorators/          # Custom decorators
│   ├── config/              # Configuration
│   └── services/            # Shared services
├── docs/                    # API Documentation
├── package.json
└── README.md
```

## 🛠️ Features

### Authentication & Authorization

- ✅ JWT-based authentication
- ✅ Refresh token mechanism
- ✅ Password hashing with bcrypt
- ✅ Global JWT guard with @Public() decorator
- ✅ Cookie-based token storage

### User Management

- ✅ User CRUD operations
- ✅ Email validation
- ✅ Password strength requirements
- ✅ User profile management

### Security

- ✅ HttpOnly cookies
- ✅ CORS configuration
- ✅ Input validation
- ✅ SQL injection protection
- ✅ XSS protection

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (Neon)
- Redis instance (Upstash)

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment setup**

   ```bash
   cp .env.example .env
   # Edit .env with your database and Redis credentials
   ```

3. **Run the application**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

See [docs/API.md](./docs/API.md) for detailed API documentation.

## 🏗️ Architecture

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for architecture details.

## 🔧 Configuration

### Environment Variables

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (Neon PostgreSQL)
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Redis Configuration (Upstash)
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12

# Cookie Configuration
ACCESS_TOKEN_MAX_AGE=900000
REFRESH_TOKEN_MAX_AGE=604800000
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Development

### Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript strict mode

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
