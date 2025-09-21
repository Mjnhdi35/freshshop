import { IsIn } from 'class-validator';

export class UpdateRoleDto {
  @IsIn(['admin', 'customer'])
  role: 'admin' | 'customer';
}
