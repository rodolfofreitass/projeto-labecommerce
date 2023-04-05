import { createProduct, createPurchase, createUser, getAllProducts, getAllPurchases, getAllPurchasesFromUserId, getAllUsers, getProductById, products, purchases, queryProductsByName, users } from "./database";
import { CATEGORYS, TProduct, TPurchase } from "./types";
import express, { Request, Response} from 'express';
import cors from 'cors';
import { TUser } from "./types";

//TypeScrit 1 e 2

// createUser("003","antonio@gmail.com","rdz123")
// getAllUsers()

// createProduct("placa002","RTX 3060 Ti", 2800, CATEGORYS.VGA)
// getAllProducts()

// console.table(getProductById("placa001"))
// console.table(queryProductsByName("RTX"))

// createPurchase("001","fonte001",3,1800)
// getAllPurchases()

// getAllPurchasesFromUserId("001")

//APIS e Express

//Middlewares

const app = express()
app.use(express.json())
app.use(cors())
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

//endpoint de teste

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//GETS

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get('/purchases', (req: Request, res: Response) => {
    res.status(200).send(purchases)
})

app.get('/product/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const filteredProduct: TProduct[] = products.filter((product)=>{
        if(q){
            return product.name.toLowerCase().includes(q.toLowerCase())
        }
        return product
    })
    res.status(200).send(filteredProduct)
})

//POSTS

app.post('/users', (req: Request, res: Response) => {
    const body = req.body
    const{id, email, password } = body
    const newUser:TUser = {
        id,
        email,
        password
    }
    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")
})

app.post('/products', (req: Request, res: Response) => {
    const body = req.body
    const{id, name, price, category} = body
    const newProduct:TProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso")
})

app.post('/purchases', (req: Request, res: Response) => {
    const body = req.body
    const{userId, productId, quantity, totalPrice} = body
    const newPurchase:TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")
})

//Busca de produtos pelo ID

app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const result = products.find((product)=>{
        return product.id === id
    })
    res.status(200).send(result)
})

//Busca de compras do usuário pelo User ID

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id

    const result = purchases.filter((purchase)=>{
        return purchase.userId === id
    })
    res.status(200).send(result)
})

// Deletar usuário pela ID

app.delete('/users/:id', (req: Request, res: Response) =>{
    const id = req.params.id

    const indexToRemove = users.findIndex((user)=>{
        return user.id === id
    })

    if(indexToRemove >= 0){
        users.splice(indexToRemove,1)
    }

    res.status(200).send("User apagado com sucesso")
})

// Deletar produto pela ID

app.delete('/products/:id', (req: Request, res: Response) =>{
    const id = req.params.id

    const indexToRemove = products.findIndex((product)=>{
        return product.id === id
    })

    if(indexToRemove >= 0){
        products.splice(indexToRemove,1)
    }

    res.status(200).send("Produto apagado com sucesso")
})

//Editar usuário pela ID

app.put('/users/:id', (req: Request, res: Response) =>{
    const id = req.params.id

    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const user = users.find((user)=>{
        return user.id === id
    })

    if(user){
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }
    res.status(200).send("Cadastro atualizado com sucesso")
})

//Editar produto pela ID

app.put('/products/:id', (req: Request, res: Response) =>{
    const id = req.params.id

    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as CATEGORYS | undefined

    const product = products.find((product)=>{
        return product.id === id
    })

    if(product){
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.category = newCategory || product.category
    }
    res.status(200).send("Produto atualizado com sucesso")
})
