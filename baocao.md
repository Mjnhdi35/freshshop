# Chương 1. TỔNG QUAN

## 1.1. Lý do chọn đề tài

Trong bối cảnh hành vi mua sắm chuyển dịch mạnh mẽ sang môi trường trực tuyến, doanh nghiệp cần một nền tảng thương mại điện tử có khả năng vận hành ổn định, bảo mật cao và dễ dàng mở rộng. Các giải pháp đóng gói tuy nhanh nhưng thường thiếu linh hoạt hoặc chi phí cao khi tùy biến. Đề tài “Fresh Shop” nhằm xây dựng một nền tảng e‑commerce hiện đại, kiến trúc rõ ràng, tối ưu bảo mật/hiệu năng, dễ triển khai thực tế và phù hợp với nhu cầu mở rộng của doanh nghiệp.

Mục tiêu thực tế (gắn với repo):

- Backend chuẩn hoá (NestJS + TypeORM + PostgreSQL + Redis) với DI/IoC, guard toàn cục, response thống nhất, health check, rate‑limit, helmet, CORS tuỳ biến.
- Frontend Nuxt 4 tối ưu SEO/Perf/A11y (meta/OG, preconnect, SWR, robots, sitemap) với Pinia stores, composables chuẩn.
- Tài liệu và hướng dẫn triển khai đầy đủ (Docker/PM2/Nginx) để tái lập và vận hành.

## 1.2. Mục đích thực hiện đề tài

Mục đích là thiết kế và xây dựng một nền tảng e‑commerce hoàn chỉnh gồm API (NestJS) và Web (Nuxt 4), đáp ứng các yêu cầu: kiến trúc chuẩn (DI, IoC, loose coupling), bảo mật, hiệu năng, khả năng mở rộng, tài liệu đầy đủ và quy trình triển khai minh bạch. Sản phẩm phải “production‑ready”: có Docker, Nginx/PM2, cấu hình CORS/HTTPS, health check, rate limiting, và hướng dẫn triển khai rõ ràng.

Chỉ số chấp nhận:

- API đạt: guard JWT toàn cục, RBAC, cookies HttpOnly, 429 rate‑limit, `/api/v1/health`, cấu hình CORS từ `CORS_ORIGIN`.
- Web đạt: lang=vi, meta/OG cơ bản, SWR routeRules, robots/sitemap, skip‑link, dark mode.
- Triển khai: Dockerfile (API/Web), docker‑compose (API/Web/Postgres/Redis), Nginx/PM2 mẫu.

## 1.3. Tổng quan tình hình nghiên cứu (các quy trình/sản phẩm tương tự)

Các nền tảng như Shopify, WooCommerce, Saleor hay MedusaJS thể hiện xu hướng tách biệt frontend/backend, tối ưu trải nghiệm và khả năng tích hợp. Quy trình phát triển được vận dụng: Thu thập yêu cầu → Phân tích → Thiết kế → Cài đặt → Kiểm thử → Triển khai → Bảo trì, đồng thời áp dụng thực hành tốt (OWASP, 12‑factor app, Clean Architecture) để đảm bảo chất lượng kỹ thuật.

Đối chiếu lựa chọn stack:

- NestJS (DI/IoC, decorators, metadata) + TypeORM (decorators mapping, lazy relations) phù hợp mô hình module hoá, giảm coupling, dễ test/bảo trì; tận dụng `reflect-metadata` có sẵn trong repo (xem `apps/api/src/main.ts`, entities `src/entities/*.ts`).
- Nuxt 4 cung cấp SSR/SPA linh hoạt, dễ tối ưu SEO/Perf/A11y; Pinia state đơn giản, composables tách logic (xem `apps/web/app/composables/*`, `stores/*`).

## 1.4. Phạm vi đề tài

Đề tài tập trung vào các chức năng cốt lõi của một nền tảng bán hàng trực tuyến: quản lý người dùng và xác thực (JWT + refresh token, HttpOnly cookie), danh mục, sản phẩm, giỏ hàng, bài viết; cùng với tối ưu SEO/Performance/A11y cho web. Ngoài phạm vi giai đoạn này: thanh toán/giao vận thực tế và CMS nâng cao; đây là hướng mở rộng trong tương lai.

Trong phạm vi (đã có trong code): Auth/Users, Categories, Products, Cart, Posts; Health, Swagger tuỳ chọn; SEO/Perf/A11y cơ bản.
Ngoài phạm vi: Payments/Orders/Email Upload/CDN/Admin UI nâng cao (đã ghi ở lộ trình mở rộng).

## 1.5. Phương pháp nghiên cứu

Kết hợp nghiên cứu tài liệu chính thức (NestJS, Nuxt, TypeORM, Redis) với thực nghiệm theo vòng lặp ngắn; đo lường bằng kiểm thử tự động và Lighthouse; đối chiếu với best practices để hiệu chỉnh kiến trúc/cài đặt; và viết tài liệu song hành để đảm bảo khả năng chuyển giao.

Nguồn tham khảo chính (đã trích ở phần Tài liệu tham khảo): NestJS docs, Nuxt docs, TypeORM docs, Redis, PostgreSQL, OWASP, WCAG, Docker/Nginx/PM2.
Đo lường: Jest/Supertest cho API; Lighthouse cho SEO/Perf/A11y; kiểm thử thủ công các luồng chính.

## 1.6. Giới thiệu đơn vị thực tập

### 1.6.1. Tổng quan về đơn vị thực tập

Đơn vị giả định “Fresh Shop” hoạt động trong lĩnh vực bán lẻ sản phẩm công nghệ qua kênh trực tuyến, đặt mục tiêu chuẩn hóa nền tảng kỹ thuật để mở rộng quy mô.

### 1.6.2. Các sản phẩm của đơn vị thực tập

Website bán hàng, API phục vụ ứng dụng di động/đối tác, và công cụ quản trị nội bộ phục vụ quản lý sản phẩm, đơn hàng, nội dung.

Áp dụng vào dự án: Web Nuxt (giao diện cửa hàng), API NestJS (dịch vụ dữ liệu) làm nền tảng để sau này mở rộng app di động và dashboard quản trị.

## 1.7. Cấu trúc của báo cáo

Chương 1: Tổng quan. Chương 2: Nội dung thực tập. Chương 3: Thực hiện dự án Fresh Shop. Chương 4: Kết luận và hướng phát triển.

Hướng dẫn đọc nhanh:

- Cần cái nhìn tổng quát: đọc Chương 1 và phần “Đối chiếu triển khai”.
- Cần triển khai lại nhanh: xem Phụ lục B (Quick Start) và Phụ lục A (Playbook).
- Cần hiểu kiến trúc/luồng dữ liệu: xem Chương 3.2.x (Thiết kế, Cài đặt, Kiểm thử, Vận hành).

---

# PHẦN NỘI DUNG

# Chương 2. NỘI DUNG THỰC TẬP

## 2.1. Tổng quan thông tin thực tập

Sinh viên thực hiện một dự án e‑commerce thực tế từ khảo sát đến triển khai, tạo ra sản phẩm vận hành được với tài liệu đầy đủ. Kết quả kỳ vọng là nền tảng có thể cài đặt nhanh, cấu hình linh hoạt, mở rộng dễ dàng, và sẵn sàng đưa vào môi trường sản xuất.

## 2.2. Kế hoạch thực tập

- Tuần 1–2: Thu thập yêu cầu, phân tích use case, thiết kế kiến trúc và cơ sở dữ liệu.
- Tuần 3–4: Cài đặt API theo modules; bảo mật JWT/guards/helmet/rate‑limit; kiểm thử.
- Tuần 5–6: Cài đặt Web (UI/UX, stores/composables, SEO/A11y); tích hợp API.
- Tuần 7: Tối ưu, viết tài liệu, Docker hóa và triển khai thử nghiệm.

