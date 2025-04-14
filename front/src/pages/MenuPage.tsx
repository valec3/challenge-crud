"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/components/ProductCard"
import OrderSummary from "@/components/OrderSummary"
import type { Product, Category, OrderItem } from "@/lib/types"
import { useToast } from "@/hooks/useToast"
import { useMobile } from "@/hooks/useMobile"

// Sample data
const sampleProducts: Product[] = [
  {
    id: "CFCgcPPZKCjBvak9AEL6",
    name: "Pepperoni Pizza",
    price: 16.99,
    ingredients: ["Tomato", "Mozzarella", "Pepperoni"],
    category: "Traditional Pizzas",
  },
  {
    id: "2",
    name: "Margherita Pizza",
    price: 14.99,
    ingredients: ["Tomato", "Mozzarella", "Basil"],
    category: "Traditional Pizzas",
  },
  {
    id: "3",
    name: "Vegetarian Pizza",
    price: 15.99,
    ingredients: ["Tomato", "Mozzarella", "Bell Peppers", "Mushrooms", "Olives"],
    category: "Traditional Pizzas",
  },
  {
    id: "4",
    name: "Hawaiian Pizza",
    price: 17.99,
    ingredients: ["Tomato", "Mozzarella", "Ham", "Pineapple"],
    category: "Specialty Pizzas",
  },
  {
    id: "5",
    name: "BBQ Chicken Pizza",
    price: 18.99,
    ingredients: ["BBQ Sauce", "Mozzarella", "Chicken", "Red Onion"],
    category: "Specialty Pizzas",
  },
]

const sampleCategories: Category[] = [
  {
    id: "1",
    name: "Traditional Pizzas",
  },
  {
    id: "5H1BpOwgs7ephxCw4PHi",
    name: "Specialty Pizzas",
  },
]

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>(sampleCategories)
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const { toast } = useToast()
  const isMobile = useMobile()

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const addToOrder = (product: Product) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
            : item,
        )
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            subtotal: product.price,
          },
        ]
      }
    })

    toast({
      title: "Added to order",
      description: `${product.name} added to your order`,
      duration: 2000,
    })
  }

  const confirmOrder = () => {
    if (orderItems.length === 0) {
      toast({
        title: "Empty order",
        description: "Please add items to your order first",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0)
    const orderSummary = orderItems.map((item) => `${item.quantity}x ${item.name}`).join(", ")

    toast({
      title: "Order confirmed!",
      description: `Your order has been confirmed. Total: $${total.toFixed(2)}. Items: ${orderSummary}`,
      duration: 5000,
    })

    // Reset order
    setOrderItems([])
  }

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-red-700">Pizza Menu</h1>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="all" onClick={() => setSelectedCategory("all")} className="text-lg px-4 py-2">
              All
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className="text-lg px-4 py-2"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToOrder={() => addToOrder(product)} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Order summary - right side on desktop, bottom on mobile */}
      <div className={`${isMobile ? "h-auto" : "w-96"} bg-white border-l border-gray-200 shadow-lg`}>
        <OrderSummary orderItems={orderItems} setOrderItems={setOrderItems} onConfirmOrder={confirmOrder} />
      </div>
    </div>
  )
}
