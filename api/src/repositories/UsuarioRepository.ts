import mysql from 'mysql2/promise';
import { injectable, inject } from 'inversify';
import { IUsuarioRepository } from './IUsuarioRepository';
import { RowDataPacket } from 'mysql2';
import Usuario from '../models/Usuario';

@injectable()
export class UsuarioRepository implements IUsuarioRepository {
  private pool: mysql.Pool;

  constructor(@inject('Pool') pool: mysql.Pool) {
    this.pool = pool;
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    const [rows] = await this.pool.execute<RowDataPacket[]>(query, [id]);
    if (rows.length > 0) {
      const row = rows[0];
      if (row !== undefined)
        return new Usuario(row.id, row.nome, row.login, row.senha, row.criado_em, row.alterado_em);
    }
    return null;
  }

  async buscarTodos(): Promise<Usuario[]> {
    const query = 'SELECT * FROM usuarios';
    const [rows] = await this.pool.execute<RowDataPacket[]>(query);
    return rows.map(row => new Usuario(row.id, row.nome, row.login, row.senha, row.criado_em, row.alterado_em));
  }

  async criar(usuario: Partial<Usuario>): Promise<void> {
    const query = `INSERT INTO usuarios (nome, login, senha, criado_em, alterado_em) 
                   VALUES (?, ?, ?, ?, ?)`;
    const valores = [
      usuario.nome,
      usuario.login,
      usuario.senha,
      usuario.criadoEm,
      usuario.alteradoEm,
    ];
    await this.pool.execute(query, valores);
  }

  async atualizar(id: number, usuario: any): Promise<void> {
    const query = `UPDATE usuarios SET nome = ?, login = ?, senha = ?, alterado_em = ? 
                   WHERE id = ?`;
    const valores = [
      usuario.nome,
      usuario.login,
      usuario.senha,
      usuario.alteradoEm,
      id,
    ];
    await this.pool.execute(query, valores);
  }

  async deletar(id: number): Promise<void> {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    await this.pool.execute(query, [id]);
  }

  async buscarPorLogin(login: string): Promise<Usuario | null> {
    const query = 'SELECT * FROM usuarios WHERE login = ?';
    const [rows] = await this.pool.execute<RowDataPacket[]>(query, [login]);
    if (rows.length > 0) {
      const row = rows[0];
      if (row !== undefined)
        return new Usuario(row.id, row.nome, row.login, row.senha, row.criado_em, row.alterado_em);
    }
    return null;
  }
}