## 2.3. Tìm hiểu đơn vị thực tập, văn hóa và các kỹ năng cơ bản

Văn hóa kỹ thuật chú trọng chất lượng, bảo mật và trải nghiệm. Kỹ năng cần có: quản lý mã nguồn (Git), review code, viết tài liệu, kiểm thử cơ bản, và triển khai trên môi trường Linux.

## 2.4. Nghiên cứu kỹ thuật và công nghệ

### 2.4.1. Các thuật toán đã sử dụng

**Phân trang**: Offset-based pagination cho danh sách sản phẩm, posts với page/limit parameters.

**Sắp xếp và lọc**: Sort by price/date, filter by category/featured status, search by name/description.

**Hashing**: bcrypt với salt rounds = 12 cho mật khẩu, JWT signing/verification.

**Caching**: LRU strategy cho Redis, SWR (Stale-While-Revalidate) cho frontend.

### 2.4.2. Các phần mềm và công cụ

**Development**: Node.js 18+, npm, Git, VS Code, Postman/Thunder Client.

**Database**: PostgreSQL 15 (Neon cloud), Redis (Upstash cloud).

**Deployment**: Docker 24+, Docker Compose, Nginx 1.24+, PM2 5+.

**Testing**: Jest 30+, Supertest 7+, Lighthouse CI.

**Code Quality**: ESLint 9+, Prettier 3+, TypeScript 5.7+.

### 2.4.3. Các framework

**Backend**: NestJS 11.x (Node.js framework), TypeORM 0.3.27 (ORM).

**Frontend**: Nuxt 4 (Vue.js framework), Pinia (state management), Nuxt UI (component library).

**Styling**: Tailwind CSS v4 (utility-first CSS), PostCSS (CSS processing).

### 2.4.4. Các thư viện

**Bảo mật**: helmet (security headers), express-rate-limit (rate limiting), bcrypt (password hashing), passport-jwt (JWT strategy).

**Validation**: class-validator (input validation), class-transformer (data transformation).

**Utilities**: cookie-parser (cookie handling), compression (gzip compression), @upstash/redis (Redis client).

**Documentation**: @nestjs/swagger (API docs), swagger-ui-express (Swagger UI).

## 2.5. Thực hiện dự án (đối chiếu luồng chính theo mã)

### 2.5.1. Luồng đăng nhập (Auth Flow)

1. Client gửi POST `/api/v1/auth/login` với `email`, `password`.
2. `AuthController.login` → `AuthService.login` kiểm tra user (bcrypt compare), generate access token (JWT) và refresh token (random hex), lưu refresh token vào Redis với TTL (`TimeUtil.parseExpiryToSeconds`).
3. `CookieUtil` set cookies `access_token`, `refresh_token` (HttpOnly, Secure ở production, SameSite strict, maxAge theo ENV).
4. Response được `ResponseInterceptor` chuẩn hóa.

Liên quan file: `apps/api/src/modules/auth/controllers/auth.controller.ts`, `services/auth.service.ts`, `utils/cookie.util.ts`, `services/redis.service.ts`.

### 2.5.2. Luồng lấy profile

1. Client GET `/api/v1/auth/profile` kèm cookie hoặc Bearer.
2. `JwtGlobalGuard` xác thực; `JwtStrategy` lấy user từ DB theo `payload.sub`.
3. `AuthService.getProfile` trả về dữ liệu người dùng (ẩn mật khẩu).

### 2.5.3. Luồng giỏ hàng (Cart)

1. Thêm giỏ: POST `/api/v1/cart/add` (auth bắt buộc, Roles `admin|customer`).
2. `CartService.addToCart` kiểm tra tồn kho (qua `ProductsService`), cộng dồn lượng nếu đã tồn tại, lưu DB.
3. Lấy giỏ: GET `/api/v1/cart` trả về danh sách items, tổng số lượng và tổng tiền (tính server‑side).

Liên quan file: `apps/api/src/modules/cart/*`, `apps/api/src/modules/products/services/products.service.ts`.

### 2.5.4. Bài viết (Posts) – tăng view

1. GET `/api/v1/posts/:id` → `PostsService.findOne` tăng `viewCount` và trả về post kèm author (lazy relation).

### 2.5.5. SEO/Perf/A11y trên Web

- Meta/OG/robots/sitemap (Nuxt config, server route sitemap).
- SWR caching qua `routeRules`.
- Skip‑link/dark mode trong `Header.vue` và `layouts/default.vue`.

## 2.6. Kết quả & bàn giao

- Mã nguồn monorepo: `apps/api` (NestJS), `apps/web` (Nuxt 4), kèm `docs/` tiếng Việt.
- API: Auth/Users, Categories, Products, Cart, Posts; Health; Response format thống nhất; bảo mật theo chuẩn đã nêu.
- Web: UI component hoá, Pinia stores (cart/products/wishlist), composables (`useApi`, `useAuth`, `useProducts`, `useCart`, `useNotify`).
- Hạ tầng: Dockerfiles (API/Web), `docker-compose.yml`, mẫu Nginx/PM2, env examples.
- Tài liệu: Setup/Architecture/Technical Features/Deployment/Checklist; baocao.md đầy đủ.

## 2.7. Rủi ro & biện pháp (áp dụng thực tế)

- Thiếu tính năng thương mại cốt lõi (thanh toán/đơn hàng): lộ trình bổ sung module `orders`, tích hợp Stripe/PayPal với webhook và migrations.
- Quan sát hệ thống chưa đầy đủ: bổ sung APM/metrics/log aggregation; health checks đã có.
- Rủi ro CORS/cookie ở production: dùng domain rõ ràng, `Secure` cookie với HTTPS, cấu hình `CORS_ORIGIN` chính xác.
- Rủi ro tồn kho/đồng bộ: dùng transaction/locking khi triển khai order; hiện tại cart chỉ kiểm tra tồn kho khi thêm/cập nhật.

## 2.5. Thực hiện dự án

### 2.5.1. Cấu trúc dự án

**Monorepo**: Tổ chức mã nguồn theo cấu trúc `apps/api` (NestJS) và `apps/web` (Nuxt 4), chia sẻ cấu hình chung.

**API Architecture**: Áp dụng kiến trúc nhiều lớp (controllers/services/entities), DI/IoC giảm tight coupling, guards/interceptors/filters.

**Frontend Architecture**: Component-based design, Pinia stores cho state management, composables tái sử dụng logic.

### 2.5.2. Quy trình phát triển

**Version Control**: Git với conventional commits, feature branches, pull request reviews.

**Code Quality**: ESLint + Prettier, TypeScript strict mode, pre-commit hooks.

**Testing**: Unit tests (Jest), E2E tests (Supertest), smoke tests cho deployment.

### 2.5.3. Triển khai và vận hành

**Containerization**: Dockerfile riêng cho từng app, multi-stage builds, optimized images.

**Orchestration**: `docker-compose.yml` tích hợp Postgres/Redis, Nginx reverse proxy.

**Alternative Deployment**: PM2 ecosystem cho non-Docker environments.

**Monitoring**: Health checks, error logging, performance metrics cơ bản.

---

# Chương 3. THỰC HIỆN DỰ ÁN: FRESH SHOP

## 3.1. Tổng quan về dự án

### 3.1.1. Mục tiêu dự án

Xây dựng nền tảng e‑commerce hiện đại, production-ready với kiến trúc rõ ràng, bảo mật cao, hiệu năng tốt và khả năng mở rộng. Đáp ứng nhu cầu thương mại điện tử cơ bản: quản lý sản phẩm, giỏ hàng, người dùng, nội dung.

### 3.1.2. Thành phần hệ thống

**Backend API**: NestJS 11 với TypeORM, PostgreSQL, Redis, JWT authentication, role-based access control.

