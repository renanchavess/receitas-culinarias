import express, { Application } from 'express';
import dotenv from 'dotenv';
import { routes } from './Routes';
import { container } from './ContainerInjection';
import swaggerUi from 'swagger-ui-express';
import { AutenticacaoSwagger } from './controllers/swagger/AutenticacaoSwagger';
import { CategoriaSwagger } from './controllers/swagger/CategoriaSwagger';
import { ReceitaSwagger } from './controllers/swagger/ReceitaSwagger';
import { UsuarioSwagger } from './controllers/swagger/UsuarioSwagger'
import { createCorsMiddleware } from './main';
dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(createCorsMiddleware());

container;

app.use(routes);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Receitas Culinárias API',
    version: '1.0.0',
    description: 'API para gerenciar receitas culinárias',
  },
  security: [
    { bearerAuth: [] },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Usuario: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          nome: { type: 'string', nullable: true },
          login: { type: 'string' },
          senha: { type: 'string' },
          criadoEm: { type: 'string', format: 'date-time' },
          alteradoEm: { type: 'string', format: 'date-time' },
        },
        required: ['login', 'senha'],
      },
      Categoria: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          nome: { type: 'string', nullable: true },
        },
      },
      Receita: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          idUsuarios: { type: 'integer' },
          idCategorias: { type: 'integer', nullable: true },
          nome: { type: 'string', nullable: true },
          tempoPreparoMinutos: { type: 'integer', nullable: true },
          porcoes: { type: 'integer', nullable: true },
          modoPreparo: { type: 'string' },
          ingredientes: { type: 'string', nullable: true },
          criadoEm: { type: 'string', format: 'date-time' },
          alteradoEm: { type: 'string', format: 'date-time' },
        },
        required: ['modoPreparo'],
      },
    },
  },
  paths: {
    ...AutenticacaoSwagger,
    ...CategoriaSwagger,
    ...ReceitaSwagger,
    ...UsuarioSwagger,
  },
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});