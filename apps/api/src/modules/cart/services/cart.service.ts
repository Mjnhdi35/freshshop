import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../../../entities/cart-item.entity';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';
import {
  CartItemResponseDto,
  CartResponseDto,
} from '../dto/cart-item-response.dto';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private productsService: ProductsService,
  ) {}

  async addToCart(
    addToCartDto: AddToCartDto,
    userId: string,
  ): Promise<CartItemResponseDto> {
    const { productId, quantity } = addToCartDto;

    // Check if product exists and has enough stock
    const product = await this.productsService.findOne(productId);
    if (product.stock < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    // Check if item already exists in cart
    const existingItem = await this.cartItemRepository.findOne({
      where: { userId, productId },
      relations: ['product'],
    });

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
      const updatedItem = await this.cartItemRepository.save(existingItem);
      return await this.toResponseDto(updatedItem);
    } else {
      // Create new cart item
      const cartItem = this.cartItemRepository.create({
        userId,
        productId,
        quantity,
      });
      const savedItem = await this.cartItemRepository.save(cartItem);
      return await this.toResponseDto(savedItem);
    }
  }

  async getCart(userId: string): Promise<CartResponseDto> {
    const items = await this.cartItemRepository.find({
      where: { userId },
      relations: ['product', 'product.category'],
      order: { createdAt: 'DESC' },
    });

    const cartItems = await Promise.all(
      items.map((item) => this.toResponseDto(item)),
    );
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    return {
      items: cartItems,
      totalItems,
      totalPrice,
    };
  }

  async updateCartItem(
    itemId: string,
    updateCartItemDto: UpdateCartItemDto,
    userId: string,
  ): Promise<CartItemResponseDto> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: itemId, userId },
      relations: ['product'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    // Check stock availability - await the lazy-loaded product
    const product = await cartItem.product;
    if (product.stock < updateCartItemDto.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    cartItem.quantity = updateCartItemDto.quantity;
    const updatedItem = await this.cartItemRepository.save(cartItem);
    return await this.toResponseDto(updatedItem);
  }

  async removeFromCart(itemId: string, userId: string): Promise<void> {
    const result = await this.cartItemRepository.delete({ id: itemId, userId });

    if (result.affected === 0) {
      throw new NotFoundException('Cart item not found');
    }
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartItemRepository.delete({ userId });
  }

  private async toResponseDto(
    cartItem: CartItem,
  ): Promise<CartItemResponseDto> {
    const product = await cartItem.product;
    const category = product.category ? await product.category : undefined;

    return {
      id: cartItem.id,
      userId: cartItem.userId,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      createdAt: cartItem.createdAt,
      updatedAt: cartItem.updatedAt,
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        stock: product.stock,
        image: product.image,
        images: product.images,
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        attributes: product.attributes,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        categoryId: product.categoryId,
        category: category,
      },
    };
  }
}
