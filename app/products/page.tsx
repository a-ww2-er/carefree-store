"use client"

import { useState } from "react"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ShoppingCart, Heart, Star, Filter, Grid3X3, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Artisan Ceramic Vase",
    price: 89.99,
    originalPrice: 120.0,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    badge: "Sale",
    category: "Home Decor",
    inStock: true,
  },
  {
    id: 2,
    name: "Handwoven Silk Scarf",
    price: 156.0,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    badge: "New",
    category: "Fashion",
    inStock: true,
  },
  {
    id: 3,
    name: "Vintage Leather Journal",
    price: 45.99,
    originalPrice: 65.0,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 203,
    badge: "Sale",
    category: "Accessories",
    inStock: false,
  },
  {
    id: 4,
    name: "Crystal Pendant Necklace",
    price: 234.0,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5.0,
    reviews: 67,
    badge: "Premium",
    category: "Jewelry",
    inStock: true,
  },
  {
    id: 5,
    name: "Handmade Pottery Bowl",
    price: 67.5,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 156,
    category: "Home Decor",
    inStock: true,
  },
  {
    id: 6,
    name: "Artisan Wooden Watch",
    price: 189.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 92,
    badge: "Trending",
    category: "Accessories",
    inStock: true,
  },
]

const categories = ["All", "Home Decor", "Fashion", "Jewelry", "Accessories", "Art"]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <SidebarInset>
      <div className="flex-1 p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">Discover our curated collection of artisan products</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div className="flex items-center justify-between md:hidden mb-4">
              <h3 className="font-semibold">Filters</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h3>

              {/* Categories */}
              <div className="space-y-3 mb-6">
                <h4 className="font-medium">Categories</h4>
                {categories.slice(1).map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([...selectedCategories, category])
                        } else {
                          setSelectedCategories(selectedCategories.filter((c) => c !== category))
                        }
                      }}
                    />
                    <Label htmlFor={category} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <h4 className="font-medium">Price Range</h4>
                <div className="px-2">
                  <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`group overflow-hidden transition-all hover:shadow-lg ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-48" : "aspect-square"}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {product.badge && (
                      <Badge
                        className="absolute left-3 top-3"
                        variant={
                          product.badge === "Sale"
                            ? "destructive"
                            : product.badge === "New"
                              ? "default"
                              : product.badge === "Premium"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {product.badge}
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                      <Badge variant="outline" className="ml-2">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <Button className="w-full" size="sm" disabled={!product.inStock} asChild>
                      <Link href="/cart">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
