
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { PlusCircle } from "lucide-react"

interface ProductCardProps {
  product: Product
  onAddToOrder: () => void
}

export default function ProductCard({ product, onAddToOrder }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-4">
      <div className="flex justify-between items-center mb-2 gap-2">
        <h3 className="text-xl font-bold text-red-700 text-ellipsis text-nowrap overflow-hidden flex-3">
          {product.name}
        </h3>
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 !text-left text-ellipsis text-nowrap overflow-hidden flex-1"
        >
          {product.category}
        </Badge>
      </div>


        <div className="h-32 bg-red-50 rounded-md mb-3 flex items-center justify-center">
          <img
            src={"https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_tM7V4fZBBw8RLmZo0Bi8WhtO2EosTRFD.jpg"}
            alt={product.name}
            className="h-full w-full object-cover rounded-md"
          />
        </div>

        <div className="mb-2">
          <p className="text-gray-600 text-sm mb-2">Ingredients:</p>
          <div className="flex flex-wrap gap-1">
            {product.ingredients.map((ingredient, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-xl font-bold text-green-700 mt-2">${product.price.toFixed(2)}</div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={onAddToOrder} className="w-full bg-red-600 hover:bg-red-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" /> Add to Order
        </Button>
      </CardFooter>
    </Card>
  )
}
