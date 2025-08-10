import { injectable, inject } from 'inversify';
import mysql from 'mysql2/promise';
import Categoria from '../models/Categoria';
import { ICategoriaRepository } from './ICategoriaRepository';
import { RowDataPacket } from 'mysql2';

@injectable()
export class CategoriaRepository implements ICategoriaRepository {
  private pool: mysql.Pool;

  constructor(@inject('Pool') pool: mysql.Pool) {
    this.pool = pool;
  }

  async buscarTodas(): Promise<Categoria[]> {
    const query = 'SELECT * FROM categorias';
    const [rows] = await this.pool.execute<RowDataPacket[]>(query);
    return rows.map(row => new Categoria(row.id, row.nome));
  }
}