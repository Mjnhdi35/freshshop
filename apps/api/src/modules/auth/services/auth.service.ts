import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { RedisService } from '../../../services/redis.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { User } from '../../../entities/user.entity';
import { CryptoUtil } from '../../../utils/crypto.util';
import { JwtUtil } from '../../../utils/jwt.util';
import { TimeUtil } from '../../../utils/time.util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await user.validatePassword(password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Create new user
    const user = await this.usersService.create(registerDto);
    return this.generateTokens(user);
  }

  async getProfile(userId: string) {
    return this.usersService.findOne(userId);
  }

  async updateProfile(userId: string, updateUserDto: any) {
    return this.usersService.update(userId, updateUserDto);
  }

  private async generateTokens(user: any) {
    const payload = JwtUtil.createPayload(user);

    // Generate access token
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: JwtUtil.getJwtExpiry(),
    });

    // Generate refresh token
    const refreshToken = CryptoUtil.generateRandomToken(32);

    // Store refresh token in Redis with expiry from env
    const refreshExpiry = TimeUtil.parseExpiryToSeconds(
      JwtUtil.getRefreshTokenExpiry(),
    );
    await this.redisService.set(
      `refresh_token:${refreshToken}`,
      user.id,
      refreshExpiry,
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    // Get user ID from Redis
    const userId = await this.redisService.get(`refresh_token:${refreshToken}`);

    if (!userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Get user from database
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Generate new access token
    const payload = JwtUtil.createPayload(user);
    const newAccessToken = this.jwtService.sign(payload, {
      expiresIn: JwtUtil.getJwtExpiry(),
    });

    return {
      access_token: newAccessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isActive: user.isActive,
      },
    };
  }

  async logout(refreshToken: string) {
    // Remove refresh token from Redis
    await this.redisService.del(`refresh_token:${refreshToken}`);
    return { message: 'Logged out successfully' };
  }
}
