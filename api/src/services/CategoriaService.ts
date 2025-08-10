import { inject, injectable } from 'inversify';
import { ICategoriaService } from './ICategoriaService';
import { ICategoriaRepository } from '../repositories/ICategoriaRepository';
import Categoria from '../models/Categoria';

@injectable()
export class CategoriaService implements ICategoriaService {
  constructor(@inject('ICategoriaRepository') private categoriaRepository: ICategoriaRepository) {}

  async buscarTodasCategorias(): Promise<Categoria[]> {
    return this.categoriaRepository.buscarTodas();
  }
}