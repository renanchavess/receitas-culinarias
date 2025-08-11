export const CategoriaSwagger = {
  '/categorias': {
    get: {
      tags: ['Categorias'],
      summary: 'Lista todas as categorias',
      responses: {
        200: {
          description: 'Lista de categorias',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Categoria',
                },
              },
            },
          },
        },
        401: { description: 'Não autenticado' },
      },
    },
  },
};