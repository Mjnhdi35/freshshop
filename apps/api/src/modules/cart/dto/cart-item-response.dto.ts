import { ProductResponseDto } from '../../products/dto/product-response.dto';

export class CartItemResponseDto {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: ProductResponseDto;
}

export class CartResponseDto {
  items: CartItemResponseDto[];
  totalItems: number;
  totalPrice: number;
}
