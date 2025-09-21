import { Response } from 'express';
import { TimeUtil } from './time.util';

export class CookieUtil {
  /**
   * Set access token cookie
   */
  static setAccessTokenCookie(res: Response, token: string): void {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: TimeUtil.getAccessTokenMaxAge(),
    });
  }

  /**
   * Set refresh token cookie
   */
  static setRefreshTokenCookie(res: Response, token: string): void {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: TimeUtil.getRefreshTokenMaxAge(),
    });
  }

  /**
   * Clear all auth cookies
   */
  static clearAuthCookies(res: Response): void {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }

  /**
   * Get cookie options for production
   */
  static getCookieOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    };
  }
}
