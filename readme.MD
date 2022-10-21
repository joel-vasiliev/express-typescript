# Status dos pedidos

## STATUS GERAL DO PEDIDO

```
    status 0 = aguardando meta
    status 1 = meta batida, buscando no fornecedor
    status 2 = aguardando pagamento de todos
    status 3 = a combinar entrega
    status 4 = entregue
```

## STATUS-ORDER (DE CADA CLIENTE)

```
    statusOrder 0 = pedido realizado
    statusOrder 1 = pedido confirmado - pagamento pendente
    statusOrder 2 = pagamento realizado
    statusOrder 3 = entrega pendente
    statusOrder 4 = entregue
```

# To-do-list

```
[X] - Criar API base
[X] - Criar SQL básico (estrutura de tabelas)
[X] - Pegar quais produtos um usuário pediu
[X] - Montar SQL para payload 'playcode.js' juntando informações do pedido para retornar tudo em um JSON só.
[ ] - Criação de CRUD para cadastro de admins.
[ ] - Criar rotas de busca a partir de banco de dados de admins
[ ] - Criptografia em senha
[X] - Adicionar tipo do produto (para agrupamento de produtos por categoria e listagem em rotas específicas da API)
[ ] - Arrumar query user específico não retornando valor
[ ] - Arrumar função calculo preço após entrar no rateio
[ ] - Testar as rotas da API em diferentes fluxos para procurar bugs
```

# Documentação básica das rotas

## GET - /users

**Autenticação necessária**

Retorna a lista de usuários cadastrados

**Output (Exemplo):**

```
[
    {
        "userId": 1,
        "phone": "5511946181209@c.us",
        "cep": "03265030",
        "name": "Joel",
        "administrator": 1
    }
]
```

## GET - /users/:id

Retorna as informações de um usuário específico (detalha também os produtos adquiridos pelo usuário)

**Output (Exemplo):**

```
{
    "userId": 1,
    "phone": "5511946181209@c.us",
    "cep": "03265030",
    "name": "Joel",
    "administrator": 0,
    "products": [
        {
            "id": 5,
            "statusOrder": 0,
            "amount": 5,
            "totalPrice": 0,
            "product": [
                {
                    "productId": 1,
                    "date": "2022-10-21T20:42:48.000Z",
                    "header": "Purple Haze Outdoor",
                    "title": "Mensalidades e anualidade temporariamente com desconto",
                    "category": "weed",
                    "status": 0,
                    "requiredAmount": 5,
                    "currentAmount": 0
                }
            ]
        }
    ]
}
```

## GET - /products

Retorna a lista de produtos (disponíveis) cadastrados

**Output (Exemplo):**

```
[
    {
        "productId": 1,
        "date": "2022-10-21T20:42:48.000Z",
        "title": "Purple Haze Outdoor",
        "header": "Mensalidades e anualidade temporariamente com desconto",
        "category": "weed",
        "status": 0,
        "goal": {
            "requiredAmount": 5,
            "currentAmount": 0
        },
        "prices": [
            {
                "price": 50,
                "minimum": 0
            },
            {
                "price": 45,
                "minimum": 5
            },
            {
                "price": 50,
                "minimum": 0
            }
        ]
    }
]
```

## GET - /products/:id

Retorna as informações de um produto específico, incluindo a lista de usuários que estão participando dele.

**Output (Exemplo):**

```
{
    "productId": 1,
    "date": "2022-10-21T20:42:48.000Z",
    "category": "weed",
    "title": "Purple Haze Outdoor",
    "header": "Mensalidades e anualidade temporariamente com desconto",
    "status": 0,
    "goal": {
        "requiredAmount": 5,
        "currentAmount": 0
    },
    "prices": [
        {
            "price": 50,
            "minimum": 0
        },
        {
            "price": 45,
            "minimum": 5
        },
        {
            "price": 50,
            "minimum": 0
        }
    ],
    "participants": [
        {
            "name": "Joel",
            "phone": "5511946181209@c.us",
            "userId": 1,
            "statusOrder": 0,
            "amount": 5,
            "totalPrice": 0
        }
    ]
}
```

## GET - /products/:category-name

Retorna uma lista de produtos por categoria

**Output (Exemplo):**

```
Mesmo payload da rota /products, porém apenas os produtos da categoria passada no parâmetro.
```

## POST - /users

Cadastra um novo usuário

**Body:**

```
{
    "name": "Joel",
    "phone": "5511946181209@c.us",
    "cep": "03265030"
}
```

**Output (Exemplo) em caso de erro por já existir o usuário:**

```
{
    "status": 400,
    "message": "Um usuário com este telefone já existe!"
}
```

**Output (Exemplo) em caso de sucesso:**

```
{
    "status": 200,
    "msg": "Usuário Joel criado com sucesso!"
}
```

## POST - /products

**Autenticação necessária**

Cadastra um novo produto

**Body:**

```
{
    "title": "Purple Haze Outdoor",
    "header": "Mensalidades e anualidade temporariamente com desconto",
    "category": "weed",
    "goal": {
        "requiredAmount": 5
    },
    "prices": [
        {
        "price": 50,
        "minimum": 0
        }
    ]
}
```

**Output:**

```
{
    "status": 200,
    "message": "Produto '${title}' de ID ${productId} criado com sucesso!"
}
```

## POST - /products/:productId/join

Entra no rateio de um produto específico

**Body:**

amount = Quantidade (5 => 5g, 50 = 50g, 5000 => 5kg)

```
{
    "amount": 5,
    "userId": 1
}
```

**Output:**

```
{
    "status": 200,
    "msg": "Participação para o rateio do produto 1 confirmada com sucesso!"
}
```

## DELETE - /products/:productId/leave

**Body:**

```
{
    "userId": 1
}
```

**Output:**

```
{
    "status": 200,
    "msg": "Participação no rateio 1 removida com sucesso!"
}
```
