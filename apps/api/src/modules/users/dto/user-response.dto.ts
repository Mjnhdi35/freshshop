export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