**Frontend Web**: Nuxt 4 với Pinia, Tailwind CSS, responsive design, SEO optimization.

**Database**: PostgreSQL 15 (Neon cloud) cho dữ liệu chính, Redis (Upstash) cho caching và sessions.

**Infrastructure**: Docker containerization, Nginx reverse proxy, PM2 process management.

### 3.1.3. Đặc điểm kỹ thuật

**Architecture**: Clean Architecture, DI/IoC, loose coupling, modular design.

**Security**: JWT + refresh tokens, HttpOnly cookies, bcrypt hashing, helmet middleware, rate limiting.

**Performance**: Lazy loading, Redis caching, SWR, compression, connection pooling.

**Scalability**: Stateless design, horizontal scaling ready, microservice architecture.

## 3.2. Quy trình thực hiện dự án

### 3.2.1. Khảo sát và thu thập yêu cầu

#### 3.2.1.1. Phân tích người dùng

**Khách vãng lai (Anonymous Users)**:

- Mục tiêu: Tìm kiếm, xem thông tin sản phẩm, so sánh giá cả
- Hành vi: Duyệt danh mục, đọc mô tả sản phẩm, xem hình ảnh, đọc bài viết blog
- Ràng buộc: Không thể thêm vào giỏ hàng, không lưu danh sách yêu thích
- Yêu cầu UX: Giao diện trực quan, tải nhanh, dễ điều hướng

**Người dùng đã đăng ký (Registered Users)**:

- Mục tiêu: Mua sắm, quản lý tài khoản, theo dõi đơn hàng
- Hành vi: Đăng nhập/đăng ký, thêm sản phẩm vào giỏ, thanh toán, cập nhật thông tin cá nhân
- Ràng buộc: Xác thực JWT, session management, bảo mật dữ liệu cá nhân
- Yêu cầu UX: Trải nghiệm mượt mà, lưu trạng thái giỏ hàng, thông báo real-time

**Quản trị viên (Admin Users)**:

- Mục tiêu: Quản lý toàn bộ hệ thống, sản phẩm, đơn hàng, nội dung
- Hành vi: CRUD operations, phân quyền người dùng, xem báo cáo, quản lý danh mục
- Ràng buộc: Role-based access control, audit logging, backup dữ liệu
- Yêu cầu UX: Dashboard trực quan, thống kê chi tiết, quản lý hiệu quả

#### 3.2.1.2. Phân tích chức năng nghiệp vụ

**Quản lý sản phẩm**:

- Tạo/sửa/xóa sản phẩm với thông tin: tên, mô tả, giá, hình ảnh, thuộc tính
- Phân loại theo danh mục, đánh dấu sản phẩm nổi bật
- Quản lý tồn kho, cập nhật số lượng tự động khi có đơn hàng
- Tìm kiếm và lọc sản phẩm theo nhiều tiêu chí

**Quản lý giỏ hàng**:

- Thêm/xóa/cập nhật số lượng sản phẩm trong giỏ
- Tính toán tổng tiền, thuế, phí vận chuyển
- Lưu trạng thái giỏ hàng cho người dùng đã đăng nhập
- Đồng bộ giỏ hàng giữa các thiết bị

**Quản lý người dùng**:

- Đăng ký tài khoản với email/password
- Xác thực đăng nhập, quản lý session
- Phân quyền admin/customer
- Cập nhật thông tin cá nhân, đổi mật khẩu

**Quản lý nội dung**:

- Tạo/sửa/xóa bài viết blog
- Quản lý danh mục bài viết, tags
- Hỗ trợ rich text editor, upload hình ảnh
- SEO optimization cho nội dung

#### 3.2.1.3. Ràng buộc kỹ thuật và bảo mật

**Bảo mật**:

- JWT authentication với access token (15 phút) và refresh token (7 ngày)
- HttpOnly cookies để tránh XSS attacks
- SameSite=Strict để chống CSRF
- bcrypt hashing cho mật khẩu với salt rounds = 12
- Rate limiting: 1000 requests/15 phút per IP
- CORS configuration theo domain triển khai

**Hiệu năng**:

- API response time < 500ms cho 95% requests
- Page load time < 3 giây trên 3G
- Database query optimization với indexes
- Redis caching cho session và frequently accessed data
- Lazy loading cho database relationships

**Khả năng mở rộng**:

- Stateless architecture để support horizontal scaling
- Microservice-ready design
- Database connection pooling
- Containerization với Docker

### 3.2.2. Phân tích và đặc tả yêu cầu

#### 3.2.2.1. Thiết kế cơ sở dữ liệu

**Entity Design**:

- **User Entity**: id (UUID), email (unique), name, password (hashed), role (admin/customer), isActive, timestamps
- **Product Entity**: id (UUID), name, description, price, originalPrice, stock, image, images (JSON), isActive, isFeatured, attributes (JSON), categoryId (FK)
- **Category Entity**: id (UUID), name (unique), description, image, isActive, timestamps
- **CartItem Entity**: id (UUID), userId (FK), productId (FK), quantity, timestamps
- **Post Entity**: id (UUID), title, content, excerpt, image, images (JSON), isPublished, isFeatured, tags (JSON), viewCount, authorId (FK), timestamps

**Database Relationships**:

- User 1:N CartItem (lazy loading)
- User 1:N Post (lazy loading)
- Category 1:N Product (lazy loading)
- Product 1:N CartItem (lazy loading)

**Indexes Strategy**:

- Primary keys: UUID cho tất cả entities
- Foreign keys: userId, productId, categoryId, authorId
- Search fields: email (unique), name (products/categories)
- Filter fields: isActive, isFeatured, isPublished
- Composite indexes: (categoryId, isActive), (isPublished, createdAt)

**Phương pháp thiết kế CSDL**:

- Chuẩn hóa (đến 3NF) để loại bỏ dư thừa và cập nhật nhất quán
- Thiết kế theo domain (gần với DDD): mỗi module là một bounded context (users, products, categories, cart, posts)
- Dùng UUID làm khóa chính để thuận lợi cho phân tán và tránh lộ số lượng bản ghi
- Chỉ mục theo truy vấn thực tế, ưu tiên cột lọc/sắp xếp, tránh lạm dụng
- Soft-delete tùy ngữ cảnh bằng cột `isActive` (thay vì xóa cứng)

**ERD (dạng ASCII)**:

```
USERS (id PK, email UK, name, password, role, isActive, createdAt, updatedAt)
   |1
   |\
   | \--< POSTS (id PK, title, content, ..., authorId FK -> USERS.id)
   |
   | \--< CART_ITEMS (id PK, userId FK -> USERS.id, productId FK -> PRODUCTS.id, quantity, ...)

CATEGORIES (id PK, name UK, ...)
   |1
   |\
   | \--< PRODUCTS (id PK, name, price, stock, categoryId FK -> CATEGORIES.id, ...)
                   |
                   | \--< CART_ITEMS (productId FK)
```

**Actors & Use‑cases chính**:

- Khách vãng lai: Duyệt danh mục/sản phẩm, tìm kiếm, đọc bài viết
- Người dùng đã đăng ký: Đăng nhập/đăng ký, quản lý hồ sơ, thêm/cập nhật/xóa giỏ, (tương lai) đặt hàng
- Quản trị viên: CRUD sản phẩm/danh mục/bài viết, quản lý người dùng, (tương lai) xem báo cáo

**Luồng đi dự án (end‑to‑end request flow)**:

1. Client → Nginx reverse proxy → API `/api/v1/*`
2. Middlewares: helmet, compression, rate‑limit, cookie‑parser
3. Global JWT guard kiểm tra `@Public()`/token; Roles guard kiểm tra vai trò
4. Controller nhận request → DTO validation (class‑validator) → Service
5. Service xử lý nghiệp vụ → Repository (TypeORM) → PostgreSQL/Redis
6. ResponseInterceptor chuẩn hóa dữ liệu → trả về Client; Web Nuxt hiển thị, SWR cache

