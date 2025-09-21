import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductResponseDto } from '../dto/product-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = this.productRepository.create(createProductDto);
    const savedProduct = await this.productRepository.save(product);
    return await this.toResponseDto(savedProduct);
  }

  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.find({
      where: { isActive: true },
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
    return await Promise.all(
      products.map((product) => this.toResponseDto(product)),
    );
  }

  async findFeatured(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.find({
      where: { isActive: true, isFeatured: true },
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
    return await Promise.all(
      products.map((product) => this.toResponseDto(product)),
    );
  }

  async findByCategory(categoryId: string): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.find({
      where: { categoryId, isActive: true },
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
    return await Promise.all(
      products.map((product) => this.toResponseDto(product)),
    );
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.toResponseDto(product);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, updateProductDto);
    const updatedProduct = await this.productRepository.save(product);
    return await this.toResponseDto(updatedProduct);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }

  async updateStock(id: string, quantity: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    product.stock -= quantity;
    await this.productRepository.save(product);
  }

  private async toResponseDto(product: Product): Promise<ProductResponseDto> {
    const category = product.category ? await product.category : undefined;
    return {
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
    };
  }
}
