import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';

@injectable()
export class TokenService {
  generateToken(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '24h',
    });
  }
}