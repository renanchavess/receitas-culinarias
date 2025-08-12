export const ReceitaSwagger = {
  '/receitas': {
    get: {
      tags: ['Receitas'],
      summary: 'Lista receitas do usuário logado',
      parameters: [
        {
          name: 'consulta',
          in: 'query',
          required: false,
          description: 'Termo de busca (nome, ingredientes ou modo de preparo)',
          schema: { type: 'string' },
        },
        {
          name: 'idCategorias',
          in: 'query',
          required: false,
          description: 'Filtra por categoria (id)',
          schema: { type: 'integer' },
        },
      ],
      responses: {
        200: {
          description: 'Lista de receitas',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Receita' },
              },
            },
          },
        },
        401: { description: 'Não autenticado' },
      },
    },
    post: {
      tags: ['Receitas'],
      summary: 'Cria uma nova receita',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Receita' },
          },
        },
      },
      responses: {
        201: { description: 'Receita criada com sucesso' },
        400: { description: 'Requisição inválida' },
        401: { description: 'Não autenticado' },
      },
    },
  },
  '/receitas/{id}': {
    get: {
      tags: ['Receitas'],
      summary: 'Busca uma receita pelo ID (do usuário logado)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
      responses: {
        200: { description: 'Detalhes da receita', content: { 'application/json': { schema: { $ref: '#/components/schemas/Receita' } } } },
        401: { description: 'Não autenticado' },
        403: { description: 'Acesso negado' },
        404: { description: 'Receita não encontrada' },
      },
    },
    put: {
      tags: ['Receitas'],
      summary: 'Atualiza uma receita pelo ID (do usuário logado)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Receita' } } },
      },
      responses: {
        200: { description: 'Receita atualizada com sucesso' },
        401: { description: 'Não autenticado' },
        403: { description: 'Acesso negado' },
        404: { description: 'Receita não encontrada' },
      },
    },
    delete: {
      tags: ['Receitas'],
      summary: 'Deleta uma receita pelo ID (do usuário logado)',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
      responses: {
        200: { description: 'Receita deletada com sucesso' },
        401: { description: 'Não autenticado' },
        403: { description: 'Acesso negado' },
        404: { description: 'Receita não encontrada' },
      },
    },
  },
};