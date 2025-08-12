export const AutenticacaoSwagger = {
  '/login': {
    post: {
      tags: ['Autenticação'],
      summary: 'Realiza login de um usuário',
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                login: { type: 'string' },
                senha: { type: 'string' },
              },
              required: ['login', 'senha'],
            },
          },
        },
      },
      responses: {
        200: { description: 'Login realizado com sucesso' },
        401: { description: 'Credenciais inválidas' },
      },
    },
  },
};