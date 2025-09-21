import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export type UserRole = 'admin' | 'customer';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
