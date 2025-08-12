import Receita from '../models/Receita';
import { FiltroBuscarReceita } from '../DTO/FiltroBuscarReceita';

export interface IReceitaService {
  buscarTodasReceitas(userId: number, filtros?: FiltroBuscarReceita): Promise<Receita[]>;
  buscarReceitaPorId(id: number): Promise<Receita | null>;
  criarReceita(receita: Partial<Receita>): Promise<void>;
  atualizarReceita(id: number, receita: Partial<Receita>): Promise<void>;
  deletarReceita(id: number): Promise<void>;
}