import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IUsuarioService } from '../services/IUsuarioService';
import { ICriptografiaService } from '../services/ICriptografiaService';
import { TokenService } from '../services/TokenService';

@injectable()
export class AutenticacaoController {
  constructor(
    @inject('IUsuarioService') private usuarioService: IUsuarioService,
    @inject('ICriptografiaService') private criptografiaService: ICriptografiaService,
    @inject(TokenService) private tokenService: TokenService
  ) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { login, senha } = req.body;
      const usuario = await this.usuarioService.buscarUsuarioPorLogin(login);

      if (!usuario) {
        res.status(401).json({ erro: 'Credenciais inválidas' });
        return;
      }

      const senhaValida = await this.criptografiaService.verificarSenha(senha, usuario.senha);

      if (!senhaValida) {
        res.status(401).json({ erro: 'Credenciais inválidas' });
        return;
      }

      const token = this.tokenService.generateToken({ id: usuario.id, login: usuario.login });

      res.json({ token });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao realizar login' });
    }
  }
}