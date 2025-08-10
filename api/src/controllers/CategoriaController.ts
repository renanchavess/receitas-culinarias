import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ICategoriaService } from '../services/ICategoriaService';

@injectable()
export class CategoriaController {
  constructor(@inject('ICategoriaService') private categoriaService: ICategoriaService) {}

  async buscarTodas(req: Request, res: Response): Promise<void> {
    try {
      const categorias = await this.categoriaService.buscarTodasCategorias();
      res.json(categorias);
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao buscar categorias' });
    }
  }
}
