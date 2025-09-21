# Fresh Shop API - Setup Guide

## 🚀 Complete Setup Instructions

This guide provides step-by-step instructions for setting up the Fresh Shop API development environment.

## 📋 Prerequisites

### Required Software

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher (comes with Node.js)
- **Git**: For version control
- **PostgreSQL**: Database server (or Neon cloud account)
- **Redis**: Cache server (or Upstash cloud account)

### Recommended Tools

- **VS Code**: Code editor with TypeScript support
- **Postman**: API testing tool
- **Docker**: For containerized development (optional)

## 🗄️ Database Setup

### Option 1: Neon Cloud (Recommended)

1. **Create Neon Account**
   - Visit [Neon](https://neon.tech/)
   - Sign up for a free account
   - Create a new project

2. **Get Connection String**
   - Copy the connection string from your Neon dashboard
   - Format: `postgresql://username:password@host:port/database?sslmode=require`

### Option 2: Local PostgreSQL

1. **Install PostgreSQL**

   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib

   # macOS (with Homebrew)
   brew install postgresql
   brew services start postgresql

   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE fresh_shop_api;
   CREATE USER fresh_shop_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE fresh_shop_api TO fresh_shop_user;
   ```

## 🔴 Redis Setup

### Option 1: Upstash Cloud (Recommended)

1. **Create Upstash Account**
   - Visit [Upstash](https://upstash.com/)
   - Sign up for a free account
   - Create a new Redis database

2. **Get Credentials**
   - Copy the REST URL and token from your Upstash dashboard

### Option 2: Local Redis

1. **Install Redis**

   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install redis-server

   # macOS (with Homebrew)
   brew install redis
   brew services start redis

   # Windows
   # Download from https://github.com/microsoftarchive/redis/releases
   ```

2. **Start Redis Server**
   ```bash
   redis-server
   ```

## 📦 Project Setup

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

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Redis Configuration
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-refresh-token-secret-minimum-32-characters
REFRESH_TOKEN_EXPIRES_IN=7d

# Security Configuration
BCRYPT_SALT_ROUNDS=12

# Cookie Configuration
ACCESS_TOKEN_MAX_AGE=900000
REFRESH_TOKEN_MAX_AGE=604800000
```

### 4. Generate JWT Secrets

For production, generate secure random secrets:

```bash
# Generate JWT secret (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate refresh token secret (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api/v1`

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

## 🧪 Testing Setup

### Run Tests

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

### Test Database Configuration

For testing, you may want to use a separate test database:

```env
# Add to .env for testing
TEST_DATABASE_URL=postgresql://username:password@host:port/test_database?sslmode=require
```

## 🔧 Development Tools Setup

### VS Code Extensions (Recommended)

Install these VS Code extensions for better development experience:

- **TypeScript Importer**: Auto-import TypeScript modules
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Thunder Client**: API testing (alternative to Postman)
- **PostgreSQL**: Database management
- **Redis**: Redis management

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["typescript"],
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## 🐳 Docker Setup (Optional)

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "run", "start:prod"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - UPSTASH_REDIS_REST_URL=${UPSTASH_REDIS_REST_URL}
      - UPSTASH_REDIS_REST_TOKEN=${UPSTASH_REDIS_REST_TOKEN}
      - JWT_SECRET=${JWT_SECRET}
      - REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET}
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=fresh_shop_api
      - POSTGRES_USER=fresh_shop_user
      - POSTGRES_PASSWORD=your_password
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'

volumes:
  postgres_data:
```

## 🔍 Verification

### 1. Check API Health

```bash
curl http://localhost:3000/api/v1/health
```

### 2. Test Database Connection

```bash
# Check if database is accessible
npm run test:db
```

### 3. Test Redis Connection

```bash
# Check if Redis is accessible
npm run test:redis
```

## 🚨 Troubleshooting

### Common Issues

#### Database Connection Issues

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check connection string format
# Should be: postgresql://user:pass@host:port/db?sslmode=require
```

#### Redis Connection Issues

```bash
# Check if Redis is running
redis-cli ping

# Should return: PONG
```

#### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

#### Permission Issues

```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

### Environment Variables Not Loading

- Ensure `.env` file is in the root directory
- Check for typos in variable names
- Restart the development server after changes

### TypeScript Compilation Errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run build
```

## 📚 Next Steps

After successful setup:

1. **Read the Documentation**
   - [Technical Features](./TECHNICAL_FEATURES.md)
   - [API Endpoints](./API_ENDPOINTS.md)
   - [Database Schema](./DATABASE_SCHEMA.md)

2. **Test the API**
   - Use Postman or Thunder Client
   - Test authentication endpoints
   - Test CRUD operations

3. **Explore the Code**
   - Start with `src/main.ts`
   - Check `src/app.module.ts`
   - Explore entity relationships

4. **Development Workflow**
   - Create feature branches
   - Write tests for new features
   - Follow coding standards

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs**

   ```bash
   npm run dev
   # Look for error messages in the console
   ```

2. **Verify environment variables**

   ```bash
   # Check if all required variables are set
   node -e "console.log(process.env.DATABASE_URL)"
   ```

3. **Test individual components**

   ```bash
   # Test database connection
   npm run test:db

   # Test Redis connection
   npm run test:redis
   ```

4. **Check documentation**
   - Review this setup guide
   - Check API documentation
   - Examine technical features

## 🔄 Updates and Maintenance

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update to latest versions (be careful)
npm install package@latest
```

### Database Migrations

```bash
# Generate migration
npm run migration:generate -- --name=YourMigrationName

# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert
```

### Backup Strategy

```bash
# Database backup
pg_dump your_database > backup.sql

# Restore database
psql your_database < backup.sql
```

This setup guide should get you up and running with the Fresh Shop API. For additional help, refer to the other documentation files in this directory.
