export enum CATEGORYS {
    VGA = 'Placa de vídeo',
    POWER_SUPPLY = 'Fonte',
    RAM = 'Memória RAM'
}

export type TUser = {
    id: string,
    email: string,
    password: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    category: CATEGORYS
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}

