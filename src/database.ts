import { CATEGORYS, TProduct, TPurchase, TUser } from "./types"

export const users: TUser[] = [
    {
        id: '001',
        email: 'rfreitas@gmail.com',
        password: 'de2022'
    }, {
        id: '002',
        email: 'rodz@gmail.com',
        password: '123456'
    }]

export const products: TProduct[] = [
    {
        id: 'placa001',
        name: 'RTX 4090',
        price: 10900,
        category: CATEGORYS.VGA
    }, {
        id: 'fonte001',
        name: 'XPG 500W',
        price: 600,
        category: CATEGORYS.POWER_SUPPLY
    }
]

export const purchases: TPurchase[] = [
    {
        userId: '001',
        productId: 'placa001',
        quantity: 2,
        totalPrice: 21800
    }, {
        userId: '002',
        productId: 'fonte001',
        quantity: 1,
        totalPrice: 600
    },{
        userId: '002',
        productId: 'fonte001',
        quantity: 3,
        totalPrice: 1800
    }
]

//FUNÇÕES

//Função que cria o usuário

export function createUser(id: string, email: string, password: string) {
    const newUser: TUser = {
        id,
        email,
        password,
    }
    users.push(newUser)
    console.log('Cadastro realizado com sucesso')
}

//Função que mostra todos os usuários

export function getAllUsers() {
    console.table(users)
}

//Função que cria um produto

export function createProduct(id: string, name: string, price: number, category: CATEGORYS) {
    const newProduct: TProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    console.log('Produto criado com sucesso');
}

//Função que mostra todos os produtos

export function getAllProducts() {
    console.table(products)
}

//Função que busca o produto pela ID

export function getProductById(idToSearch: string) {
    return products.filter(
        (TProduct) => {
            return TProduct.id === idToSearch
        }
    )
}

//Função que busca produto pelo nome

export function queryProductsByName(q: string) {
    return products.filter(
        (TProduct) => {
            return TProduct.name.toLowerCase().includes(q.toLocaleLowerCase())
        }
    )
}

//Função que cria uma nova compra

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number) {
    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice,
    }
    purchases.push(newPurchase)
    console.log("Compra realizada com sucesso")
}

//Função que mostra todas as compras

export function getAllPurchases() {
    console.table(purchases)
}

//Função que busca as compras baseado no id do usuário

export function getAllPurchasesFromUserId(userIdToSearch: string){
    return purchases.filter((item) => { 
        return item.userId === userIdToSearch })
}