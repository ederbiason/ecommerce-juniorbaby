export interface ProductInterface {
    name: string,
    price: number,
    description: string,
    images: string[],
    category: string,
    counteInStock: number,
    createdAt?: string,
    updatedAt?: string,
    quantity: number,
    _id?: string
}