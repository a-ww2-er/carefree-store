"use client"

import { useEffect, useState, useTransition } from "react"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Heart, Star, Trash2, Share2, Grid3X3, List, LogIn, UserPlus, Info, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getWishlistItems } from "./actions"
import { saveForLater } from "../cart/actions"

interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  badge?: string
  category: string
  inStock: boolean
  dateAdded: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("dateAdded")
  const [isPending, startTransition] = useTransition();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWishlist() {
      setLoading(true)
      const items = await getWishlistItems()
      setWishlistItems(items)
      setIsLoggedIn(Array.isArray(items))
      setLoading(false)
    }
    fetchWishlist()
  }, [])

  const handleSaveForLater = (asin: string) => {
    startTransition(async () => {
      await saveForLater(asin)
      // Optionally refetch wishlist
      const items = await getWishlistItems()
      setWishlistItems(items)
    })
  }

  const removeFromWishlist = (id: number) => {
    // This function will need to be updated to remove from DB
    console.log(`Removing item ${id} from wishlist`)
  }

  const moveToCart = (id: number) => {
    // In a real app, this would add to cart and optionally remove from wishlist
    console.log(`Moving item ${id} to cart`)
  }

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.product_price.replace(/[^\d.]/g, "")) - parseFloat(b.product_price.replace(/[^\d.]/g, ""))
      case "price-high":
        return parseFloat(b.product_price.replace(/[^\d.]/g, "")) - parseFloat(a.product_price.replace(/[^\d.]/g, ""))
      case "name":
        return a.product_title.localeCompare(b.product_title)
      case "dateAdded":
      default:
        // Since we don't have dateAdded, just return 0 for now
        return 0
    }
  })

  if (loading) {
    return (
      <SidebarInset>
        <div className="flex-1 flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mr-3" />
          <span className="text-lg text-muted-foreground">Loading your wishlist...</span>
        </div>
      </SidebarInset>
    )
  }

  if (!isLoggedIn) {
    return (
      <SidebarInset>
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-2xl mx-auto text-center py-12">
            <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
            <p className="text-muted-foreground mb-8">
              Sign in to save your favorite items and access them from any device.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/auth/register">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    )
  }

  return (
    <SidebarInset>
      <div className="flex-1 p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
            </p>
          </div>
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

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Start adding items you love to keep track of them</p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Wishlist Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Alert className="flex-1">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Items in your wishlist are saved to your account and synced across all your devices.
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dateAdded">Recently Added</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share List
                </Button>
              </div>
            </div>

            {/* Wishlist Items */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {sortedItems.map((item) => (
                <Card
                  key={item.id}
                  className={`group overflow-hidden transition-all hover:shadow-lg ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-48" : "aspect-square"}`}>
                    <Image
                      src={item.product_image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {item.productStatus && (
                      <Badge
                        className="absolute left-3 top-3"
                        variant={
                          item.productStatus === "Sale"
                            ? "destructive"
                            : item.productStatus === "New"
                              ? "default"
                              : item.productStatus === "Premium"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {item.productStatus}
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {/* {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary">Out of Stock</Badge>
                      </div>
                    )} */}
                  </div>
                  <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold line-clamp-2">{item.product_title}</h3>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {item.productStatus || "Product"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{item.product_star_rating}</span>
                      <span className="text-sm text-muted-foreground">({item.product_num_ratings})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold">{item.product_price}</span>
                      {item.product_original_price && (
                        <span className="text-sm text-muted-foreground line-through">{item.product_original_price}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Added to wishlist
                    </p>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm" asChild>
                        <Link href={`/products/${item.asin}`}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          View Product
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => removeFromWishlist(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Wishlist Summary */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Wishlist Summary</h3>
                    <p className="text-sm text-muted-foreground">
                      Total value: ${sortedItems.reduce((sum, item) => sum + parseFloat(item.product_price.replace(/[^\d.]/g, "")), 0).toFixed(2)} •
                      {sortedItems.length} items in wishlist
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Wishlist
                    </Button>
                    <Button
                      onClick={() => {
                        const inStockItems = sortedItems.filter((item) => item.inStock)
                        inStockItems.forEach((item) => moveToCart(item.id))
                      }}
                      disabled={sortedItems.filter((item) => item.inStock).length === 0}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add All to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </SidebarInset>
  )
}
