import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';
import { Roles } from '../../../decorators/roles.decorator';
import { RolesGuard } from '../../../guards/roles.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @UseGuards(RolesGuard)
  @Roles('admin', 'customer')
  async addToCart(@Body() addToCartDto: AddToCartDto, @Request() req) {
    const cartItem = await this.cartService.addToCart(
      addToCartDto,
      req.user.id,
    );
    return {
      success: true,
      message: 'Item added to cart successfully',
      data: { cartItem },
    };
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin', 'customer')
  async getCart(@Request() req) {
    const cart = await this.cartService.getCart(req.user.id);
    return {
      success: true,
      message: 'Cart retrieved successfully',
      data: { cart },
    };
  }

  @Patch(':itemId')
  @UseGuards(RolesGuard)
  @Roles('admin', 'customer')
  async updateCartItem(
    @Param('itemId') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Request() req,
  ) {
    const cartItem = await this.cartService.updateCartItem(
      itemId,
      updateCartItemDto,
      req.user.id,
    );
    return {
      success: true,
      message: 'Cart item updated successfully',
      data: { cartItem },
    };
  }

  @Delete(':itemId')
  @UseGuards(RolesGuard)
  @Roles('admin', 'customer')
  async removeFromCart(@Param('itemId') itemId: string, @Request() req) {
    await this.cartService.removeFromCart(itemId, req.user.id);
    return {
      success: true,
      message: 'Item removed from cart successfully',
    };
  }

  @Delete()
  @UseGuards(RolesGuard)
  @Roles('admin', 'customer')
  async clearCart(@Request() req) {
    await this.cartService.clearCart(req.user.id);
    return {
      success: true,
      message: 'Cart cleared successfully',
    };
  }
}
