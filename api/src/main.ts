import type { Request, Response, NextFunction } from 'express';

export function createCorsMiddleware() {
  const allowedOrigins = (process.env.CORS_ORIGIN ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return function cors(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin as string | undefined;

    const isAllowed =
      !origin ||
      (allowedOrigins.length > 0 &&
        allowedOrigins.some((o) => {
          if (o === '*') return true;
          if (o.startsWith('/') && o.endsWith('/')) {
            try {
              return new RegExp(o.slice(1, -1)).test(origin!);
            } catch {
              return false;
            }
          }
          return o === origin;
        }));

    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    if (origin && isAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }

    return next();
  };
}