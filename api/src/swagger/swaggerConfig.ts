import { AutenticacaoSwagger } from './AutenticacaoSwagger';
import { CategoriaSwagger } from './CategoriaSwagger';
import { ReceitaSwagger } from './ReceitaSwagger';
import { UsuarioSwagger } from './UsuarioSwagger';

export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Receitas Culinárias',
    version: '1.0.0',
    description: 'API para gerenciamento de receitas culinárias',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento',
    },
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
          nome: { type: 'string' },
          login: { type: 'string' },
          senha: { type: 'string' },
        },
        required: ['nome', 'login', 'senha'],
      },
      Categoria: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          nome: { type: 'string' },
        },
        required: ['nome'],
      },
      Receita: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          nome: { type: 'string' },
          ingredientes: { type: 'string' },
          modoPreparo: { type: 'string' },
          idCategoria: { type: 'integer' },
          idUsuario: { type: 'integer' },
        },
        required: ['nome', 'ingredientes', 'modoPreparo', 'idCategoria'],
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    ...AutenticacaoSwagger,
    ...CategoriaSwagger,
    ...ReceitaSwagger,
    ...UsuarioSwagger,
  },
};