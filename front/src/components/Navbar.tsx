
import { Link,useParams } from "react-router-dom"
import { useState } from "react"
import { Pizza, ClipboardList, Package, ListFilter, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    name: "Menu",
    href: "/menu",
    icon: Pizza,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ClipboardList,
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
  }
]

export default function Navbar() {
  const pathname = useParams().pathname
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Pizza className="h-8 w-8 text-red-600" />
              <span className="text-xl font-bold text-red-700">Pizzeria POS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  pathname === item.href ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <item.icon className="h-5 w-5 mr-1.5" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute w-full z-50 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-3 py-3 text-base font-medium rounded-md",
                  pathname === item.href ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
