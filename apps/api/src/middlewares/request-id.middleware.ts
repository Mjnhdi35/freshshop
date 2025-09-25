import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

export const REQUEST_ID_HEADER = 'x-request-id';

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const incomingId = req.header(REQUEST_ID_HEADER);
  const id =
    incomingId && incomingId.trim().length > 0 ? incomingId : randomUUID();
  // attach to request
  (req as any).requestId = id;
  // echo back
  res.setHeader(REQUEST_ID_HEADER, id);
  next();
}
