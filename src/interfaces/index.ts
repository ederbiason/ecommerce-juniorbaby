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

export interface Orders {
    _id: string
    user: string
    items: Item[]
    paymentStatus: string
    orderStatus: string
    shippingAddress: ShippingAddress
    transactionId: string
    total: number
    createdAt: string
    updatedAt: string
    __v: number
}

export interface Item {
    _id: string
    name: string
    description: string
    category: string
    price: number
    countInStock: number
    minThreshold: number
    images: string[]
    createdBy: string
    createdAt: string
    updatedAt: string
    __v: number
    quantity: number
}

export interface ShippingAddress {
    address: Address
    carrier: any
    name: string
    phone: string
    tracking_number: any
}

export interface Address {
    city: string
    country: string
    line1: string
    line2: string
    postal_code: string
    state: string
}
