import Receita from '../models/Receita';
import { FiltroBuscarReceita } from '../DTO/FiltroBuscarReceita';

export interface IReceitaRepository {
  buscarTodas(userId: number, filtros?: FiltroBuscarReceita): Promise<Receita[]>;
  buscarPorId(id: number): Promise<Receita | null>;
  criar(receita: Partial<Receita>): Promise<void>;
  atualizar(id: number, receita: Partial<Receita>): Promise<void>;
  deletar(id: number): Promise<void>;
}