import { inject, injectable } from 'inversify';
import { IReceitaService } from './IReceitaService';
import { IReceitaRepository } from '../repositories/IReceitaRepository';
import Receita from '../models/Receita';

@injectable()
export class ReceitaService implements IReceitaService {
  constructor(@inject('IReceitaRepository') private receitaRepository: IReceitaRepository) {}

  async buscarTodasReceitas(userId: number, filtros?: { q?: string; idCategorias?: number }): Promise<Receita[]> {
    return this.receitaRepository.buscarTodas(userId, filtros);
  }

  async buscarReceitaPorId(id: number): Promise<Receita | null> {
    return this.receitaRepository.buscarPorId(id);
  }

  async criarReceita(receita: Partial<Receita>): Promise<void> {
    await this.receitaRepository.criar(receita);
  }

  async atualizarReceita(id: number, receita: Partial<Receita>): Promise<void> {
    await this.receitaRepository.atualizar(id, receita);
  }

  async deletarReceita(id: number): Promise<void> {
    await this.receitaRepository.deletar(id);
  }
}