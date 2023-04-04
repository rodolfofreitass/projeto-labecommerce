import { createProduct, createPurchase, createUser, getAllProducts, getAllPurchases, getAllPurchasesFromUserId, getAllUsers, getProductById, products, purchases, queryProductsByName, users } from "./database";
import { CATEGORYS } from "./types";

// console.table(users)
// console.table(products)
// console.table(purchases)

createUser("003","antonio@gmail.com","rdz123")
getAllUsers()

createProduct("placa002","RTX 3060 Ti", 2800, CATEGORYS.VGA)
getAllProducts()

// console.table(getProductById("placa001"))
// console.table(queryProductsByName("RTX"))

createPurchase("001","fonte001",3,1800)
getAllPurchases()

getAllPurchasesFromUserId("001")