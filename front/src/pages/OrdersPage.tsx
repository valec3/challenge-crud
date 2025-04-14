
import { useOrders } from "@/hooks/useOrders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Loader } from "@/components/Loader"

export default function OrdersPage() {
  const { orders, loading } = useOrders()

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Loader />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-red-700">Orders History</h1>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Order #{order.id.slice(-6)}</CardTitle>
                <Badge variant="outline">{formatDate(order.createdAt)}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Items:</span>
                  <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                </div>
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