#### 3.2.2.2. API Design và Endpoints

**Authentication Endpoints**:

- POST /auth/register - Đăng ký tài khoản mới
- POST /auth/login - Đăng nhập, trả về JWT tokens
- POST /auth/refresh - Làm mới access token
- POST /auth/logout - Đăng xuất, xóa tokens
- GET /auth/profile - Lấy thông tin profile
- PATCH /auth/profile - Cập nhật thông tin profile

**Product Management**:

- GET /products - Danh sách sản phẩm (có pagination, filter, search)
- GET /products/:id - Chi tiết sản phẩm
- GET /products/featured - Sản phẩm nổi bật
- POST /products - Tạo sản phẩm (Admin only)
- PUT /products/:id - Cập nhật sản phẩm (Admin only)
- DELETE /products/:id - Xóa sản phẩm (Admin only)

**Category Management**:

- GET /categories - Danh sách danh mục
- GET /categories/:id - Chi tiết danh mục
- POST /categories - Tạo danh mục (Admin only)
- PUT /categories/:id - Cập nhật danh mục (Admin only)
- DELETE /categories/:id - Xóa danh mục (Admin only)

**Cart Management**:

- GET /cart - Lấy giỏ hàng của user
- POST /cart/add - Thêm sản phẩm vào giỏ
- PUT /cart/:itemId - Cập nhật số lượng
- DELETE /cart/:itemId - Xóa sản phẩm khỏi giỏ
- DELETE /cart/clear - Xóa toàn bộ giỏ hàng

**Post Management**:

- GET /posts - Danh sách bài viết (published only)
- GET /posts/:id - Chi tiết bài viết
- GET /posts/featured - Bài viết nổi bật
- POST /posts - Tạo bài viết (Admin only)
- PUT /posts/:id - Cập nhật bài viết (Admin only)
- DELETE /posts/:id - Xóa bài viết (Admin only)

#### 3.2.2.3. Response Format Standardization

**Success Response**:

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

**Error Response**:

```json
{
  "success": false,
  "message": "Error description",
  "error": "ErrorType",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/v1/endpoint",
  "details": [
    /* validation errors if any */
  ]
}
```

#### 3.2.2.4. Security và Performance Requirements

**Security Standards**:

- Password hashing: bcrypt với salt rounds = 12
- JWT tokens: access token (15 phút), refresh token (7 ngày)
- Token storage: HttpOnly cookies với SameSite=Strict
- Rate limiting: 1000 requests/15 phút per IP
- Input validation: class-validator với whitelist và forbidNonWhitelisted
- SQL injection protection: TypeORM parameterized queries

**Performance Standards**:

- API response time: < 500ms cho 95% requests
- Database queries: Lazy loading cho relationships
- Caching: Redis cho session data và frequently accessed data
- Pagination: Default 10 items/page, max 100 items/page
- Compression: gzip compression cho responses

### 3.2.3. Thiết kế ứng dụng

#### 3.2.3.1. Backend Architecture Design

**Clean Architecture Implementation**:

- **Presentation Layer**: Controllers xử lý HTTP requests/responses, validation input
- **Business Logic Layer**: Services chứa business logic, orchestrate data flow
- **Data Access Layer**: TypeORM entities và repositories, database operations
- **Infrastructure Layer**: Database connections, external services, configuration

**Dependency Injection & Inversion of Control**:

- NestJS built-in DI container quản lý dependencies
- Constructor injection cho services và repositories
- Interface-based programming để giảm tight coupling
- Module system để organize và encapsulate functionality

**Security Architecture**:

- **Global Guards**: JWT authentication guard bảo vệ tất cả endpoints
- **Public Decorator**: `@Public()` để bypass authentication cho public endpoints
- **Role Guards**: Role-based access control cho admin operations
- **Interceptors**: Response interceptor chuẩn hóa API responses
- **Exception Filters**: Centralized error handling và logging

**Middleware Stack**:

- Helmet: Security headers (XSS, CSRF, clickjacking protection)
- Compression: gzip compression cho responses
- Rate Limiting: 1000 requests/15 phút per IP
- CORS: Configurable cross-origin resource sharing
- Cookie Parser: HttpOnly cookie support

#### 3.2.3.2. Frontend Architecture Design

**Component-Based Architecture**:

- **Atomic Design**: UI components từ atoms → molecules → organisms → templates
- **Reusable Components**: Button, Input, Card, Modal, ConfirmDialog
- **Layout Components**: Header, Footer, Navigation, Sidebar
- **Feature Components**: ProductCard, ProductGrid, SearchBar

**State Management với Pinia**:

- **Products Store**: Quản lý danh sách sản phẩm, pagination, filtering
- **Cart Store**: Giỏ hàng với localStorage persistence
- **Wishlist Store**: Danh sách yêu thích với localStorage persistence
- **Auth Store**: User authentication state và profile

**Composables Pattern**:

- **useApi**: Centralized API client với error handling
- **useAuth**: Authentication logic và user management
- **useProducts**: Product-related operations và state
- **useCart**: Cart operations và calculations
- **useNotify**: Toast notifications system

**SEO & Performance Optimization**:

- **Meta Tags**: Dynamic meta tags cho mỗi page
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD cho search engines
- **Sitemap**: Dynamic sitemap.xml generation
- **Robots.txt**: Search engine crawling directives

**Accessibility (A11y)**:

- **Skip Links**: Keyboard navigation support
- **ARIA Labels**: Screen reader compatibility
- **Color Contrast**: WCAG 2.1 AA compliance
- **Focus Management**: Proper focus indicators
- **Dark Mode**: Theme switching support

#### 3.2.3.3. Database Design Patterns

**Entity Relationships**:

- **One-to-Many**: User → Posts, User → CartItems, Category → Products
- **Many-to-One**: CartItem → User, CartItem → Product, Post → User
- **Lazy Loading**: Relationships loaded on-demand để optimize performance
- **Eager Loading**: Optional eager loading khi cần thiết

**Data Integrity**:

- **Foreign Key Constraints**: Ensure referential integrity
- **Unique Constraints**: Email uniqueness, category name uniqueness
- **Check Constraints**: Price > 0, quantity >= 0
- **Cascade Operations**: Proper cascade delete/update rules

**Performance Optimization**:

- **Indexes**: Strategic indexing cho frequently queried fields
- **Composite Indexes**: Multi-column indexes cho complex queries
- **Query Optimization**: TypeORM query builder cho complex operations
- **Connection Pooling**: Efficient database connection management

#### 3.2.3.4. Metadata & Reflection, TypeScript compile vs JavaScript runtime

**Metadata & Reflection là gì?**

- Metadata là dữ liệu mô tả về cấu trúc chương trình (class, thuộc tính, tham số, decorators). Reflection là khả năng đọc/chỉnh metadata lúc runtime.
- Trong TypeScript, `emitDecoratorMetadata` + thư viện `reflect-metadata` cho phép lưu metadata khi biên dịch và truy xuất ở runtime JS.

**Cách sử dụng trong dự án**

- Decorators của NestJS (`@Controller`, `@Injectable`, `@Module`, `@Get`, `@Post`...) ghi metadata lên class/method. Nest container dùng reflection để:
  - Phát hiện dependency cần inject (constructor types)
  - Lập bản đồ routing (HTTP method, path)
  - Áp dụng guards/interceptors/filters ở đúng cấp (class/handler)
- Decorators của TypeORM (`@Entity`, `@Column`, `@ManyToOne`, `@OneToMany`...) mô tả lược đồ bảng và quan hệ. TypeORM đọc metadata để:
  - Tạo mapping entity ↔ bảng, cột, khóa ngoại
  - Thiết lập lazy/eager relations và cascade rules

