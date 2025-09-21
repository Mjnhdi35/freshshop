export class JwtUtil {
  /**
   * Get JWT expiry from environment
   */
  static getJwtExpiry(): string {
    return process.env.JWT_EXPIRES_IN || '15m';
  }

  /**
   * Get refresh token expiry from environment
   */
  static getRefreshTokenExpiry(): string {
    return process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
  }

  /**
   * Create JWT payload
   */
  static createPayload(user: { id: string; email: string }): {
    email: string;
    sub: string;
  } {
    return {
      email: user.email,
      sub: user.id,
    };
  }
}
