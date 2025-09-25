import { defineEventHandler, getQuery } from "h3";

interface Category {
  id: string;
  name: string;
}
interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  image?: string;
  isFeatured: boolean;
  category?: Category;
}

const CATEGORY_NAMES = ["Điện thoại", "Laptop", "Phụ kiện", "Đồng hồ"] as const;

const MOCK_PRODUCTS: Product[] = Array.from({ length: 40 }).map((_, i) => ({
  id: String(i + 1),
  name: `Sản phẩm ${i + 1}`,
  description: "Mô tả sản phẩm mẫu",
  price: 100000 * ((i % 5) + 1),
  originalPrice: 120000 * ((i % 5) + 1),
  stock: 10 + (i % 7),
  image: "/placeholder-product.jpg",
  isFeatured: i % 3 === 0,
  category: {
    id: String((i % 4) + 1),
    name: CATEGORY_NAMES[i % 4] as string,
  },
}));

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = Number(query.page || 1);
  const pageSize = Number(query.pageSize || 12);
  const q = (query.q as string) || "";
  const categoryId = (query.categoryId as string) || "";

  let items = MOCK_PRODUCTS;
  if (q) {
    const lower = q.toLowerCase();
    items = items.filter((p) => p.name.toLowerCase().includes(lower));
  }
  if (categoryId) {
    items = items.filter((p) => p.category?.id === categoryId);
  }

  const total = items.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = items.slice(start, end);

  return {
    success: true,
    message: "OK",
    data: {
      items: pageItems,
      total,
      page,
      pageSize,
      hasMore: end < total,
    },
    timestamp: new Date().toISOString(),
    statusCode: 200,
  };
});