**Vì sao cần TypeScript để compile nhưng chạy bằng JavaScript?**

- TypeScript thêm kiểu tĩnh, decorators, emit metadata giúp IDE tốt và bắt lỗi sớm, nhưng Node.js runtime thực thi JavaScript.
- Quy trình: TS → (tsc) → JS + source maps + metadata (reflect) → Node.js chạy JS. Metadata do TS phát ra (khi bật `emitDecoratorMetadata`) cho phép Nest/TypeORM dùng reflection ở runtime.

**Lợi ích thực tế**

- DI tự động (không cần cấu hình container thủ công)
- Routing/validation/guards cấu hình bằng decorators dễ đọc, ít boilerplate
- Mapping DB rõ ràng, tránh lỗi SQL thủ công, bật/tắt lazy loading linh hoạt

#### 3.2.3.5. Lý do chọn NestJS và TypeORM (vì hỗ trợ metadata)

- NestJS xây trên decorators + reflection: Container DI của Nest dựa vào metadata để resolve dependencies, quét modules, áp dụng guards/interceptors/filters và khai báo routes. Điều này giúp kiến trúc module hóa, loose coupling, testability cao.
- TypeORM dựa mạnh vào decorators để định nghĩa entity/column/relation. Metadata giúp tự động hóa mapping, migrations (khi dùng), và hỗ trợ patterns như lazy relations.
- Kết hợp TS decorators + `reflect-metadata` tạo “ngôn ngữ kiến trúc” thống nhất: code mô tả chính nó (self‑descriptive) → giảm sai lệch giữa docs và implementation, tăng năng suất và độ tin cậy.

### 3.2.4. Cài đặt ứng dụng

#### 3.2.4.1. Backend Implementation (NestJS API)

**Module Structure**:

- **AuthModule**: JWT authentication, login/register, profile management
- **UsersModule**: User CRUD operations, role management
- **ProductsModule**: Product management, inventory tracking
- **CategoriesModule**: Category management, hierarchical organization
- **CartModule**: Shopping cart operations, quantity management
- **PostsModule**: Blog/content management, publishing workflow
- **HealthModule**: Health check endpoint cho monitoring
- **RedisModule**: Cache management, session storage

**Security Implementation**:

- **JWT Strategy**: Passport JWT strategy với configurable expiry
- **Password Hashing**: bcrypt với salt rounds từ environment
- **Cookie Management**: HttpOnly, Secure, SameSite cookies
- **Rate Limiting**: express-rate-limit với configurable limits
- **CORS Configuration**: Dynamic origin configuration
- **Helmet Middleware**: Security headers protection

**Database Integration**:

- **TypeORM Configuration**: PostgreSQL connection với SSL support
- **Entity Definitions**: 5 main entities với relationships
- **Lazy Loading**: Performance optimization cho relationships
- **Migration Support**: Database schema versioning
- **Connection Pooling**: Efficient connection management

**API Documentation**:

- **Swagger Integration**: Optional API documentation
- **Response Interceptors**: Standardized API responses
- **Exception Filters**: Centralized error handling
- **Validation Pipes**: Input validation và sanitization

#### 3.2.4.2. Frontend Implementation (Nuxt 4 Web)

**Component Architecture**:

- **UI Components**: Button, Input, Card, Modal, Alert, Badge, Breadcrumb
- **Layout Components**: Header với navigation và dark mode toggle
- **Product Components**: ProductCard, ProductGrid với filtering
- **Form Components**: SearchBar, ConfirmDialog
- **Utility Components**: LoadingSpinner, EmptyState

**State Management**:

- **Pinia Stores**: Products, Cart, Wishlist với persistence
- **Composables**: useApi, useAuth, useProducts, useCart, useNotify
- **Reactive State**: Real-time updates và synchronization
- **Local Storage**: Cart và wishlist persistence

**Routing & Navigation**:

- **Page Routes**: Home, Products, Product Detail, Cart, Auth, Wishlist
- **Dynamic Routes**: Product detail pages với [id].vue
- **Server Routes**: API proxy và sitemap generation
- **Navigation Guards**: Authentication-based route protection

**SEO & Performance**:

- **Meta Tags**: Dynamic meta tags cho mỗi page
- **Open Graph**: Social media optimization
- **Sitemap**: Dynamic sitemap.xml generation
- **Robots.txt**: Search engine directives
- **SWR Caching**: Stale-while-revalidate caching strategy
- **Lazy Loading**: Image và component lazy loading

#### 3.2.4.3. Database Setup & Configuration

**PostgreSQL Configuration**:

- **Cloud Database**: Neon PostgreSQL với SSL support
- **Connection String**: Environment-based configuration
- **SSL Mode**: Required cho production, optional cho development
- **Auto-sync**: Development database synchronization
- **Logging**: Query logging trong development mode

**Redis Configuration**:

- **Cloud Cache**: Upstash Redis với REST API
- **Session Storage**: User session data caching
- **Token Storage**: Refresh token management
- **Cache TTL**: Configurable expiration times

**Environment Management**:

- **Development**: Local development với hot reload
- **Production**: Optimized build với environment variables
- **Docker**: Containerized deployment với environment injection

### 3.2.5. Kiểm thử chất lượng sản phẩm

#### 3.2.5.1. Backend Testing Strategy

**Unit Testing với Jest**:

- **Service Tests**: Business logic testing cho từng service
- **Controller Tests**: HTTP endpoint testing với mocked dependencies
- **Utility Tests**: Helper functions và utility methods
- **Entity Tests**: Database entity validation và relationships
- **Coverage Target**: > 80% code coverage cho critical paths

**Integration Testing**:

- **Database Integration**: Real database testing với test database
- **API Integration**: End-to-end API testing với Supertest
- **Authentication Flow**: Login/register/logout workflow testing
- **Authorization Tests**: Role-based access control validation

**Test Data Management**:

- **Test Fixtures**: Predefined test data cho consistent testing
- **Database Seeding**: Test data setup và cleanup
- **Mock Services**: External service mocking (Redis, email)
- **Test Isolation**: Each test runs independently

#### 3.2.5.2. Frontend Testing Strategy

**Component Testing**:

- **Unit Tests**: Individual component testing với Vue Test Utils
- **Props Testing**: Component props validation và default values
- **Event Testing**: User interaction và event handling
- **Slot Testing**: Component slot content rendering

**Integration Testing**:

- **Store Testing**: Pinia store state management testing
- **Composable Testing**: Custom composables functionality
- **API Integration**: Frontend-backend integration testing
- **Routing Testing**: Navigation và route protection

**E2E Testing**:

- **User Workflows**: Complete user journey testing
- **Cross-browser Testing**: Chrome, Firefox, Safari compatibility
- **Mobile Testing**: Responsive design và touch interactions
- **Performance Testing**: Page load times và user experience

#### 3.2.5.3. Quality Assurance Testing

**Manual Testing Scenarios**:

- **Authentication Flow**: Register → Login → Profile → Logout
- **Product Browsing**: Category navigation → Product listing → Product detail
- **Shopping Cart**: Add to cart → Update quantity → Remove item → Clear cart
- **Search Functionality**: Search products → Filter results → Sort options
- **Admin Operations**: Product management → Category management → User management

**Performance Testing**:

- **API Response Times**: < 500ms cho 95% requests
- **Page Load Times**: < 3 seconds trên 3G connection
- **Database Query Performance**: Optimized queries với proper indexing
- **Memory Usage**: Efficient memory management và garbage collection

**Security Testing**:

- **Authentication Security**: JWT token validation và refresh mechanism
- **Authorization Testing**: Role-based access control verification
- **Input Validation**: SQL injection và XSS prevention testing
- **Cookie Security**: HttpOnly, Secure, SameSite cookie validation

