import bcrypt from 'bcrypt';
import { injectable } from 'inversify';
import { ICriptografiaService } from './ICriptografiaService';

@injectable()
export class CriptografiaService implements ICriptografiaService {
  private readonly saltRounds = 10;

  async criptografarSenha(senha: string): Promise<string> {
    return bcrypt.hash(senha, this.saltRounds);
  }

  async verificarSenha(senha: string, senhaHash: string): Promise<boolean> {
    return bcrypt.compare(senha, senhaHash);
  }
}