"use client"

import { Link,useParams } from "react-router-dom"
import { Pizza, ClipboardList, Package, ListFilter } from "lucide-react"
import { cn } from "@/lib/utils"

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
  },
]

export default function Navbar() {
  const pathname = "nada"

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Pizza className="h-8 w-8 text-red-600" />
              <span className="text-xl font-bold text-red-700">Pizzeria POS</span>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
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
        </div>
      </div>
    </nav>
  )
}
