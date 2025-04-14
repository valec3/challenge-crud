import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom" // Asegúrate de importar `Route` de `react-router-dom`
import ProductsPage from "./pages/ProductsPage"
import OrdersPage from "./pages/OrdersPage"
import MenuPage from "./pages/MenuPage"
import Navbar from "./components/Navbar"
import { Toaster } from "@/components/ui/sonner"
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/menu" />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </>
  )
}

export default App
