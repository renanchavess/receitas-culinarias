import express, { Router } from 'express';
import { container } from './ContainerInjection';
import { UsuarioController } from './controllers/UsuarioController';
import { AutenticacaoController } from './controllers/AutenticacaoController';
import { AutenticacaoMiddleware } from './middlewares/AutenticacaoMiddleware';
import { CategoriaController } from './controllers/CategoriaController';
import { ReceitaController } from './controllers/ReceitaController';

export class Routes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public setup(): Router {
    const usuarioController = container.get<UsuarioController>(UsuarioController);
    const autenticacaoController = container.get<AutenticacaoController>(AutenticacaoController);
    const categoriaController = container.get<CategoriaController>(CategoriaController);
    const receitaController = container.get<ReceitaController>(ReceitaController);

    this.router.get('/usuarios', (req, res) => usuarioController.buscarTodosUsuarios(req, res));
    this.router.post('/usuarios', (req, res) => usuarioController.criarUsuario(req, res));
    this.router.post('/login', (req, res) => autenticacaoController.login(req, res));
    this.router.post('/logout', (req, res) => autenticacaoController.logout(req, res));

    this.router.use(AutenticacaoMiddleware);

    this.router.get('/categorias', (req, res) => categoriaController.buscarTodas(req, res));
    this.router.get('/receitas', (req, res) => receitaController.buscarTodas(req, res));
    this.router.get('/receitas/:id', (req, res) => receitaController.buscarPorId(req, res));
    this.router.post('/receitas', (req, res) => receitaController.criar(req, res));
    this.router.put('/receitas/:id', (req, res) => receitaController.atualizar(req, res));
    this.router.delete('/receitas/:id', (req, res) => receitaController.deletar(req, res));

    return this.router;
  }
}

export const routes = new Routes().setup();