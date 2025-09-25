# Fresh Shop API - Tính năng kỹ thuật

## 🏗️ Tổng quan kiến trúc

Fresh Shop API is a modern, scalable e-commerce backend built with NestJS framework, following clean architecture principles and enterprise-grade patterns.

### Thành phần kiến trúc

```
┌─────────────────────────────────────────────────────────────┐
│                    Fresh Shop API                           │
├─────────────────────────────────────────────────────────────┤
│  Presentation Layer (Controllers)                         │
│  ├── AuthController                                         │
│  ├── UsersController                                        │
│  ├── ProductsController                                     │
│  ├── CategoriesController                                   │
│  ├── PostsController                                        │
│  └── CartController                                         │
├─────────────────────────────────────────────────────────────┤
│  Business Logic Layer (Services)                           │
│  ├── AuthService                                            │
│  ├── UsersService                                           │
│  ├── ProductsService                                        │
│  ├── CategoriesService                                      │
│  ├── PostsService                                           │
│  └── CartService                                            │
├─────────────────────────────────────────────────────────────┤
│  Data Access Layer (Entities & Repositories)              │
│  ├── User Entity                                            │
│  ├── Product Entity                                        │
│  ├── Category Entity                                       │
│  ├── Post Entity                                           │
│  └── CartItem Entity                                       │
├─────────────────────────────────────────────────────────────┤
│  Infrastructure Layer                                      │
│  ├── PostgreSQL Database (Neon)                            │
│  ├── Redis Cache (Upstash)                                 │
│  ├── JWT Authentication                                    │
│  └── Global Guards & Interceptors                          │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Công nghệ

### Backend Framework

- **NestJS 11.x**: Enterprise-grade Node.js framework
- **TypeScript 5.7**: Strong typing and modern JavaScript features
- **Express**: HTTP server under the hood

### Database & ORM

- **PostgreSQL**: Primary relational database (Neon cloud)
- **TypeORM 0.3.27**: Object-Relational Mapping with advanced features
- **Entity Relationships**: Proper foreign keys and constraints

### Bộ nhớ đệm & Phiên

- **Redis (Upstash)**: Distributed caching and session storage
- **JWT Tokens**: Stateless authentication
- **Refresh Token Strategy**: Enhanced security

### Bảo mật & Kiểm tra dữ liệu

- **bcrypt**: Password hashing with configurable salt rounds
- **class-validator**: Input validation and sanitization
- **class-transformer**: Data transformation
- **CORS**: Cross-origin resource sharing
- **HttpOnly Cookies**: Secure token storage

## 🗄️ Lược đồ & Entities

### Entity Relationships with Lazy Loading

#### User Entity

```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) email: string;
  @Column() name: string;
  @Column() password: string;
  @Column({ default: true }) isActive: boolean;
  @Column({ type: 'enum', enum: ['admin', 'customer'], default: 'customer' })
  role: 'admin' | 'customer';

  // Lazy-loaded relationships
  @OneToMany(() => Post, (post) => post.author, { lazy: true })
  posts: Promise<Post[]>;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user, { lazy: true })
  cartItems: Promise<CartItem[]>;
}
```

#### Product Entity

```typescript
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @Column({ type: 'text', nullable: true }) description: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 }) price: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  originalPrice: number;
  @Column({ default: 0 }) stock: number;
  @Column({ nullable: true }) image: string;
  @Column({ type: 'json', nullable: true }) images: string[];
  @Column({ default: true }) isActive: boolean;
  @Column({ default: false }) isFeatured: boolean;
  @Column({ type: 'json', nullable: true }) attributes: Record<string, any>;

  // Lazy-loaded relationships
  @ManyToOne(() => Category, (category) => category.products, {
    lazy: true,
    eager: false,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Promise<Category>;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product, {
    lazy: true,
    eager: false,
  })
  cartItems: Promise<CartItem[]>;
}
```

#### Category Entity

```typescript
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) name: string;
  @Column({ nullable: true }) description: string;
  @Column({ nullable: true }) image: string;
  @Column({ default: true }) isActive: boolean;

  // Lazy-loaded relationship
  @OneToMany(() => Product, (product) => product.category, {
    lazy: true,
    eager: false,
  })
  products: Promise<Product[]>;
}
```

#### CartItem Entity

```typescript
@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() userId: string;
  @Column() productId: string;
  @Column({ type: 'int', default: 1 }) quantity: number;

  // Lazy-loaded relationships
  @ManyToOne(() => User, (user) => user.cartItems, { lazy: true, eager: false })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    lazy: true,
    eager: false,
  })
  @JoinColumn({ name: 'productId' })
  product: Promise<Product>;
}
```

#### Post Entity

```typescript
@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() title: string;
  @Column({ type: 'text' }) content: string;
  @Column({ type: 'text', nullable: true }) excerpt: string;
  @Column({ nullable: true }) image: string;
  @Column({ type: 'json', nullable: true }) images: string[];
  @Column({ default: true }) isPublished: boolean;
  @Column({ default: false }) isFeatured: boolean;
  @Column({ type: 'json', nullable: true }) tags: string[];
  @Column({ default: 0 }) viewCount: number;

  // Lazy-loaded relationship
  @ManyToOne(() => User, (user) => user.posts, { lazy: true, eager: false })
  @JoinColumn({ name: 'authorId' })
  author: Promise<User>;
}
```

## 🔐 Bảo mật

### Authentication & Authorization

- **JWT-based Authentication**: Stateless token-based auth
- **Refresh Token Strategy**: Enhanced security with token rotation
- **Role-based Access Control**: Admin and customer roles
- **Global JWT Guard**: Protects all endpoints by default
- **Public Route Decorator**: Selective public access with `@Public()`

### Password Security

- **bcrypt Hashing**: Configurable salt rounds (default: 12)
- **Automatic Password Hashing**: Before insert/update hooks
- **Password Validation**: Built-in strength requirements

### Data Protection

- **Input Validation**: class-validator with whitelist and forbidNonWhitelisted
- **SQL Injection Protection**: TypeORM parameterized queries
- **XSS Protection**: Input sanitization and validation
- **CORS Configuration**: Controlled cross-origin access

## 🚀 Tối ưu hiệu năng

### Database Optimizations

- **Lazy Loading**: Relationships loaded only when accessed
- **Eager Loading Control**: Configurable eager loading per relationship
- **Connection Pooling**: TypeORM connection management
- **Query Optimization**: Proper indexing and foreign keys

### Caching Strategy

- **Redis Integration**: Distributed caching with Upstash
- **Session Storage**: Redis-based session management
- **Token Caching**: Refresh token storage in Redis

### Response Optimization

- **Global Response Interceptor**: Consistent API response format
- **Data Transformation**: Automatic DTO transformation
- **Error Handling**: Centralized exception filtering

## 🛠️ Hỗ trợ phát triển

### Code Quality

- **ESLint**: Code linting with TypeScript rules
- **Prettier**: Code formatting
- **TypeScript**: Strong typing and modern features
- **Jest**: Unit and integration testing

### Development Tools

- **Hot Reload**: Development server with watch mode
- **Debug Mode**: Node.js debugging support
- **Environment Configuration**: Flexible environment management
- **Database Synchronization**: Auto-sync in development

## 📊 Tính năng API

### RESTful Design

- **RESTful Endpoints**: Standard HTTP methods and status codes
- **API Versioning**: `/api/v1` prefix
- **Consistent Response Format**: Standardized JSON responses
- **Error Handling**: Comprehensive error responses

### Data Transfer Objects (DTOs)

- **Input Validation**: Request data validation
- **Data Transformation**: Automatic type conversion
- **Whitelist Filtering**: Only allowed properties
- **Nested Validation**: Complex object validation

### Global Features

- **Response Interceptor**: Consistent response format
- **Exception Filter**: Centralized error handling
- **Validation Pipe**: Global input validation
- **Cookie Parser**: HTTP-only cookie support

## 🔧 Quản lý cấu hình

### Environment Variables

- **Database Configuration**: PostgreSQL connection settings
- **Redis Configuration**: Upstash Redis settings
- **JWT Configuration**: Token expiry and secrets
- **Security Configuration**: bcrypt salt rounds

### Database Configuration

- **SSL Support**: Production SSL with certificate validation
- **Auto-sync**: Development database synchronization
- **Logging**: Query logging in development
- **Entity Auto-loading**: Automatic entity discovery

## 📈 Khả năng mở rộng

### Horizontal Scaling

- **Stateless Design**: JWT-based stateless authentication
- **Redis Caching**: Distributed cache support
- **Database Connection Pooling**: Efficient connection management
- **Microservice Ready**: Modular architecture

### Performance Monitoring

- **Request/Response Logging**: Comprehensive logging
- **Error Tracking**: Centralized error handling
- **Performance Metrics**: Response time tracking
- **Health Checks**: Application health monitoring

## 🔄 Luồng dữ liệu

### Request Processing Pipeline

```
Request → Global Guards → Controllers → Services → Repositories → Database
    ↓
