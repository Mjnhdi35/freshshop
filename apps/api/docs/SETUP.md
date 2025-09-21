# Setup Guide

## Prerequisites

Before setting up the Fresh Shop API, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

## Database Setup

### 1. PostgreSQL (Neon)

1. **Sign up for Neon**
   - Go to [neon.tech](https://neon.tech)
   - Create a new account
   - Create a new project

2. **Get Database URL**
   - Copy the connection string from your Neon dashboard
   - It should look like: `postgresql://username:password@host:port/database?sslmode=require`

### 2. Redis (Upstash)

1. **Sign up for Upstash**
   - Go to [upstash.com](https://upstash.com)
   - Create a new account
   - Create a new Redis database

2. **Get Redis Credentials**
   - Copy the REST URL and token from your Upstash dashboard
   - URL: `https://your-redis-url.upstash.io`
   - Token: `your-redis-token`

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd fresh_shop/apps/api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `apps/api` directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your credentials:

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
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12

# Cookie Configuration
ACCESS_TOKEN_MAX_AGE=900000
REFRESH_TOKEN_MAX_AGE=604800000
```

### 4. Generate JWT Secret

Generate a secure JWT secret:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Or using OpenSSL
openssl rand -base64 32
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Production Mode

```bash
# Build the application
npm run build

# Start the production server
npm run start:prod
```

## Verification

### 1. Check API Health

```bash
curl http://localhost:3000
```

Expected response:

```json
{
  "message": "Hello World! API is running with TypeORM and PostgreSQL"
}
```

### 2. Test Authentication

```bash
# Register a new user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Error**: `Connection to database failed`

**Solution**:

- Check your `DATABASE_URL` in `.env`
- Ensure your Neon database is active
- Verify the connection string format

#### 2. Redis Connection Error

**Error**: `Redis connection failed`

**Solution**:

- Check your `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- Ensure your Upstash database is active
- Verify the credentials are correct

#### 3. JWT Secret Error

**Error**: `JWT secret is required`

**Solution**:

- Ensure `JWT_SECRET` is set in `.env`
- Use a strong, random secret (32+ characters)
- Restart the application after changing the secret

#### 4. Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**:

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or change the port in .env
PORT=3001
```

### Debug Mode

Enable debug logging:

```bash
DEBUG=* npm run dev
```

### Database Migration

If you need to reset the database:

```bash
# Drop and recreate tables
npm run typeorm:drop
npm run typeorm:sync
```

## Development Tools

### Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets**
- **TypeScript Importer**
- **Prettier - Code formatter**
- **ESLint**
- **Thunder Client** (for API testing)

### Useful Commands

```bash
# Lint code
npm run lint

# Format code
npm run format

# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Build for production
npm run build
```

## Next Steps

1. **Explore the API**: Use the [API Documentation](./API.md)
2. **Understand Architecture**: Read the [Architecture Documentation](./ARCHITECTURE.md)
3. **Start Development**: Begin building your features
4. **Add Tests**: Write unit and integration tests
5. **Deploy**: Set up production deployment

## Support

If you encounter any issues:

1. Check the [troubleshooting section](#troubleshooting)
2. Review the [API documentation](./API.md)
3. Check the [architecture documentation](./ARCHITECTURE.md)
4. Open an issue in the repository
