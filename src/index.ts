import { createProduct, createPurchase, createUser, getAllProducts, getAllPurchases, getAllPurchasesFromUserId, getAllUsers, getProductById, products, purchases, queryProductsByName, users } from "./database";
import { CATEGORYS, TProduct, TPurchase } from "./types";
import express, { Request, Response } from 'express';
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

//Endpoint de teste
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//get All Users
app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error) {
        res.status(500)
    }
})

//get All Products
app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error) {
        res.status(500)
    }
})

//get All Purchases
app.get('/purchases', (req: Request, res: Response) => {
    try {
        res.status(200).send(purchases)
    } catch (error) {
        res.status(500)
    }
})

//get Product By Name
app.get('/product/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length < 1) {
            res.status(404)
            throw new Error("Query params deve possuir pelo menos um caractere")
        }
        const filteredProduct: TProduct[] = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })
        if (filteredProduct.length < 1) {
            res.status(404)
            throw new Error("Produto não encontrado")
        }
        res.status(200).send(filteredProduct)
    } catch (error: any) {
        res.send(error.message)
    }
}
)

//create User
app.post('/users', (req: Request, res: Response) => {
    try {
        const body = req.body
        const { id, email, password } = body

        if (users.some((user) => user.id === id)) {
            res.status(404)
            throw new Error("Essa ID de usuário já existe, tente novamente.")
        }
        if (users.some((user) => user.email === email)) {
            res.status(404)
            throw new Error("E-mail já cadastrado, tente um outro e-mail.")
        }
        // if(password.length < 8){
        //     res.status(404)
        //     throw new Error("Senha deve ter no mínimo 8 caracteres.")
        // }
        const newUser: TUser = {
            id,
            email,
            password
        }
        users.push(newUser)
        res.status(201).send("Cadastro realizado com sucesso")
    } catch (error: any) {
        res.send(error.message)
    }
})

//create Product
app.post('/products', (req: Request, res: Response) => {
    try {
        const body = req.body
        const { id, name, price, category } = body

        if (products.some((product) => product.id === id)) {
            res.status(404)
            throw new Error("Essa ID de produto já existe, tente novamente.")
        }

        const newProduct: TProduct = {
            id,
            name,
            price,
            category
        }
        products.push(newProduct)
        res.status(201).send("Produto cadastrado com sucesso")
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//create Purchase
app.post('/purchases', (req: Request, res: Response) => {
    try {
        const body = req.body
        const { userId, productId, quantity, totalPrice } = body

        if (purchases.some((purchase) => purchase.userId === userId)) {
            res.status(404)
            throw new Error("Essa ID de usuário já existe nas compras")
        }
        if (purchases.some((purchase) => purchase.productId === productId)) {
            res.status(404)
            throw new Error("Essa ID de produto já existe nas compras")
        }
        const newPurchase: TPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        }
        purchases.push(newPurchase)
        res.status(201).send("Compra realizada com sucesso")
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//get Products By Id
app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (!products.some((product) => product.id === id)) {
            res.status(404)
            throw new Error("Produto não encontrado")
        }
        const result = products.find((product) => {
            return product.id === id
        })
        res.status(200).send(result)
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//get User Purchases by User Id
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (!purchases.some((purchase) => purchase.userId === id)) {
            res.status(404)
            throw new Error("Compra não encontrada")
        }

        const result = purchases.filter((purchase) => {
            return purchase.userId === id
        })
        res.status(200).send(result)
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//delete User By Id
app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const indexToRemove = users.findIndex((user) => {
            return user.id === id
        })

        if (indexToRemove < 0) {
            res.status(404)
            throw new Error("Conta não encontrada. Verifique o 'id'")
        } else {
            users.splice(indexToRemove, 1)
            res.status(200).send("Conta apagada com sucesso")
        }

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//delete Product By Id
app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const indexToRemove = products.findIndex((product) => {
            return product.id === id
        })

        if (indexToRemove < 0) {
            res.status(404)
            throw new Error("Produto não encontrado. Verifique o 'id'")
        } else {
            products.splice(indexToRemove, 1)
            res.status(200).send("Produto apagado com sucesso")
        }
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//edit User By Id
app.put('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (!users.some((user) => user.id === id)) {
            res.status(404)
            throw new Error("User não encontrado")
        }

        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        if (newPassword !== undefined) {
            if (newPassword.length < 8) {
                res.status(404)
                throw new Error("Senha deve ter no minímo 8 caracteres")
            }
        }

        if (newEmail !== undefined) {
            if (!newEmail.includes("@")) {
                res.status(404)
                throw new Error("O e-mail deve ter @.")
            }
        }

        const user = users.find((user) => {
            return user.id === id
        })

        if (user) {
            user.email = newEmail || user.email
            user.password = newPassword || user.password
        }
        res.status(200).send("Cadastro atualizado com sucesso")


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//edit Product By Id
app.put('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (!products.some((product) => product.id === id)) {
            res.status(404)
            throw new Error("Produto não encontrado.")
        }

        const newName = req.body.name as string || undefined
        const newPrice = req.body.price as number || undefined
        const newCategory = req.body.category as CATEGORYS || undefined

        if (newPrice !== undefined) {
            if (newPrice < 0) {
                res.status(404)
                throw new Error("O preço não pode ser menor zero.")
            }
        }

        if (newName !== undefined) {
            if (newName.length < 2) {
                res.status(404)
                throw new Error("O nome do produto deve ter mais de dois caracteres.")
            }
        }

        const product = products.find((product) => product.id === id)

        if (product) {
            product.name = newName || product.name
            product.price = newPrice || product.price
            product.category = newCategory || product.category
            res.status(200).send("Produto atualizado com sucesso")
        }else{
            res.status(400).send("User não encontrado")
        }
        
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})
