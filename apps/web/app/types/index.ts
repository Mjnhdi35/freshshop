export interface Category {
  id: string;
  name: string;
}

export interface Product {
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

export interface MoneySummary {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

export interface CartItem {
  id: string; // product id
  product: Product;
  quantity: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export type Id = string;
