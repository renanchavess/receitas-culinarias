# Receitas Culinárias

Sistema completo para gerenciamento de receitas culinárias desenvolvido com **Vue.js 3** (frontend) e **Node.js/TypeScript** (backend).

## Funcionalidades

- ✅ Autenticação de usuários (registro e login)
- ✅ Gerenciamento completo de receitas (CRUD)
- ✅ Busca por nome, ingredientes ou modo de preparo
- ✅ Filtro por categorias
- ✅ Interface responsiva com Bootstrap
- ✅ API REST documentada com Swagger
- ✅ Arquitetura em camadas com injeção de dependência

## Tecnologias Utilizadas

### Backend
- Node.js + TypeScript
- Express.js
- MySQL
- JWT para autenticação
- Bcrypt para criptografia
- Inversify para injeção de dependência
- Swagger para documentação

### Frontend
- Vue.js 3 + Composition API
- Vue Router
- Pinia (gerenciamento de estado)
- Axios
- Bootstrap 5
- Vite

## Pré-requisitos

- **Node.js** 18+ 
- **MySQL** 8.0+
- **npm** ou **yarn**

## Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/renanchavess/receitas-culinarias.git
cd receitas-culinarias
```

### 2. Configuração do Banco de Dados

#### Instale e configure o MySQL
```bash
# No macOS com Homebrew
brew install mysql
brew services start mysql

# No Ubuntu/Debian
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

#### Crie o banco de dados
```sql
CREATE DATABASE receitas_culinarias;
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON receitas_culinarias.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
```

#### Execute o script de criação das tabelas
Execute o script SQL localizado em `./schema.sql` no seu MySQL.

### 3. Configuração do Backend

#### Instale as dependências
```bash
cd api
npm install
```

#### Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
```

**Arquivo `api/.env`:**
```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=sua_chave_secreta_super_segura_aqui
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=receitas_culinarias
```

> ⚠️ **Importante**: Altere o `JWT_SECRET` para uma chave mais segura em produção!

#### Compile o TypeScript
```bash
npm run build
```

### 4. Configuração do Frontend

#### Instale as dependências
```bash
cd ../app
npm install
```

#### Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env_example .env

# O arquivo já vem configurado para desenvolvimento local
```

**Arquivo `app/.env`:**
```env
API_URL=http://localhost:3000
```

## Executando a Aplicação

### 1. Inicie o Backend
```bash
cd api
npm start
```
O servidor estará rodando em: `http://localhost:3000`

### 2. Inicie o Frontend (em outro terminal)
```bash
cd app
npm run dev
```
A aplicação estará disponível em: `http://localhost:5173`

## Documentação da API

Com o backend rodando, acesse a documentação Swagger em:
```
http://localhost:3000/api-docs
```

## Testando a Aplicação

### 1. Acesse a aplicação
Abra `http://localhost:5173` no seu navegador

### 2. Crie uma conta
- Clique em "Criar conta"
- Preencha: nome, login e senha
- Faça login com suas credenciais

### 3. Gerencie receitas
- Crie novas receitas
- Busque por nome ou ingredientes
- Filtre por categoria
- Edite e exclua receitas

## 🔧 Scripts Disponíveis

### Backend (`api/`)
```bash
npm run build    # Compila o TypeScript
npm start        # Inicia o servidor
```

### Frontend (`app/`)
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview da build
```

## 🛡️ Segurança

- Senhas são criptografadas com bcrypt
- Autenticação via JWT
- Proteção CORS configurada
- Validação de dados de entrada
- Middlewares de autenticação