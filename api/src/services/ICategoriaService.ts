import Categoria from '../models/Categoria';

export interface ICategoriaService {
  buscarTodasCategorias(): Promise<Categoria[]>;
}