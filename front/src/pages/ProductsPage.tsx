
import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { useProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product, Category } from "@/lib/types"
import { useToast } from "@/hooks/useToast"
import { PlusCircle, Trash2 } from "lucide-react"
import { Loader } from "@/components/Loader"

export default function ProductsPage() {
  const { products, loading: productsLoading, createProduct, deleteProduct } = useProducts()
  const { categories, loading: categoriesLoading, createCategory, deleteCategory } = useCategories()
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    ingredients: [],
    category: "",
  })
  const [newCategory, setNewCategory] = useState<string>("")
  const [ingredientsInput, setIngredientsInput] = useState<string>("")
  const { toast } = useToast()

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !ingredientsInput) {
      toast({
        title: "Missing fields",
        description: "Please fill in all product fields",
        variant: "destructive",
      })
      return
    }

    const ingredients = ingredientsInput
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i)

    const productData = {
      name: newProduct.name,
      price: Number(newProduct.price),
      ingredients,
      category: newProduct.category
    }

    const success = await createProduct(productData)
    
    if (success) {
      setNewProduct({
        name: "",
        price: 0,
        ingredients: [],
        category: "",
      })
      setIngredientsInput("")
    }
  }

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast({
        title: "Missing category name",
        description: "Please enter a category name",
        variant: "destructive",
      })
      return
    }

    console.log('Submitting category:', newCategory);
    const success = await createCategory(newCategory.trim())
    if (success) {
      setNewCategory("")
    }
  }

  if (productsLoading || categoriesLoading) {
    return (
      <div className="container mx-auto p-4">
        <Loader />
      </div>
    )
  }

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-red-700">Manage Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Product Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Margherita Pizza"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="product-price">Price ($)</Label>
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  value={newProduct.price || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                  placeholder="e.g. 14.99"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="product-ingredients">Ingredients (comma separated)</Label>
                <Textarea
                  id="product-ingredients"
                  value={ingredientsInput}
                  onChange={(e) => setIngredientsInput(e.target.value)}
                  placeholder="e.g. Tomato, Mozzarella, Basil"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="product-category">Category</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleAddProduct} className="w-full bg-green-600 hover:bg-green-700">
                Add Product
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Category Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g. Gourmet Pizzas"
                />
              </div>

              <Button onClick={handleAddCategory} className="w-full bg-green-600 hover:bg-green-700">
                Add Category
              </Button>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Current Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category.id} className="bg-gray-100 p-2 rounded flex justify-between items-center">
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product List */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Current Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="h-8 w-8 text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-medium">${product.price.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-2">{product.category}</span>
                </div>
                <div>
                  <span className="text-gray-500">Ingredients:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100">
                        {ingredient}
                      </Badge>
                    ))}
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