**Accessibility Testing**:

- **WCAG 2.1 AA Compliance**: Screen reader compatibility
- **Keyboard Navigation**: Tab order và focus management
- **Color Contrast**: Sufficient contrast ratios
- **Alternative Text**: Image alt text và ARIA labels

#### 3.2.5.4. Lighthouse Performance Audit

**Performance Metrics**:

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

**SEO Audit**:

- **Meta Tags**: Proper title, description, keywords
- **Structured Data**: JSON-LD markup implementation
- **Sitemap**: XML sitemap generation và submission
- **Robots.txt**: Proper search engine directives

**Best Practices**:

- **HTTPS**: SSL certificate implementation
- **Image Optimization**: WebP format và lazy loading
- **Code Splitting**: Efficient JavaScript bundling
- **Caching**: Proper cache headers và strategies

### 3.2.6. Vận hành và bảo trì ứng dụng

#### 3.2.6.1. Containerization & Orchestration

**Docker Implementation**:

- **Multi-stage Builds**: Optimized Docker images với minimal size
- **API Dockerfile**: Node.js 18 Alpine base, production dependencies only
- **Web Dockerfile**: Node.js 18 Alpine base, Nuxt build optimization
- **Docker Compose**: Integrated services (API, Web, PostgreSQL, Redis)
- **Volume Management**: Persistent data storage cho database

**Container Orchestration**:

- **Service Dependencies**: Proper startup order và health checks
- **Environment Variables**: Centralized configuration management
- **Network Configuration**: Internal service communication
- **Resource Limits**: CPU và memory constraints cho stability

#### 3.2.6.2. Production Deployment

**Nginx Reverse Proxy**:

- **SSL Termination**: TLS 1.3 encryption với Let's Encrypt
- **Load Balancing**: Multiple backend instances support
- **Static File Serving**: Optimized static asset delivery
- **Gzip Compression**: Response compression cho bandwidth optimization
- **Security Headers**: HSTS, X-Frame-Options, CSP implementation

**PM2 Process Management**:

- **Ecosystem Configuration**: Centralized process management
- **Auto-restart**: Process monitoring và automatic recovery
- **Log Management**: Centralized logging với log rotation
- **Cluster Mode**: Multi-instance deployment cho scalability
- **Monitoring**: Built-in monitoring và alerting

#### 3.2.6.3. Monitoring & Maintenance

**Health Monitoring**:

- **Health Endpoints**: `/health` endpoint cho service status
- **Database Monitoring**: Connection pool status và query performance
- **Redis Monitoring**: Cache hit rates và memory usage
- **API Monitoring**: Response times và error rates

**Log Management**:

- **Structured Logging**: JSON format logs cho easy parsing
- **Log Levels**: Debug, Info, Warn, Error classification
- **Log Rotation**: Automatic log file rotation và cleanup
- **Centralized Logging**: ELK stack integration ready

**Backup Strategy**:

- **Database Backups**: Automated PostgreSQL backups
- **Code Backups**: Git repository với multiple remotes
- **Configuration Backups**: Environment và configuration files
- **Disaster Recovery**: Backup restoration procedures

#### 3.2.6.4. Security & Compliance

**Security Hardening**:

- **Firewall Configuration**: Port restrictions và access control
- **SSL/TLS**: End-to-end encryption cho all communications
- **Security Headers**: Comprehensive security header implementation
- **Access Control**: SSH key-based authentication, no password login

**Compliance & Auditing**:

- **Data Protection**: GDPR compliance cho user data
- **Audit Logging**: User action tracking và system events
- **Security Scanning**: Regular vulnerability assessments
- **Update Management**: Automated security updates

#### 3.2.6.5. Performance Optimization

**Caching Strategy**:

- **Redis Caching**: Session data và frequently accessed data
- **CDN Integration**: Static asset delivery optimization
- **Database Optimization**: Query optimization và indexing
- **Application Caching**: In-memory caching cho expensive operations

**Scalability Planning**:

- **Horizontal Scaling**: Load balancer configuration
- **Database Scaling**: Read replicas và connection pooling
- **Microservice Migration**: Service decomposition strategy
- **Cloud Migration**: AWS/Azure/GCP deployment options

## 3.3. Đối chiếu kiến trúc ↔ triển khai

- DI/IoC: NestJS container hoạt động qua metadata decorators; minh chứng ở guards, controllers, modules.
- Loose coupling: Service/Repository tách biệt; utils thuần chức năng; modules độc lập.
- Response format chuẩn: `interceptors/response.interceptor.ts` áp dụng toàn cục.
- Exception handling: `filters/*` bắt và chuẩn hóa error JSON.
- Lazy loading: entity quan hệ `lazy: true` ở Product/Category/CartItem/Post/User.

## 3.3. Giao diện và các chức năng của ứng dụng

### 3.3.1. Giao diện người dùng

**Trang chủ**: Hiển thị sản phẩm nổi bật, danh mục chính, thanh tìm kiếm. Header có logo, menu điều hướng, giỏ hàng, chuyển đổi dark mode. Footer chứa thông tin liên hệ và liên kết hữu ích.

**Trang sản phẩm**:

- Danh sách: Lưới sản phẩm với hình ảnh, tên, giá, nút "Thêm vào giỏ". Bộ lọc theo danh mục, sắp xếp theo giá/ngày.
- Chi tiết: Hình ảnh lớn, mô tả chi tiết, chọn số lượng, nút "Thêm vào giỏ", sản phẩm liên quan.

**Trang giỏ hàng**: Danh sách sản phẩm đã chọn, cập nhật số lượng, xóa sản phẩm, tính tổng tiền, nút "Thanh toán".

**Trang đăng nhập/đăng ký**: Form nhập email, mật khẩu, tên (đăng ký). Validation real-time, thông báo lỗi rõ ràng.

### 3.3.2. Chức năng kỹ thuật

**SEO**: Meta tags động, Open Graph, robots.txt, sitemap.xml, cấu trúc HTML semantic.

**Performance**: SWR caching cho API, lazy loading hình ảnh, preconnect Google Fonts, compression gzip.

**Accessibility**: Skip-link cho keyboard navigation, ARIA labels, contrast ratio đạt chuẩn, hỗ trợ screen reader.

**Responsive**: Mobile-first design, breakpoints cho tablet/desktop, touch-friendly buttons.

## 3.4. Đánh giá tổng quan chất lượng sản phẩm

### 3.4.1. Đánh giá kỹ thuật

**Kiến trúc**: Áp dụng Clean Architecture với DI/IoC, giảm tight coupling. Modules tách biệt rõ ràng, dễ test và bảo trì.

**Bảo mật**: JWT + refresh token, HttpOnly cookies, bcrypt hash mật khẩu, helmet middleware, rate limiting, CORS cấu hình động.

**Hiệu năng**: Lazy loading entities, Redis caching, SWR cho frontend, compression gzip, connection pooling.

**Khả năng mở rộng**: Stateless design, Docker containerization, horizontal scaling ready, microservice architecture.

### 3.4.2. Đánh giá trải nghiệm người dùng

**Giao diện**: Responsive design, dark mode, loading states, error handling thân thiện.

**Tốc độ**: Page load < 3s, API response < 500ms, caching hiệu quả.

**Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, screen reader support.

### 3.4.3. Đánh giá tài liệu và triển khai

**Tài liệu**: README chi tiết, API docs, architecture docs, deployment guides bằng tiếng Việt.

**Triển khai**: Docker Compose, Nginx config, PM2 ecosystem, environment variables, health checks.

**Monitoring**: Basic health endpoint, error logging, performance metrics cơ bản.

---

# Chương 4. KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN

## 4.1. Kết quả đạt được và thách thức

### 4.1.1. Kết quả đạt được

