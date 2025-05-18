![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/github/license/Ghust27/blog_api) ![Issues](https://img.shields.io/github/issues/Ghust27/blog_api)

# Blog API

Uma API RESTful para um sistema de blog, construída com Node.js, Express e MongoDB. Suporta autenticação de usuários, criação, edição e exclusão de posts, além de funcionalidades como busca, paginação e categorização.

---

## Índice

- [Visão Geral](#visão-geral)  
- [Funcionalidades](#funcionalidades)  
- [Tecnologias](#tecnologias)  
- [Pré-requisitos](#pré-requisitos)  
- [Configuração](#configuração)  
- [Como Executar](#como-executar)  
  - [Em Desenvolvimento](#em-desenvolvimento)  
  - [Em Produção](#em-produção)  
- [Estrutura de Pastas](#estrutura-de-pastas)  
- [Endpoints da API](#endpoints-da-api)  
- [Contribuição](#contribuição)  
- [Licença](#licença)  

---

## Visão Geral

O **Blog API** é uma API robusta para gerenciar um sistema de blog:

- **Autenticação**: Cadastro e login de usuários com JWT e senhas criptografadas.  
- **Posts**: Criação, edição, exclusão e listagem de posts com suporte a categorias e busca.  
- **Paginação**: Suporte a paginação para listagem de posts.  
- **Segurança**: Validação de entrada e proteção contra ataques comuns (ex.: XSS, injeção de SQL).  

---

## Funcionalidades

- 🔐 Autenticação segura com JWT e bcrypt.  
- 📝 Criação, edição e exclusão de posts por usuários autenticados.  
- 🔍 Busca de posts por título, conteúdo ou categoria.  
- 📄 Paginação para listagem eficiente de posts.  
- 🛡️ Validação de entrada e tratamento de erros.  
- 📊 Suporte a categorização de posts.  

---

## Tecnologias

| Camada     | Tecnologias                                          |
| ---------- | ---------------------------------------------------- |
| **Backend**| Node.js · Express · MongoDB · Mongoose · JWT · bcrypt |

---

## Pré-requisitos

- **Node.js** v14+  
- **npm** ou **yarn**  
- **MongoDB** (local ou Atlas)  

---

## Configuração

1. Clone este repositório:
   ```bash
   git clone https://github.com/Ghust27/blog_api.git
   cd blog_api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo de variáveis de ambiente na raiz do projeto (.env):
   ```bash
   MONGODB_URI=seu_mongodb_uri
   JWT_SECRET=seu_jwt_secret
   PORT=5000
   ```

---

## Como Executar

### Em Desenvolvimento

1. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

2. A API estará disponível em: `http://localhost:5000/api`

### Em Produção

1. Gere o build e inicie o servidor:
   ```bash
   npm run build
   npm start
   ```

A API estará disponível na porta definida no arquivo `.env` (padrão: 5000).

---

## Estrutura de Pastas

```plaintext
├── src
│   ├── controllers    # Lógica de negócio dos endpoints
│   ├── middleware     # Middlewares (autenticação, validação, erros)
│   ├── models         # Modelos do Mongoose (User, Post)
│   ├── routes         # Definição das rotas da API
│   ├── utils          # Funções utilitárias (ex.: conexão com DB)
│   └── app.js         # Configuração do Express
├── .env               # Variáveis de ambiente
├── package.json       # Dependências e scripts
└── README.md          # Documentação do projeto
```

---

## Endpoints da API

| Método | Endpoint                  | Descrição                          | Autenticação |
| ------ | ------------------------- | ---------------------------------- | ------------ |
| POST   | `/api/auth/register`      | Cadastra um novo usuário           | Não          |
| POST   | `/api/auth/login`         | Faz login e retorna JWT            | Não          |
| GET    | `/api/posts`              | Lista posts com paginação e busca  | Não          |
| POST   | `/api/posts`              | Cria um novo post                  | Sim          |
| PUT    | `/api/posts/:id`          | Edita um post                      | Sim          |
| DELETE | `/api/posts/:id`          | Deleta um post                     | Sim          |

---

