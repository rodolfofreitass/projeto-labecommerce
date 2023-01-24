# Projeto labecommerce

É o primeiro projeto do back-end, o qual praticaremos toda a base de criação de uma API com banco de dados.<br>
Ele tem uma particularidade: seus requisitos são implementados ao longo dos exercícios da tarde. Isso significa que caso você siga o desenvolvimento das aulas, quando chegar na data de entrega já terá um projeto funcional a ser entregue.

## Conteúdos abordados

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Postman

# Requisitos

## Banco de dados
![image](https://user-images.githubusercontent.com/29845719/214396608-ddcfd097-e615-44f9-acbe-f815f9abb83f.png)
https://dbdiagram.io/d/63c6e8e5296d97641d7a4666

```
// DBML (Database Markup Language)
// Direction of relashionships:
// > many-to-one; < one-to-many; - one-to-one; <> many-to-many

Table users {
  id text [pk, unique, not null]
  name text [not null]
  email text [unique, not null]
  password text [not null]
  created_at text [not null, default: "DATETIME()"]
}

Table products {
  id text [pk, unique, not null]
  name text [not null]
  price real [not null]
  description text [not null]
  image_url text [not null]
}

Table purchases {
  id text [pk, unique, not null]
  buyer text [not null, ref: > users.id]
  total_price real [not null]
  created_at text [not null, default: "DATETIME()"]
  paid integer [not null, default: 0]
}

Table purchases_products {
  purchase_id text [not null, ref: <> purchases.id]
  product_id text [not null, ref: <> products.id]
  quantity integer [not null, default: 1]
}
```

## Tipagens

## Endpoints
