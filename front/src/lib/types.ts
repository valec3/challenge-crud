export interface Product {
    id: string
    name: string
    price: number
    ingredients: string[]
    category: string
  }
  
  export interface Category {
    id: string
    name: string
  }
  
  export interface OrderItem {
    id: string
    name: string
    price: number
    quantity: number
    subtotal: number
  }
  
  export interface Order {
    id: string
    items: {
      name: string
      price: number
      quantity: number
      subtotal: number
    }[]
    createdAt: string
    total: number
    status: string
  }
  