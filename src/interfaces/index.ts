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
    _id?: string,
    isActive: boolean,
    rating: number
}

export interface ShippingInterface {
    id: number
    name: string
    price: string
    custom_price: string
    discount: string
    currency: string
    delivery_time: number
    delivery_range: {
        min: number
        max: number
    }
    custom_delivery_time: number
    custom_delivery_range: {
        min: number
        max: number
    }
    packages: {
        price: string
        discount: string
        format: string
        weight: string
        insurance_value: string
        dimensions: {
            height: number
            width: number
            length: number
        }
    }[]
    additional_services: {
        receipt: boolean
        own_hand: boolean
        collect: boolean
    }
    company: {
        id: number
        name: string
        picture: string
    }
}
