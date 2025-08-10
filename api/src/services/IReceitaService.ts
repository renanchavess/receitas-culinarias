import Receita from '../models/Receita';

export interface IReceitaService {
  buscarTodasReceitas(userId: number, filtros?: { q?: string; idCategorias?: number }): Promise<Receita[]>;
  buscarReceitaPorId(id: number): Promise<Receita | null>;
  criarReceita(receita: Partial<Receita>): Promise<void>;
  atualizarReceita(id: number, receita: Partial<Receita>): Promise<void>;
  deletarReceita(id: number): Promise<void>;
}