import 'reflect-metadata';
import { Container } from 'inversify';
import { UsuarioController } from './controllers/UsuarioController';
import { UsuarioService } from './services/UsuarioService';
import { UsuarioRepository } from './repositories/UsuarioRepository';
import { IUsuarioService } from './services/IUsuarioService';
import { IUsuarioRepository } from './repositories/IUsuarioRepository';
import mysql from 'mysql2/promise';
import { AutenticacaoController } from './controllers/AutenticacaoController';
import { TokenService } from './services/TokenService';
import { CategoriaController } from './controllers/CategoriaController';
import { ICategoriaService } from './services/ICategoriaService';
import { CategoriaService } from './services/CategoriaService';
import { ICategoriaRepository } from './repositories/ICategoriaRepository';
import { CategoriaRepository } from './repositories/CategoriaRepository';
import { ReceitaController } from './controllers/ReceitaController';
import { IReceitaService } from './services/IReceitaService';
import { ReceitaService } from './services/ReceitaService';
import { IReceitaRepository } from './repositories/IReceitaRepository';
import { ReceitaRepository } from './repositories/ReceitaRepository';

const container = new Container();

container.bind<IUsuarioRepository>('IUsuarioRepository').to(UsuarioRepository);
container.bind<IUsuarioService>('IUsuarioService').to(UsuarioService);
container.bind<UsuarioController>(UsuarioController).toSelf();
container.bind<AutenticacaoController>(AutenticacaoController).toSelf();
container.bind<TokenService>(TokenService).toSelf();

// Bindings para Categoria
container.bind<ICategoriaRepository>('ICategoriaRepository').to(CategoriaRepository);
container.bind<ICategoriaService>('ICategoriaService').to(CategoriaService);
container.bind<CategoriaController>(CategoriaController).toSelf();

// Bindings para Receita
container.bind<IReceitaRepository>('IReceitaRepository').to(ReceitaRepository);
container.bind<IReceitaService>('IReceitaService').to(ReceitaService);
container.bind<ReceitaController>(ReceitaController).toSelf();

// Configuração do pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'receitas_culinarias',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

container.bind<mysql.Pool>('Pool').toConstantValue(pool);

export { container };