import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { CookieUtil } from '../../../utils/cookie.util';
import { Public } from '../../../decorators/public.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);

    // Set cookies
    CookieUtil.setAccessTokenCookie(res, result.access_token);
    CookieUtil.setRefreshTokenCookie(res, result.refresh_token);

    return {
      success: true,
      message: 'Login successful',
      data: {
        user: result.user,
      },
    };
  }

  @Public()
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(registerDto);

    // Set cookies
    CookieUtil.setAccessTokenCookie(res, result.access_token);
    CookieUtil.setRefreshTokenCookie(res, result.refresh_token);

    return {
      success: true,
      message: 'Registration successful',
      data: {
        user: result.user,
      },
    };
  }

  @Public()
  @Post('refresh')
  async refresh(@Request() req, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const result = await this.authService.refreshToken(refreshToken);

    // Set new access token cookie
    CookieUtil.setAccessTokenCookie(res, result.access_token);

    return {
      success: true,
      message: 'Token refreshed successfully',
      data: {
        user: result.user,
      },
    };
  }

  @Public()
  @Post('logout')
  async logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies.refresh_token;

    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    // Clear cookies
    CookieUtil.clearAuthCookies(res);

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.authService.getProfile(req.user.id);
    return {
      success: true,
      message: 'Profile retrieved successfully',
      data: { user },
    };
  }
}
