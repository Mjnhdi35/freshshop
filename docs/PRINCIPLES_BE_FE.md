# Nguyên lý thiết kế BE/FE: DI, IoC, Loose/Tight Coupling

## 1) DI (Dependency Injection)

- Ý tưởng: truyền phụ thuộc (services, repo, utils) qua constructor/tham số thay vì tự `new` bên trong.
- Lợi ích: giảm phụ thuộc cứng, dễ test (mock/stub), dễ thay thế implementation.
- NestJS: dùng providers và module system để inject phụ thuộc.
- Vue/Nuxt FE: composables tách logic dùng lại; dependency có thể được truyền qua props/provide/inject.

## 2) IoC (Inversion of Control)

- Container quản lý vòng đời đối tượng, module khai báo `providers`, framework cung cấp instance khi cần.
- Giảm trách nhiệm khởi tạo trong lớp nghiệp vụ, tập trung vào “cái gì” thay vì “làm sao khởi tạo”.

## 3) Loose Coupling vs Tight Coupling

- Tight Coupling: lớp A tạo trực tiếp lớp B (new), phụ thuộc chi tiết B → khó thay thế/test.
- Loose Coupling: lớp A dùng interface/abstraction của B, instance được cung cấp ngoài vào (DI) → test dễ.

## 4) Ứng dụng trong dự án

- BE: Services phụ thuộc repository/Redis thông qua DI (NestJS providers), Guards/Interceptors/Filters cũng do IoC quản lý.
- FE: Composables như `useApi`, `useAuth` tách biệt giao tiếp API/logic; component nhận dữ liệu qua props/sự kiện → giảm coupling UI/logic.

## 5) Nguyên tắc mở rộng

- Lập hợp đồng (interfaces) rõ ràng giữa các tầng.
- Tránh để tầng UI biết chi tiết API nội bộ; dùng composables/stores làm lớp trung gian.
- Tách config qua env/runtimeConfig.
- Viết tests với mock thay vì gọi trực tiếp phụ thuộc thật.
