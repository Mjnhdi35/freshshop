import { defineEventHandler, getRouterParam } from "h3";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id") as string;

  const idx = Number(id);
  if (!idx || idx < 1 || idx > 40) {
    return {
      success: false,
      message: "Not found",
      error: "NotFound",
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: event.path,
    };
  }

  const product = {
    id,
    name: `Sản phẩm ${id}`,
    description: "Mô tả sản phẩm mẫu",
    price: 100000 * ((idx % 5) + 1),
    originalPrice: 120000 * ((idx % 5) + 1),
    stock: 10 + (idx % 7),
    image: "/placeholder-product.jpg",
    isFeatured: idx % 3 === 0,
    category: {
      id: String((idx % 4) + 1),
      name: ["Điện thoại", "Laptop", "Phụ kiện", "Đồng hồ"][idx % 4],
    },
  };

  return {
    success: true,
    message: "OK",
    data: product,
    timestamp: new Date().toISOString(),
    statusCode: 200,
  };
});
