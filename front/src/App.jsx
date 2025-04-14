import ProductsPage from "./pages/ProductsPage"
import OrdersPage from "./pages/OrdersPage"
import MenuPage from "./pages/MenuPage"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom" // Asegúrate de importar `Route` de `react-router-dom`

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
      </BrowserRouter>
    </>
  )
}

export default App
