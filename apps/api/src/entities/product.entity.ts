import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { CartItem } from './cart-item.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  originalPrice: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'json', nullable: true })
  images: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ type: 'json', nullable: true })
  attributes: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  categoryId: string;

  // Relationships with lazy loading and eager loading options
  @ManyToOne(() => Category, (category) => category.products, {
    lazy: true,
    eager: false,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Promise<Category>;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product, {
    lazy: true,
    eager: false,
  })
  cartItems: Promise<CartItem[]>;
}
