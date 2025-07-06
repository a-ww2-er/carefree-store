"use client"

import { useState } from "react"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ShoppingCart,
  Heart,
  Star,
  ArrowLeft,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock product data - in real app this would come from API
const product = {
  id: 1,
  name: "Artisan Ceramic Vase",
  price: 89.99,
  originalPrice: 120.0,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Image2",
    "/placeholder.svg?height=600&width=600&text=Image3",
    "/placeholder.svg?height=600&width=600&text=Image4",
  ],
  rating: 4.8,
  reviews: 124,
  badge: "Sale",
  category: "Home Decor",
  inStock: true,
  stockCount: 15,
  description:
    "This beautiful handcrafted ceramic vase is a testament to traditional artisan techniques passed down through generations. Each piece is unique, featuring subtle variations in color and texture that make it truly one-of-a-kind.",
  features: [
    "Handcrafted by skilled artisans",
    "Food-safe ceramic glaze",
    "Unique blue gradient finish",
    "Perfect for fresh or dried flowers",
    "Dishwasher safe",
  ],
  specifications: {
    Material: "High-quality ceramic",
    Dimensions: '12" H x 6" W',
    Weight: "2.5 lbs",
    Origin: "Handmade in Portugal",
    Care: "Dishwasher safe, hand wash recommended",
  },
  artisan: {
    name: "Maria Santos",
    image: "/placeholder.svg?height=60&width=60",
    bio: "Maria has been creating beautiful ceramics for over 20 years in her studio in Porto, Portugal.",
    rating: 4.9,
    products: 47,
  },
}

const reviews = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-01-15",
    comment: "Absolutely beautiful vase! The craftsmanship is exceptional and it looks perfect in my living room.",
    verified: true,
  },
  {
    id: 2,
    user: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2024-01-10",
    comment: "Great quality and fast shipping. The blue glaze is even more beautiful in person.",
    verified: true,
  },
  {
    id: 3,
    user: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-01-08",
    comment: "This vase exceeded my expectations. It's the perfect centerpiece for my dining table.",
    verified: false,
  },
]

const relatedProducts = [
  {
    id: 2,
    name: "Ceramic Bowl Set",
    price: 45.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Handmade Pottery Mug",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Artisan Dinner Plates",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
  },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <SidebarInset>
      <div className="flex-1 p-4 md:p-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <span>/</span>
          <Link href="/categories/home-decor" className="hover:text-foreground">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute left-4 top-4" variant="destructive">
                  {product.badge}
                </Badge>
              )}
              <div className="absolute inset-y-0 left-2 flex items-center">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images.length - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-2 flex items-center">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSelectedImage(selectedImage < product.images.length - 1 ? selectedImage + 1 : 0)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.inStock ? (
                  <Badge variant="secondary">In Stock ({product.stockCount})</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" size="lg" disabled={!product.inStock}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button variant="outline" size="lg" onClick={() => setIsWishlisted(!isWishlisted)}>
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Shipping & Returns */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Truck className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Orders over $75</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Shield className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-muted-foreground">SSL Protected</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              <TabsTrigger value="artisan">Artisan</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Product Specifications</h3>
                  <div className="grid gap-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b last:border-b-0">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                            <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.user}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground ml-13">{review.comment}</p>
                        <Separator />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="artisan" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={product.artisan.image || "/placeholder.svg"} alt={product.artisan.name} />
                      <AvatarFallback>{product.artisan.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{product.artisan.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.artisan.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm">{product.artisan.rating}</span>
                        <span className="text-sm text-muted-foreground">• {product.artisan.products} products</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{product.artisan.bio}</p>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    View All Products by {product.artisan.name}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Shipping Information</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Free standard shipping on orders over $75</li>
                        <li>• Standard shipping (5-7 business days): $9.99</li>
                        <li>• Express shipping (2-3 business days): $19.99</li>
                        <li>• Overnight shipping: $29.99</li>
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-2">Return Policy</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• 30-day return window</li>
                        <li>• Items must be in original condition</li>
                        <li>• Free return shipping for defective items</li>
                        <li>• Refunds processed within 5-7 business days</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2 mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{relatedProduct.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${relatedProduct.price}</span>
                    <Button size="sm" asChild>
                      <Link href={`/products/${relatedProduct.id}`}>View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
