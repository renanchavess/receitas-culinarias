import Categoria from '../models/Categoria';

export interface ICategoriaRepository {
  buscarTodas(): Promise<Categoria[]>;
}