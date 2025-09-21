import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Roles } from '../../../decorators/roles.decorator';
import { RolesGuard } from '../../../guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'customer')
  async findOne(@Param('id') id: string, @Request() req) {
    // Only allow users to view their own profile
    if (req.user.id !== id) {
      throw new ForbiddenException('You can only view your own profile');
    }

    const user = await this.usersService.findOne(id);
    return {
      success: true,
      message: 'User retrieved successfully',
      data: { user },
    };
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'customer')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    // Only allow users to update their own profile
    if (req.user.id !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }

    const user = await this.usersService.update(id, updateUserDto);
    return {
      success: true,
      message: 'User updated successfully',
      data: { user },
    };
  }

  // Admin only: Update user role
  @Patch(':id/role')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async updateUserRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const user = await this.usersService.updateRole(id, updateRoleDto.role);
    return {
      success: true,
      message: 'User role updated successfully',
      data: { user },
    };
  }
}
