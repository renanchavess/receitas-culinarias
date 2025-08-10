import Receita from '../models/Receita';

export interface IReceitaRepository {
  buscarTodas(userId: number, filtros?: { q?: string; idCategorias?: number }): Promise<Receita[]>;
  buscarPorId(id: number): Promise<Receita | null>;
  criar(receita: Partial<Receita>): Promise<void>;
  atualizar(id: number, receita: Partial<Receita>): Promise<void>;
  deletar(id: number): Promise<void>;
}