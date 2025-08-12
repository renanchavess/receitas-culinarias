import { injectable, inject } from 'inversify';
import mysql from 'mysql2/promise';
import Receita from '../models/Receita';
import { IReceitaRepository } from './IReceitaRepository';
import { RowDataPacket } from 'mysql2';
import { FiltroBuscarReceita } from '../DTO/FiltroBuscarReceita';

@injectable()
export class ReceitaRepository implements IReceitaRepository {
  private pool: mysql.Pool;

  constructor(@inject('Pool') pool: mysql.Pool) {
    this.pool = pool;
  }

  async buscarTodas(userId: number, filtros?: FiltroBuscarReceita): Promise<Receita[]> {
    let query = 'SELECT * FROM receitas WHERE id_usuarios = ?';
    const params: any[] = [userId];

    if (filtros?.categoria !== undefined) {
      query += ' AND id_categorias = ?';
      params.push(filtros.categoria);
    }

    if (filtros?.consulta) {
      query += ' AND (nome LIKE ? OR ingredientes LIKE ? OR modo_preparo LIKE ?)';
      const like = `%${filtros.consulta}%`;
      params.push(like, like, like);
    }

    query += ' ORDER BY criado_em DESC';

    const [rows] = await this.pool.execute<RowDataPacket[]>(query, params);
    return rows.map(row => new Receita(
      row.id,
      row.id_usuarios,
      row.id_categorias,
      row.nome,
      row.tempo_preparo_minutos,
      row.porcoes,
      row.modo_preparo,
      row.ingredientes,
      row.criado_em,
      row.alterado_em
    ));
  }

  async buscarPorId(id: number): Promise<Receita | null> {
    const query = 'SELECT * FROM receitas WHERE id = ?';
    const [rows] = await this.pool.execute<RowDataPacket[]>(query, [id]);
    if (rows.length > 0) {
      const row = rows[0];
      if (row !== undefined)
        return new Receita(
            row.id,
            row.id_usuarios,
            row.id_categorias,
            row.nome,
            row.tempo_preparo_minutos,
            row.porcoes,
            row.modo_preparo,
            row.ingredientes,
            row.criado_em,
            row.alterado_em
        );
    }
    return null;
  }

  async criar(receita: Partial<Receita>): Promise<void> {
    const query = `INSERT INTO receitas (id_usuarios, id_categorias, nome, tempo_preparo_minutos, porcoes, modo_preparo, ingredientes, criado_em, alterado_em) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const valores = [
      receita.idUsuarios,
      receita.idCategorias,
      receita.nome,
      receita.tempoPreparoMinutos,
      receita.porcoes,
      receita.modoPreparo,
      receita.ingredientes,
      receita.criadoEm,
      receita.alteradoEm
    ];
    await this.pool.execute(query, valores);
  }

  async atualizar(id: number, receita: Partial<Receita>): Promise<void> {
    const query = `UPDATE receitas SET id_categorias = ?, nome = ?, tempo_preparo_minutos = ?, porcoes = ?, modo_preparo = ?, ingredientes = ?, alterado_em = ? 
                   WHERE id = ?`;
    const valores = [
      receita.idCategorias,
      receita.nome,
      receita.tempoPreparoMinutos,
      receita.porcoes,
      receita.modoPreparo,
      receita.ingredientes,
      receita.alteradoEm,
      id
    ];
    await this.pool.execute(query, valores);
  }

  async deletar(id: number): Promise<void> {
    const query = 'DELETE FROM receitas WHERE id = ?';
    await this.pool.execute(query, [id]);
  }
}