# Receitas Culinárias — Frontend (Vue 3 + Vite)

Este projeto é o frontend da aplicação Receitas Culinárias, desenvolvido com Vue 3, Vite, Pinia, Vue Router, Axios e Bootstrap.

## Requisitos
- Node.js 18+

## Configuração
Crie um arquivo `.env` na pasta `app` (já criado) com a URL da API:

```
API_URL=http://localhost:3000
```

## Scripts
- `npm run dev`: inicia o servidor de desenvolvimento (http://localhost:5173)
- `npm run build`: gera a build de produção
- `npm run preview`: pré-visualiza a build

## Fluxo básico
1. Acesse `/register` para criar conta (campos: nome, login, senha)
2. Faça login em `/login` (campos: login, senha)
3. Acesse `/recipes` para listar receitas

## Observações
- As rotas protegidas exigem token JWT. Em caso de 401, você será redirecionado ao login.
- O backend precisa permitir CORS para `http://localhost:5173`.
