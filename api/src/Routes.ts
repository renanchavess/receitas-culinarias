import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { container } from './ContainerInjection';
import { UsuarioController } from './controllers/UsuarioController';
import { AutenticacaoController } from './controllers/AutenticacaoController';
import { AutenticacaoMiddleware } from './middlewares/AutenticacaoMiddleware';
import { CategoriaController } from './controllers/CategoriaController';
import { ReceitaController } from './controllers/ReceitaController';
import { swaggerDefinition } from './swagger/swaggerConfig';

export class Routes {
  private router: Router;
  private usuarioController: UsuarioController;
  private autenticacaoController: AutenticacaoController;
  private categoriaController: CategoriaController;
  private receitaController: ReceitaController;

  constructor() {
    this.router = express.Router();
    this.usuarioController = container.get<UsuarioController>(UsuarioController);
    this.autenticacaoController = container.get<AutenticacaoController>(AutenticacaoController);
    this.categoriaController = container.get<CategoriaController>(CategoriaController);
    this.receitaController = container.get<ReceitaController>(ReceitaController);
  }

  private rotasDesenvolvimento(): void {
    this.router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
  }

  private rotasPublicas(): void {
    this.router.get('/usuarios', (req, res) => this.usuarioController.buscarTodosUsuarios(req, res));
    this.router.post('/usuarios', (req, res) => this.usuarioController.criarUsuario(req, res));
    this.router.post('/login', (req, res) => this.autenticacaoController.login(req, res));
  }

  private rotasProtegidas(): void {
    this.router.use(AutenticacaoMiddleware);

    this.router.get('/categorias', (req, res) => this.categoriaController.buscarTodas(req, res));
    this.router.get('/receitas', (req, res) => this.receitaController.buscarTodas(req, res));
    this.router.get('/receitas/:id', (req, res) => this.receitaController.buscarPorId(req, res));
    this.router.post('/receitas', (req, res) => this.receitaController.criar(req, res));
    this.router.put('/receitas/:id', (req, res) => this.receitaController.atualizar(req, res));
    this.router.delete('/receitas/:id', (req, res) => this.receitaController.deletar(req, res));
  }

  public setup(): Router {
    if (process.env.NODE_ENV !== 'production') {
      this.rotasDesenvolvimento();
    }
    
    this.rotasPublicas();
    this.rotasProtegidas();

    return this.router;
  }
}

export const routes = new Routes().setup();