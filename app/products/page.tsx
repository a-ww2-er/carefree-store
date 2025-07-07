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
import data from '@/data.json'
import { saveForLater } from "../cart/actions"
import { useTransition } from "react"
import { toast } from "sonner"

const categories = ["All", ...Object.keys(data)];
const allProducts = Object.values(data).flat();

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [isPending, startTransition] = useTransition();

  const handleSaveForLater = (asin: string) => {
    startTransition(async () => {
      await saveForLater(asin);
      // Optionally show a toast or feedback
      toast("Added to Wishlist")
    });
  };

  // Filter products
  const filteredProducts = (selectedCategories.length === 0 ? allProducts : allProducts.filter(p => selectedCategories.includes(p.category)))
    .filter((product) => {
      const matchesSearch = product.product_title.toLowerCase().includes(searchQuery.toLowerCase());
      // Parse price from string (e.g. "$19.99")
      const price = parseFloat(product.product_price.replace(/[^\d.]/g, "")) || 0;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      return matchesSearch && matchesPrice;
    });

  return (
    <SidebarInset>
      <div className="flex-1 p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">Discover our curated collection of products</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6">
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
                          setSelectedCategories([...selectedCategories, category]);
                        } else {
                          setSelectedCategories(selectedCategories.filter((c) => c !== category));
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
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
              {/* Sorting UI can be added here if needed */}
            </div>
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <Card
                  key={product.asin}
                  className={`group overflow-hidden transition-all hover:shadow-lg ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-48" : "aspect-square"}`}>
                    <Image
                      src={product.product_image || "/placeholder.svg"}
                      alt={product.product_title}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {product.productStatus && (
                      <Badge className="absolute left-3 top-3" variant="secondary">
                        {product.productStatus}
                      </Badge>
                    )}
                  </div>
                  <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold line-clamp-2">{product.product_title}</h3>
                      <Badge variant="outline" className="ml-2">
                        {product.product_star_rating}★
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold">{product.product_price}</span>
                      {product.product_original_price && (
                        <span className="text-sm text-muted-foreground line-through">{product.product_original_price}</span>
                      )}
                    </div>    <Button className="w-full" size="sm" asChild>
                      <Link href={`/products/${product.asin}`}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        View Product
                      </Link>
                    </Button>
                    <Button className="w-full mt-2" size="sm" onClick={() => handleSaveForLater(product.asin)} disabled={isPending}>
                      <Heart className="mr-2 h-4 w-4" />
                      Save for Later
                    </Button>
                
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
