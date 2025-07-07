"use client"

import { useEffect, useState, useTransition } from "react"
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
import axios from "axios"
import { useCartStore } from '@/store/cart';
import { toast } from 'sonner';
import { saveForLater } from "@/app/cart/actions"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const asin = params.id
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [error, setError] = useState("")
  const addToCart = useCartStore((state) => state.addToCart);
  const [isPending,startTransition] = useTransition()
  const handleSaveForLater = (asin: string) => {
    startTransition(async () => {
      await saveForLater(asin);
      // Optionally show a toast or feedback
      toast("Added to Wishlist")
    });
  };

  useEffect(() => {
    setLoading(true)
    setError("")
    axios.request({
      method: 'GET',
      url: 'https://scout-amazon-data.p.rapidapi.com/Amazon-Product-Data',
      params: {
        asin,
        region: 'US',
      },
      headers: {
        'x-rapidapi-key': '4dadbbd2eemsh61b0ad390ba91d1p12a56cjsnef4aa84200e5',
        'x-rapidapi-host': 'scout-amazon-data.p.rapidapi.com',
      },
    })
      .then((res) => {
        setProduct(res.data)
        setSelectedImage(0)
      })
      .catch((err) => {
        setError("Failed to load product data.")
      })
      .finally(() => setLoading(false))
  }, [asin])

  if (loading) {
    return (
      <SidebarInset>
        <div className="flex-1 p-8 flex items-center justify-center text-lg">Loading product...</div>
      </SidebarInset>
    )
  }

  if (error || !product) {
    return (
      <SidebarInset>
        <div className="flex-1 p-8 flex items-center justify-center text-lg text-red-500">{error || "Product not found."}</div>
      </SidebarInset>
    )
  }

  const images = [product.product_image, ...(product.thumbnail_images || [])].filter(Boolean)
  const price = product.price_info?.Price || "-"
  const rating = product.star_rating || "-"
  const numRatings = product.num_ratings || "-"
  const about = product.about_this_item || []
  const reviews = product.reviews || []

  return (
    <SidebarInset>
      <div className="flex-1 p-4 md:p-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.product_name}</span>
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
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.product_name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-y-0 left-2 flex items-center">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-2 flex items-center">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.product_name} ${index + 1}`}
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
              <h1 className="text-3xl font-bold mb-2">{product.product_name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(parseFloat(rating)) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{rating}</span>
                <span className="text-sm text-muted-foreground">({numRatings} reviews)</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold">${price}</span>
                {product.product_availability && (
                  <Badge variant={product.product_availability === "In Stock" ? "secondary" : "destructive"}>
                    {product.product_availability}
                  </Badge>
                )}
                {product.is_prime && (
                  <Badge variant="outline">Prime</Badge>
                )}
              </div>
            </div>

            <p className="text-muted-foreground">{product.product_description}</p>

            {/* About This Item */}
            {about.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">About this item</h3>
                  <ul className="space-y-2">
                    {about.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

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
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1" size="lg" onClick={() => {
                  addToCart({
                    asin,
                    name: product.product_name,
                    price: parseFloat(price),
                    image: images[0],
                    quantity,
                    is_prime: product.is_prime,
                    product_availability: product.product_availability,
                  });
                  toast.success('Added to cart!');
                }}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart - ${(parseFloat(price) * quantity).toFixed(2)}
                </Button>
                <Button
                    disabled={isPending}
                
                variant="outline" size="lg" onClick={() =>{

handleSaveForLater(product.asin)
 setIsWishlisted(!isWishlisted)}}>
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Customer Summary</h3>
                  <div className="text-muted-foreground mb-4">{product.customer_summary}</div>
                  {product.video_urls && product.video_urls.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Product Videos</h4>
                      <ul className="space-y-2">
                        {product.video_urls.map((url: string, idx: number) => (
                          <li key={idx}>
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                              Watch Video {idx + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                    {reviews.length === 0 && <div className="text-muted-foreground">No reviews yet.</div>}
                    {reviews.map((review: any) => (
                      <div key={review.review_id} className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{review.author?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.author}</span>
                              {review.verified_purchase && (
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
                                      i < Math.round(parseFloat(review.rating)) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {review.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="font-semibold">{review.title}</div>
                        <p className="text-sm text-muted-foreground ml-13">{review.text}</p>
                        <Separator />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
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
      </div>
    </SidebarInset>
  )
}