Hoàn thành nền tảng full‑stack production‑ready, có tài liệu tiếng Việt. Áp dụng DI/IoC, loose coupling, tối ưu SEO/Perf/A11y; bổ sung health, rate‑limit, helmet, Swagger; có Docker/Nginx/PM2.

### 4.1.2. Thách thức

Đồng bộ hoá frontend/backend và tài liệu trong thời gian giới hạn; cân bằng giữa bảo mật/hiệu năng/tính năng; tinh chỉnh trải nghiệm người dùng và tiêu chuẩn hóa quy trình phát triển.

## 4.2. Ưu điểm và hạn chế của sản phẩm thực tập

### 4.2.1. Ưu điểm

Kiến trúc sạch, dễ bảo trì; triển khai linh hoạt; bảo mật/hiệu năng được chú trọng; tài liệu đầy đủ; có lộ trình phát triển.

### 4.2.2. Hạn chế

Chưa tích hợp thanh toán thực, chưa có trang quản trị nâng cao, quan sát hệ thống (observability) chưa đầy đủ.

## 4.3. Hướng phát triển sản phẩm thực tập

Tích hợp thanh toán (Stripe), upload ảnh + CDN, admin dashboard, email thông báo, i18n, CI/CD, quan sát (Sentry/Grafana/Prometheus), tối ưu tìm kiếm (full‑text, gợi ý), và nâng cấp hệ thống khuyến nghị sản phẩm.

## 4.4. Bài học kinh nghiệm

Giá trị của kiến trúc chuẩn (DI/IoC), chuẩn hoá quy trình (coding/test/docs), tư duy bảo mật/người dùng từ sớm, và tầm quan trọng của tài liệu trong chuyển giao.

## 4.5. Đánh giá trải nghiệm thực tập tại đơn vị thực tập

Môi trường kỹ thuật tốt, tiêu chuẩn rõ ràng, khuyến khích học hỏi và cải tiến; quy trình minh bạch, tập trung vào chất lượng và tính bền vững.

## 4.6. Các kiến nghị

Duy trì quy ước coding/test/docs; bổ sung pipeline CI; chuẩn hoá giám sát & backup; định kỳ đánh giá bảo mật/hiệu năng; mở rộng lộ trình theo nhu cầu kinh doanh.

---

# TÀI LIỆU THAM KHẢO

[1] NestJS Documentation. "Introduction to NestJS". https://docs.nestjs.com/. Truy cập: 2024.

[2] Nuxt 4 Documentation. "Getting Started with Nuxt 4". https://nuxt.com/docs. Truy cập: 2024.

[3] TypeORM Documentation. "Getting Started with TypeORM". https://typeorm.io/. Truy cập: 2024.

[4] Redis Documentation. "Redis Commands". https://redis.io/commands/. Truy cập: 2024.

[5] PostgreSQL Documentation. "PostgreSQL 15 Documentation". https://www.postgresql.org/docs/15/. Truy cập: 2024.

[6] Docker Documentation. "Docker Compose". https://docs.docker.com/compose/. Truy cập: 2024.

[7] Nginx Documentation. "Nginx Configuration". https://nginx.org/en/docs/. Truy cập: 2024.

[8] OWASP Foundation. "OWASP Top 10 - 2021". https://owasp.org/www-project-top-ten/. Truy cập: 2024.

[9] Web Content Accessibility Guidelines (WCAG) 2.1. "W3C Recommendation". https://www.w3.org/WAI/WCAG21/quickref/. Truy cập: 2024.

[10] Martin Fowler. "Clean Architecture". https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html. Truy cập: 2024.

[11] 12-Factor App Methodology. "The Twelve-Factor App". https://12factor.net/. Truy cập: 2024.

[12] Jest Documentation. "Testing Framework". https://jestjs.io/docs/getting-started. Truy cập: 2024.

[13] Tailwind CSS Documentation. "Utility-First CSS Framework". https://tailwindcss.com/docs. Truy cập: 2024.

[14] Pinia Documentation. "Vue Store Library". https://pinia.vuejs.org/. Truy cập: 2024.

[15] PM2 Documentation. "Process Manager for Node.js". https://pm2.keymetrics.io/docs/. Truy cập: 2024.

---

# Phụ lục A. HƯỚNG DẪN TÁI LẬP DỰ ÁN (REPRODUCIBILITY PLAYBOOK)

Mục tiêu của phụ lục này là giúp bất kỳ kỹ sư nào có thể đọc nhanh, chạy lại, kiểm thử và triển khai dự án một cách nhất quán.

## A.1. Yêu cầu hệ thống

- Node.js 18+ và npm 8+ (hoặc pnpm/yarn)
- Docker 24+ & Docker Compose (khuyến nghị cho production parity)
- PostgreSQL 15 (cục bộ hoặc Neon) và Redis (cục bộ hoặc Upstash) nếu chạy non‑Docker
- OpenSSL/Certbot (nếu cấu hình TLS thật với Nginx)

## A.2. Cấu trúc thư mục cần nắm

```
fresh_shop/
├─ apps/
│  ├─ api/           # NestJS API (TypeScript, TypeORM)
│  └─ web/           # Nuxt 4 Web (Pinia, Tailwind)
├─ docs/             # Tài liệu dự án (VN)
├─ deploy/           # Cấu hình Nginx, PM2
└─ docker-compose.yml
```

## A.3. Biến môi trường (ENV)

Tham khảo mẫu:

- `docs/env/api.env.example.txt`
- `docs/env/web.env.example.txt`

Tạo file `.env` tương ứng (hoặc export biến ENV trong CI/CD). Các biến quan trọng:

- API: `DATABASE_URL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `JWT_SECRET`, `REFRESH_TOKEN_SECRET`, `JWT_EXPIRES_IN`, `REFRESH_TOKEN_EXPIRES_IN`, `PORT`, `CORS_ORIGIN`, `ENABLE_SWAGGER`
- WEB: `API_BASE_URL`

Sinh secret an toàn:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## A.4. Chạy bằng Docker (khuyến nghị)

1. Sửa `docker-compose.yml` nếu cần (ports, domain, volumes)
2. Build & run:

```bash
docker compose up -d --build
docker compose logs -f api | cat
docker compose logs -f web | cat
```

3. Truy cập:

- Web: `http://localhost:3000`
- API: `http://localhost:3001/api/v1` (tuỳ cấu hình compose)

## A.5. Chạy non‑Docker (dev nhanh)

Backend API:

```bash
cd apps/api
npm install
cp ../../docs/env/api.env.example.txt .env  # hoặc tự tạo .env
npm run dev
```

Frontend Web:

```bash
cd apps/web
npm install
cp ../../docs/env/web.env.example.txt .env  # hoặc export API_BASE_URL
npm run dev
```

## A.6. Build production & Preview

API:

```bash
cd apps/api
npm run build && npm run start:prod
```

WEB:

```bash
cd apps/web
npm run build && npm run preview
```

## A.7. Triển khai Nginx (reverse proxy + TLS)

1. Tham khảo `deploy/nginx/fresh_shop.conf` và chỉnh `server_name`, upstreams
2. Kích hoạt cấu hình, reload Nginx
3. Cấp chứng chỉ TLS (Let’s Encrypt) và bật HSTS nếu dùng HTTPS cố định

## A.8. Triển khai PM2 (non‑Docker)

```bash
cd deploy/pm2
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup
```

## A.9. Migrations & Dữ liệu

- Giai đoạn phát triển: bật `synchronize` (đang cấu hình tự động cho môi trường dev)
- Production: dùng migrations có kiểm soát (bổ sung script `migration:generate/run/revert` trong `apps/api/package.json` khi cần)
- Seed dữ liệu: thêm script seeding hoặc tạo endpoints nội bộ/SQL import

