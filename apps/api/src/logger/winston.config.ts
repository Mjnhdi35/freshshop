import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';

export const winstonTransports = [
  new transports.Console({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
    ),
  }),
];

export const winstonOptions = {
  transports: winstonTransports,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    nestWinstonModuleUtilities.format.nestLike('FreshShop', {
      colors: false,
      prettyPrint: false,
    }),
  ),
};
