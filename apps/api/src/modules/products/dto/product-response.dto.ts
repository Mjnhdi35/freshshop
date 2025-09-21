import { CategoryResponseDto } from '../../categories/dto/category-response.dto';

export class ProductResponseDto {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  stock: number;
  image: string;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  attributes: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category?: CategoryResponseDto;
}
