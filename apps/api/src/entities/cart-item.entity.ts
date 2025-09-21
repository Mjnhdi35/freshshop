import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  productId: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships with lazy loading
  @ManyToOne(() => User, (user) => user.cartItems, {
    lazy: true,
    eager: false,
  })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    lazy: true,
    eager: false,
  })
  @JoinColumn({ name: 'productId' })
  product: Promise<Product>;
}
