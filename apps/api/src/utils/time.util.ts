export class TimeUtil {
  /**
   * Parse expiry string to seconds
   * Supports: s (seconds), m (minutes), h (hours), d (days)
   */
  static parseExpiryToSeconds(expiry: string): number {
    const unit = expiry.slice(-1);
    const value = parseInt(expiry.slice(0, -1));

    switch (unit) {
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 60 * 60;
      case 'd':
        return value * 24 * 60 * 60;
      default:
        return 7 * 24 * 60 * 60; // Default 7 days
    }
  }

  /**
   * Parse expiry string to milliseconds
   */
  static parseExpiryToMilliseconds(expiry: string): number {
    return this.parseExpiryToSeconds(expiry) * 1000;
  }

  /**
   * Get access token max age from environment
   */
  static getAccessTokenMaxAge(): number {
    return parseInt(process.env.ACCESS_TOKEN_MAX_AGE || '900000'); // 15 minutes
  }

  /**
   * Get refresh token max age from environment
   */
  static getRefreshTokenMaxAge(): number {
    return parseInt(process.env.REFRESH_TOKEN_MAX_AGE || '604800000'); // 7 days
  }
}
