import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { IUsuarioService } from '../services/IUsuarioService';

@injectable()
export class UsuarioController {
  constructor(@inject('IUsuarioService') private usuarioService: IUsuarioService) {}

  async buscarTodosUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.usuarioService.buscarTodosUsuarios();
      res.json(usuarios);
    } catch (erro) {
      console.error('Erro ao buscar usuários:', erro);
      res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
  }

  async criarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { nome, login, senha } = req.body;
      
      if (!nome || !login || !senha) {
        res.status(400).json({ erro: 'Nome, login e senha são obrigatórios' });
        return;
      }

      await this.usuarioService.criarUsuario({ nome, login, senha });
      res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
    } catch (erro) {
      console.error('Erro ao criar usuário:', erro);
      res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
  }
}