"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Order } from "@/lib/types"
import { formatDate } from "@/lib/utils"

// Sample data
const sampleOrders: Order[] = [
  {
    id: "K9Y8xEPewHVb87uev2sT",
    items: [
      {
        name: "Margherita Pizza",
        price: 14.99,
        quantity: 2,
        subtotal: 29.98,
      },
    ],
    createdAt: "2025-04-14T03:09:40.952Z",
    total: 29.98,
    status: "pending",
  },
  {
    id: "2",
    items: [
      {
        name: "Pepperoni Pizza",
        price: 16.99,
        quantity: 1,
        subtotal: 16.99,
      },
      {
        name: "Hawaiian Pizza",
        price: 17.99,
        quantity: 1,
        subtotal: 17.99,
      },
    ],
    createdAt: "2025-04-13T15:30:22.123Z",
    total: 34.98,
    status: "completed",
  },
  {
    id: "3",
    items: [
      {
        name: "BBQ Chicken Pizza",
        price: 18.99,
        quantity: 2,
        subtotal: 37.98,
      },
      {
        name: "Vegetarian Pizza",
        price: 15.99,
        quantity: 1,
        subtotal: 15.99,
      },
    ],
    createdAt: "2025-04-12T18:45:10.456Z",
    total: 53.97,
    status: "completed",
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-red-700">Order History</h1>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50 pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Order #{order.id.substring(0, 6)}</CardTitle>
                <Badge variant="outline" className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{formatDate(new Date(order.createdAt))}</p>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-1">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">${item.subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200">
                <span className="font-bold">Total</span>
                <span className="font-bold text-green-700">${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