## A.10. Kiểm thử & Chất lượng mã

API (Jest/Supertest):

```bash
cd apps/api
npm run test         # unit
npm run test:e2e     # e2e
npm run test:cov     # coverage
```

WEB (Vitest/Vue Test Utils – nếu bổ sung):

```bash
cd apps/web
npm run test
```

Lint/Format:

```bash
cd apps/api && npm run lint && npm run format
cd ../web  && npm run lint && npm run format
```

## A.11. Swagger & Health

- Bật Swagger bằng `ENABLE_SWAGGER=true`, truy cập `/api/v1/docs`
- Endpoint health: `/api/v1/health`

## A.12. Logging & Giám sát

- Log chuẩn hoá JSON (tùy chỉnh thêm Winston/Pino nếu mở rộng)
- Theo dõi response time/error rate; tích hợp ELK/Prometheus+Grafana (khuyến nghị)

## A.13. Xử lý sự cố nhanh (Troubleshooting)

- Database không kết nối: kiểm tra `DATABASE_URL`, SSL mode và firewall
- Redis không hoạt động: kiểm tra REST URL/TOKEN Upstash
- CORS lỗi: điều chỉnh `CORS_ORIGIN` (danh sách domain, phân tách bằng dấu phẩy)
- 401 liên tục: kiểm tra cookie HttpOnly/https, đồng bộ `JWT_SECRET` giữa instances
- Build Nuxt chậm: bật cache, kiểm tra node version, xem lại external modules

## A.14. Quy ước & Quy trình phát triển

- Conventional Commits; PR review; branch theo tính năng
- ESLint/Prettier; TypeScript strict; unit trước khi merge
- Viết/ cập nhật docs đồng thời với code (docs‑as‑code)

## A.15. Lộ trình mở rộng (thực thi)

- Tích hợp thanh toán (Stripe/PayPal), upload media + CDN, admin dashboard
- Order & fulfillment workflow, email/notification
- Observability đầy đủ (APM, metrics, tracing), CI/CD pipeline
- Tách microservices khi lưu lượng tăng; MQ cho tác vụ bất đồng bộ

---

# Phụ lục B. QUICK START (1 TRANG)

1. `cp docs/env/api.env.example.txt apps/api/.env && cp docs/env/web.env.example.txt apps/web/.env`
2. `docker compose up -d --build`
3. Web: `http://localhost:3000` | API: `http://localhost:3001/api/v1`
4. Swagger (tuỳ chọn): đặt `ENABLE_SWAGGER=true` và mở `/api/v1/docs`
5. Health: `/api/v1/health`

---

# Phụ lục D. ĐỐI CHIẾU TRIỂN KHAI (BÁM SÁT MÃ NGUỒN)

Mục tiêu: liệt kê rõ ràng các tính năng đã có trong code và vị trí file để đối chiếu nhanh.

## D.1. API (NestJS)

- Bootstrap & cấu hình toàn cục:
  - `apps/api/src/main.ts`: prefix `api/v1`, ValidationPipe (whitelist/forbid/transform), ResponseInterceptor, AllExceptionsFilter, cookie‑parser, helmet, compression, rate‑limit, CORS (`CORS_ORIGIN`), Swagger (`ENABLE_SWAGGER`), listen `PORT`.
  - `apps/api/src/app.module.ts`: `ConfigModule`, `TypeOrmModule.forRootAsync(getDatabaseConfig)`, `RedisModule`, các feature modules, `APP_GUARD` = `JwtGlobalGuard`.
- Bảo mật & tiện ích:
  - Decorators/Guards: `decorators/public.decorator.ts`, `decorators/roles.decorator.ts`, `guards/jwt-global.guard.ts`, `guards/roles.guard.ts`.
  - Filters/Interceptors: `filters/all-exceptions.filter.ts`, `filters/http-exception.filter.ts`, `interceptors/response.interceptor.ts`.
  - Utils: `utils/crypto.util.ts` (bcrypt), `utils/jwt.util.ts` (expiry), `utils/time.util.ts` (TTL), `utils/cookie.util.ts` (HttpOnly cookies).
- Cấu hình:
  - Database: `src/config/database.config.ts` (PostgreSQL, SSL prod, autoLoadEntities, synchronize dev)
  - Redis: `src/config/redis.config.ts` + `services/redis.service.ts` (Upstash client wrapper)
- Health:
  - `src/modules/health/health.controller.ts` (`GET /api/v1/health`) & `health.module.ts`
- Auth & Users:
  - `src/modules/auth/*` (login/register/refresh/logout/profile+patch), `JwtStrategy` đọc token từ cookie/Authorization.
  - `src/modules/users/*` (get/update self, admin update role), entity `src/entities/user.entity.ts` (hash password hook).
- Catalog & Cart & Posts:
  - Categories: `src/modules/categories/*` (public GET, admin CRUD)
  - Products: `src/modules/products/*` (public GET/featured/byId, admin CRUD), entity lazy relations.
  - Cart: `src/modules/cart/*` (add/get/update/remove/clear) – yêu cầu xác thực.
  - Posts: `src/modules/posts/*` (public list/detail/featured, tạo/sửa/xóa theo quyền; tăng viewCount khi đọc).

## D.2. Entities & Quan hệ (TypeORM)

- `src/entities/user.entity.ts`: 1:N `posts`, 1:N `cartItems` (lazy), hooks hash mật khẩu.
- `src/entities/category.entity.ts`: 1:N `products` (lazy)
- `src/entities/product.entity.ts`: N:1 `category` (lazy), 1:N `cartItems` (lazy)
- `src/entities/cart-item.entity.ts`: N:1 `user`, N:1 `product` (lazy)
- `src/entities/post.entity.ts`: N:1 `author` (lazy)

## D.3. Web (Nuxt 4)

- Cấu hình: `apps/web/nuxt.config.ts` (lang=vi, meta/OG, preconnect, Nitro routeRules SWR, robots/sitemap route)
- Layout/UI: `app/layouts/default.vue` (skip‑link anchor), `components/layout/Header.vue` (search, dark mode, auth menu), `components/layout/Footer.vue`.
- Composables: `app/composables/useApi.ts`, `useAuth.ts`, `useProducts.ts`, `useCart.ts`, `useNotify.ts`.
- Stores: `app/stores/cart.ts` (localStorage), `products.ts`, `wishlist.ts` (localStorage).
- Components: `components/product/*` (Grid/Card), `components/forms/*` (Form/SearchBar), `components/ui/*` (Modal/ConfirmDialog/Alert…).
- Server routes: `app/server/routes/sitemap.xml.get.ts`.

## D.4. Biến môi trường đang dùng

- API: `PORT`, `NODE_ENV`, `DATABASE_URL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `REFRESH_TOKEN_SECRET`, `REFRESH_TOKEN_EXPIRES_IN`, `BCRYPT_SALT_ROUNDS`, `ACCESS_TOKEN_MAX_AGE`, `REFRESH_TOKEN_MAX_AGE`, `CORS_ORIGIN`, `ENABLE_SWAGGER`.
- WEB: `API_BASE_URL`.

Tham khảo mẫu `docs/env/api.env.example.txt` và `docs/env/web.env.example.txt`.

## D.5. Checklist nghiệm thu (đối chiếu nhanh)

- [x] Guard JWT toàn cục + decorator `@Public()`
- [x] RBAC qua `RolesGuard` + `@Roles()`
- [x] Cookies HttpOnly cho access/refresh token
- [x] Rate limiting, helmet, compression
- [x] CORS cấu hình qua `CORS_ORIGIN`
- [x] Health endpoint `/api/v1/health`
- [x] Redis lưu refresh token
- [x] Lazy loading entities TypeORM
- [x] SEO/Perf/A11y trên Nuxt (meta/OG, SWR, preconnect, skip‑link)
