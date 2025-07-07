import { Input } from "@/components/ui/input"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star, TrendingUp, Zap, Shield, UserPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PRODUCT_IMAGES, CATEGORY_IMAGES, HERO_IMAGE } from "@/lib/constants/images"
import { auth } from "@/auth"
import data from '@/data.json';

// Types for products from data.json
interface Product {
  asin: string;
  product_title: string;
  product_price: string;
  product_original_price: string;
  product_star_rating: string;
  product_num_ratings: string;
  product_image: string;
  is_prime: boolean;
  amount_sold: string;
  delivery_info: string;
  productStatus: string;
}

interface Category {
  name: string;
  count: number;
  image: string;
}

export default async function GuestHomePage() {
  const session = await auth()
  const isLoggedIn = !!session?.user

  const categories: Category[] = Object.keys(data).slice(0, 4).map((cat) => ({
    name: cat,
    count: (data as Record<string, Product[]>)[cat].length,
    image: (data as Record<string, Product[]>)[cat][0]?.product_image || '/placeholder.svg',
  }));

  const allProducts: Product[] = Object.values(data).flat();
  const featuredProducts: Product[] = allProducts.slice(29, 37);

  return (
    <SidebarInset>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 md:p-12">
          <div className="relative z-10 max-w-2xl">
            <Badge variant="secondary" className="mb-4">
              <Zap className="mr-1 h-3 w-3" />
              New Collection
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
              Welcome to
              <span className="block ">Carefree Store</span>
            </h1>
            <p className="mb-6 text-lg text-muted-foreground">
              Your one-stop destination for all your shopping needs. Quality products, great prices, and excellent service.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="text-base" asChild>
                <Link href="/products">Explore Collection</Link>
              </Button>
              {!isLoggedIn && (
                <Button size="lg" variant="outline" className="text-base" asChild>
                  <Link href="/auth/register">Join Our Community</Link>
                </Button>
              )}
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-full md:w-1/2 opacity-40">
            <Image
              src={HERO_IMAGE}
              alt="Hero"
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Sign Up CTA */}
        {!isLoggedIn && (
          <Card className="border-0 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Join Carefree Store Today</h3>
                  <p className="text-muted-foreground">
                    Create an account to save favorites, track orders, and get exclusive member benefits
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/register">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up Free
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features */}
        <section className="grid gap-6 md:grid-cols-3">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-600" />
              <CardTitle>Authentic Guarantee</CardTitle>
              <CardDescription>Every item is verified for authenticity and quality</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-green-600" />
              <CardTitle>Trending Designs</CardTitle>
              <CardDescription>Discover the latest trends in artisan craftsmanship</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardHeader>
              <Heart className="h-8 w-8 text-purple-600" />
              <CardTitle>Curated Selection</CardTitle>
              <CardDescription>Hand-picked items from the world's finest artisans</CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Categories */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <Button variant="outline" asChild>
              <Link href="/categories">View All</Link>
            </Button>
          </div>
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Card key={category.name} className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription>{category.count} items</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="outline" asChild>
              <Link href="/products">View All</Link>
            </Button>
          </div>
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Card key={product.asin} className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.product_image || "/placeholder.svg"}
                    alt={product.product_title}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <Badge
                    className="absolute left-3 top-3"
                    variant={
                      product.productStatus === "Sale"
                        ? "destructive"
                        : product.productStatus === "New"
                          ? "default"
                          : product.productStatus === "Premium"
                            ? "secondary"
                            : "outline"
                    }
                  >
                    {product.productStatus}
                  </Badge>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
                    asChild
                    // onClick={()=>{
                    //   isLoggedIn ? handleSaveForLater(product.asin) : router.push('/auth/login')
                    // }}
                  >
                    {/* <Link href={isL"/auth/login"> */}
                      <Heart className="h-4 w-4" />
                    {/* </Link> */}
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2">{product.product_title}</h3>
                  <div className="mt-2 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.product_star_rating}</span>
                    <span className="text-sm text-muted-foreground">({product.product_num_ratings})</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold">${product.product_price}</span>
                    {product.product_original_price && (
                      <span className="text-sm text-muted-foreground line-through">${product.product_original_price}</span>
                    )}
                  </div>
                  <Button className="mt-3 w-full" size="sm" asChild>
                    <Link href={`/products/${product.asin}`}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      View Product
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <Card className="border-0 bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest updates on new collections, exclusive deals, and artisan stories
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              By subscribing, you agree to our privacy policy. Unsubscribe at any time.
            </p>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
