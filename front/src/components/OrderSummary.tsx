"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import type { OrderItem } from "@/lib/types"
import { Trash2, MinusCircle, PlusCircle, ShoppingCart } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface OrderSummaryProps {
  orderItems: OrderItem[]
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>
  onConfirmOrder: () => void
}

export default function OrderSummary({ orderItems, setOrderItems, onConfirmOrder }: OrderSummaryProps) {
  const totalAmount = orderItems.reduce((sum, item) => sum + item.subtotal, 0)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.price } : item,
      ),
    )
  }

  const removeItem = (id: string) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-red-700 text-white">
        <h2 className="text-xl font-bold flex items-center">
          <ShoppingCart className="mr-2" /> Order Summary
        </h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        {orderItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Your order is empty. Add some delicious pizzas!</div>
        ) : (
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="h-8 w-8 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-7 w-7 rounded-full"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span className="font-medium w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-7 w-7 rounded-full"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="font-bold">${item.subtotal.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Subtotal:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between mb-4">
          <span className="font-bold text-lg">Total:</span>
          <span className="font-bold text-lg text-green-700">${totalAmount.toFixed(2)}</span>
        </div>

        <Button
          onClick={onConfirmOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
          disabled={orderItems.length === 0}
        >
          Confirm Order
        </Button>
      </div>
    </div>
  )
}
