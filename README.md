# Projeto labecommerce

É o primeiro projeto do back-end, onde praticamos toda a base de criação de uma API vinculada a um banco de dados real.<br>
Ele tem uma particularidade: seus requisitos são implementados ao longo dos exercícios da tarde. Isso significa que caso você siga o desenvolvimento das aulas, quando chegar na data de entrega já terá um projeto funcional e quase pronto para entrega.

## Conteúdos abordados

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Postman

# Banco de dados
![image](https://user-images.githubusercontent.com/29845719/214396608-ddcfd097-e615-44f9-acbe-f815f9abb83f.png)
https://dbdiagram.io/d/63c6e8e5296d97641d7a4666

# Lista de requisitos

- Endpoints

    - [ ]  Get all users
    - [ ]  Create user
    - [ ]  Get all products
    - [ ]  Create product
    - [ ]  Search product by name
    - [ ]  Edit product by id
    - [ ]  Create purchase
    - [ ]  Delete purchase by id
    - [ ]  Get purchase by id

# Exemplos de requisição
Não precisa cadastrar o mesmo nome, email e quaisquer outros valores vistos aqui nos exemplos de saída. Porém, lembre-se de respeitar a estrutura pedida no banco de dados (nome das tabelas e colunas) e os nomes das propriedades na resposta da API.

Colunas a mais na tabela não tem problema, por exemplo adicionar uma 'category' dentro da tabela 'products', mas a falta de uma coluna será considerada falha de implementação!

## Get all users
Retorna todas as pessoas cadastradas.<br>
Dica: atenção com o nome da propriedade createdAt! Ela deve vir em camelCase, apesar de estar em snake_case no banco de dados.
```typescript
// Request
// GET /users

// Response
// status 200 OK
[
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: "2023-01-15 09:12:42"
    },
    {
        id: "u002",
        name: "Ciclana",
        email: "ciclana@email.com",
        password: "ciclana99",
        createdAt: "2023-01-17 12:35:28"
    }
]
```

## Create user
Cadastra uma nova pessoa.
```typescript
// Request
// POST /users
// body JSON
{
    "id": "u003",
    "name": "Astrodev",
    "email": "astrodev@email.com",
    "password": "astrodev00"
}

// Response
// status 201 CREATED
{
    message: "Cadastro realizado com sucesso"
}
```

## Get all products
Retorna todos os produtos cadastrados.
```typescript
// Request
// GET /products

// Response
// status 200 OK

```

## Create product
Cadastra um novo produto.

## Search product by name
Retorna o resultado da busca de produtos por nome.

## Edit product by id
Edita um produto existente.

## Create purchase
Cadastra um novo pedido.

## Delete purchase by id
Deleta um pedido existente.

## Get purchase by id
Retorna os dados de uma compra, incluindo a lista de produtos da mesma.
