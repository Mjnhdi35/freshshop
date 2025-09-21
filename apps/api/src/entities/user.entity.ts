import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { CryptoUtil } from '../utils/crypto.util';
import { Post } from './post.entity';
import { CartItem } from './cart-item.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: ['admin', 'customer'],
    default: 'customer',
  })
  role: 'admin' | 'customer';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await CryptoUtil.hashPassword(this.password);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return CryptoUtil.comparePassword(password, this.password);
  }

  // Relationships with lazy loading
  @OneToMany(() => Post, (post) => post.author, { lazy: true })
  posts: Promise<Post[]>;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user, { lazy: true })
  cartItems: Promise<CartItem[]>;
}
