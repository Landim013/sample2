# 🌍 Projeto Autocomplete de Cidades

Este projeto é uma aplicação **full-stack com Next.js + tRPC + Prisma +
MySQL** que implementa um campo de busca com **autocomplete de
cidades**.\
Ao digitar o nome de uma cidade, o usuário recebe sugestões em tempo
real, podendo selecionar uma opção e visualizar os detalhes dessa
cidade.

------------------------------------------------------------------------

## 📸 Demonstração

> *(adicione aqui uma captura de tela da aplicação rodando)*

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

-   [Next.js](https://nextjs.org/) --- framework React para frontend e
    backend
-   [TypeScript](https://www.typescriptlang.org/) --- tipagem estática
-   [tRPC](https://trpc.io/) --- comunicação type-safe entre front e
    back
-   [Prisma](https://www.prisma.io/) --- ORM para manipulação do banco
    de dados
-   [MySQL](https://www.mysql.com/) --- banco de dados relacional
-   [Docker](https://www.docker.com/) --- containerização do banco

------------------------------------------------------------------------

## 📂 Estrutura do Projeto

    .
    ├── prisma/             # Schema do Prisma, migrations e seed
    ├── public/cities/      # Arquivo CSV com as cidades
    ├── src/
    │   ├── pages/          # Páginas Next.js
    │   ├── components/     # Componentes reutilizáveis (ex: CityInput)
    │   ├── server/api/     # Rotas tRPC e conexão com o banco
    │   └── utils/          # Cliente tRPC para o frontend
    └── README.md

------------------------------------------------------------------------

## ⚙️ Configuração do Banco de Dados

1.  **Criar o container MySQL**

    ``` bash
    ./start-database.sh
    ```

2.  **Rodar as migrations**

    ``` bash
    npx prisma migrate dev --name init_city
    ```

3.  **Rodar o seed** (carregar cidades do CSV no banco)

    ``` bash
    npm run seed
    ```

4.  **Abrir o Prisma Studio** (opcional, interface para inspecionar os
    dados)

    ``` bash
    npm run db:studio
    ```

------------------------------------------------------------------------

## ▶️ Como Rodar a Aplicação

1.  Instale as dependências:

    ``` bash
    npm install
    ```

2.  Suba o banco de dados no Docker (se ainda não estiver rodando):

    ``` bash
    ./start-database.sh
    ```

3.  Inicie o servidor de desenvolvimento:

    ``` bash
    npm run dev
    ```

4.  Acesse no navegador:

        http://localhost:3000

------------------------------------------------------------------------

## 🔍 Funcionalidades

-   **Autocomplete**: busca em tempo real usando `city` e `city_ascii`
-   **Seleção de cidade**: ao clicar, preenche o input e exibe os
    detalhes
-   **Card de detalhes**: mostra país, estado/província, coordenadas e
    população
-   **Debounce**: evita chamadas excessivas ao servidor durante a
    digitação
-   **Dropdown dinâmico**: aparece e desaparece conforme interação do
    usuário

------------------------------------------------------------------------

## 🛠 Scripts Úteis

``` bash
npm run dev        # Rodar aplicação em modo desenvolvimento
npm run build      # Build de produção
npm run start      # Rodar aplicação em produção
npm run db:studio  # Abrir Prisma Studio
npm run seed       # Executar seed das cidades
```

------------------------------------------------------------------------

## ✨ Melhorias Futuras

-   Paginação ou scroll infinito nas opções do autocomplete
-   Filtro por país ou região
-   Adição de testes unitários e e2e
-   Deploy em plataformas como Vercel ou Railway

------------------------------------------------------------------------

## 📄 Licença

Este projeto é de uso educacional e demonstração.\
Sinta-se à vontade para usar e adaptar conforme necessário.
