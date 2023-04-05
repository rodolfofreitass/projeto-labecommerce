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

