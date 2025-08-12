import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IReceitaService } from '../services/IReceitaService';

@injectable()
export class ReceitaController {
  constructor(@inject('IReceitaService') private receitaService: IReceitaService) {}

  async buscarTodas(req: Request, res: Response): Promise<void> {
    try {
      const user: any = (req as any).user;
      const userId = user?.id as number | undefined;
      if (!userId) {
        res.status(401).json({ erro: 'Não autenticado' });
        return;
      }
      const { q, idCategorias } = req.query as any;
      const filtros: any = {};
      if (q) filtros.q = String(q);
      if (idCategorias !== undefined) {
        const n = Number(idCategorias);
        if (!Number.isNaN(n)) filtros.idCategorias = n;
      }
      const receitas = await this.receitaService.buscarTodasReceitas(userId, filtros);
      res.json(receitas);
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao buscar receitas' });
    }
  }

  async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const user: any = (req as any).user;
      const userId = user?.id as number | undefined;
      if (!userId) {
        res.status(401).json({ erro: 'Não autenticado' });
        return;
      }
      const { id } = req.params;
      const receita = await this.receitaService.buscarReceitaPorId(Number(id));
      if (!receita) {
        res.status(404).json({ erro: 'Receita não encontrada' });
        return;
      }
      if (receita.idUsuarios !== userId) {
        res.status(403).json({ erro: 'Acesso negado' });
        return;
      }
      res.json(receita);
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao buscar receita' });
    }
  }

  async criar(req: Request, res: Response): Promise<void> {
    try {
      const user: any = (req as any).user;
      const userId = user?.id as number | undefined;
      if (!userId) {
        res.status(401).json({ erro: 'Não autenticado' });
        return;
      }

      const { idCategorias, nome, tempoPreparoMinutos, porcoes, modoPreparo, ingredientes } = req.body ?? {};

      if (!nome || nome.trim() === '') {
        res.status(400).json({ erro: 'Campo nome é obrigatório' });
        return;
      }

      if (!modoPreparo || modoPreparo.trim() === '') {
        res.status(400).json({ erro: 'Campo modoPreparo é obrigatório' });
        return;
      }

      if (!idCategorias) {
        res.status(400).json({ erro: 'Campo categoria é obrigatório' });
        return;
      }

      if (!ingredientes || ingredientes.trim() === '') {
        res.status(400).json({ erro: 'Campo ingredientes é obrigatório' });
        return;
      }

      if (!porcoes || porcoes <= 0) {
        res.status(400).json({ erro: 'Campo porções é obrigatório e deve ser maior que zero' });
        return;
      }

      if (!tempoPreparoMinutos || tempoPreparoMinutos <= 0) {
        res.status(400).json({ erro: 'Campo tempo de preparo é obrigatório e deve ser maior que zero' });
        return;
      }

      const agora = new Date();
      await this.receitaService.criarReceita({
        idUsuarios: userId,
        idCategorias: idCategorias,
        nome: nome,
        tempoPreparoMinutos: tempoPreparoMinutos,
        porcoes: porcoes,
        modoPreparo,
        ingredientes: ingredientes,
        criadoEm: agora,
        alteradoEm: agora,
      });

      res.status(201).json({ mensagem: 'Receita criada com sucesso!' });
    } catch (erro: any) {
      res.status(500).json({ erro: 'Erro ao criar receita' });
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const user: any = (req as any).user;
      const userId = user?.id as number | undefined;
      if (!userId) {
        res.status(401).json({ erro: 'Não autenticado' });
        return;
      }
      const { id } = req.params;
      const atual = await this.receitaService.buscarReceitaPorId(Number(id));
      if (!atual) {
        res.status(404).json({ erro: 'Receita não encontrada' });
        return;
      }
      if (atual.idUsuarios !== userId) {
        res.status(403).json({ erro: 'Acesso negado' });
        return;
      }
      const dados = req.body ?? {};
      const payload = { ...dados, alteradoEm: new Date() };
      await this.receitaService.atualizarReceita(Number(id), payload);
      res.json({ mensagem: 'Receita atualizada com sucesso!' });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao atualizar receita' });
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const user: any = (req as any).user;
      const userId = user?.id as number | undefined;
      if (!userId) {
        res.status(401).json({ erro: 'Não autenticado' });
        return;
      }
      const { id } = req.params;
      const atual = await this.receitaService.buscarReceitaPorId(Number(id));
      if (!atual) {
        res.status(404).json({ erro: 'Receita não encontrada' });
        return;
      }
      if (atual.idUsuarios !== userId) {
        res.status(403).json({ erro: 'Acesso negado' });
        return;
      }
      await this.receitaService.deletarReceita(Number(id));
      res.json({ mensagem: 'Receita deletada com sucesso!' });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao deletar receita' });
    }
  }
}
