export const UsuarioSwagger = {
  '/usuarios': {
    get: {
      tags: ['Usuários'],
      summary: 'Lista todos os usuários',
      security: [],
      responses: {
        200: {
          description: 'Lista de usuários',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Usuario',
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['Usuários'],
      summary: 'Cria um novo usuário',
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Usuario',
            },
          },
        },
      },
      responses: {
        201: { description: 'Usuário criado com sucesso' },
        400: { description: 'Requisição inválida' },
      },
    },
  },
};