Response Interceptor ← Exception Filter ← Business Logic ← Data Access
```

### Authentication Flow

```
Login Request → AuthService → Password Validation → JWT Generation → Cookie Setting
    ↓
Protected Request → JWT Guard → Token Validation → User Context → Business Logic
```

### Database Operations

```
Service Method → Repository → TypeORM → PostgreSQL
    ↓
Lazy Loading → Relationship Resolution → Data Transformation → Response
```

## 🧪 Chiến lược kiểm thử

### Giải thích nguyên lý (DI, IoC, Loose/Tight Coupling)

- DI (Dependency Injection): Truyền phụ thuộc vào class qua constructor/provider → giảm phụ thuộc cứng (tight coupling).
- IoC (Inversion of Control): Container kiểm soát vòng đời & cung cấp phụ thuộc, code chỉ định interface/contract.
- Loose Coupling: Thành phần có thể thay thế/test dễ vì chỉ phụ thuộc interface, không phụ thuộc implementation cụ thể.
- Tight Coupling: Thành phần gắn chặt implementation → khó test/thay thế.

### Test Configuration

- **Jest**: Testing framework
- **Supertest**: HTTP assertion library
- **Coverage Reports**: Code coverage tracking
- **E2E Testing**: End-to-end test support

### Test Types

- **Unit Tests**: Individual component testing
- **Integration Tests**: Service integration testing
- **E2E Tests**: Full application testing
- **Performance Tests**: Load and stress testing

This technical documentation provides a comprehensive overview of the Fresh Shop API's architecture, features, and capabilities, serving as a reference for developers and stakeholders.
