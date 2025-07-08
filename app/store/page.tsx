"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ShoppingCart,
  Heart,
  Star,
  TrendingUp,
  Zap,
  Shield,
  UserPlus,
  ArrowRight,
  Users,
  Package,
  Award,
  Clock,
  Play,
  Quote,
  Truck,
  CreditCard,
  Headphones,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { HERO_IMAGE } from "@/lib/constants/images"
import { useSession } from "next-auth/react"
import data from "@/data.json"

// Types for products from data.json
interface Product {
  asin: string
  product_title: string
  product_price: string
  product_original_price: string
  product_star_rating: string
  product_num_ratings: string
  product_image: string
  is_prime: boolean
  amount_sold: string
  delivery_info: string
  productStatus: string
}

interface Category {
  name: string
  count: number
  image: string
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}

// Mock testimonials
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    comment: "Amazing quality products and super fast delivery! Highly recommend this store.",
    product: "Wireless Headphones",
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    comment: "Great customer service and the products exceeded my expectations. Will shop again!",
    product: "Smart Watch",
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    comment: "Love the variety and quality. My go-to store for everything I need!",
    product: "Home Decor",
  },
]

// Mock stats
const stats = [
  { label: "Happy Customers", value: "2K+", icon: Users },
  { label: "Products Sold", value: "3K+", icon: Package },
  { label: "5-Star Reviews", value: "2K+", icon: Award },
  { label: "Year Experience", value: "1+", icon: Clock },
]

export default function GuestHomePage() {
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const categories: Category[] = Object.keys(data)
    .slice(0, 4)
    .map((cat) => ({
      name: cat,
      count: (data as Record<string, Product[]>)[cat].length,
      image: (data as Record<string, Product[]>)[cat][0]?.product_image || "/placeholder.svg",
    }))

  const allProducts: Product[] = Object.values(data).flat()
  const featuredProducts: Product[] = allProducts.slice(29, 37)

  return (
    <SidebarInset>
      <div className="flex-1 space-y-12 p-4 md:p-8">
        {/* Enhanced Hero Section */}
        <motion.section
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 md:p-12 min-h-[500px] flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Animated background elements */}
          <motion.div className="absolute inset-0 opacity-10" style={{ y }}>
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-xl" />
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-secondary/20 rounded-full blur-xl" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
          </motion.div>

          <div className="relative z-10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4 animate-pulse">
                <Zap className="mr-1 h-3 w-3" />
                New Collection
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-4 text-4xl font-bold tracking-tight md:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Welcome to
              <motion.span
                className="block dark:bg-gradient-to-r from-primary to-secondary  dark:bg-clip-text dark:text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Carefree Store
              </motion.span>
            </motion.h1>

            <motion.p
              className="mb-6 text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Your one-stop destination for all your shopping needs. Quality products, great prices, and excellent
              service.
            </motion.p>

            <motion.div
              className="flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-base group" asChild>
                  <Link href="/products">
                    Explore Collection
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              {!isLoggedIn && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
                    <Link href="/auth/register">Join Our Community</Link>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Enhanced hero image with floating animation */}
          <div
            className="absolute right-0 top-0 h-full w-full md:w-1/2 opacity-40"
 
          >
          
              <Image
                src={HERO_IMAGE || "/placeholder.svg"}
                alt="Hero"
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
          </div>

        </motion.section>

        {/* Animated Stats Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/50">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                  className="text-2xl font-bold text-primary"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* Enhanced Sign Up CTA */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"
                animate={{
                  background: [
                    "linear-gradient(to right, hsl(var(--primary))/5%, hsl(var(--secondary))/5%)",
                    "linear-gradient(to right, hsl(var(--secondary))/5%, hsl(var(--primary))/5%)",
                    "linear-gradient(to right, hsl(var(--primary))/5%, hsl(var(--secondary))/5%)",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
              <CardContent className="p-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold">Join Carefree Store Today</h3>
                    <p className="text-muted-foreground">
                      Create an account to save favorites, track orders, and get exclusive member benefits
                    </p>
                  </motion.div>
                  <motion.div
                    className="flex gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div {...scaleOnHover}>
                      <Button variant="outline" asChild>
                        <Link href="/auth/login">Sign In</Link>
                      </Button>
                    </motion.div>
                    <motion.div {...scaleOnHover}>
                      <Button asChild>
                        <Link href="/auth/register">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Sign Up Free
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Enhanced Features Section */}
        <motion.section
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Shield,
              title: "Authentic Guarantee",
              description: "Every item is verified for authenticity and quality",
              gradient: "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
              iconColor: "text-blue-600",
            },
            {
              icon: TrendingUp,
              title: "Trending Designs",
              description: "Discover the latest trends in modern shopping",
              gradient: "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
              iconColor: "text-green-600",
            },
            {
              icon: Heart,
              title: "Curated Selection",
              description: "Hand-picked items from trusted sellers worldwide",
              gradient: "from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900",
              iconColor: "text-purple-600",
            },
          ].map((feature, index) => (
            <motion.div key={feature.title} variants={fadeInUp}>
              <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className={`border-0 bg-gradient-to-br ${feature.gradient} h-full`}>
                  <CardHeader>
                    <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 400 }}>
                      <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                    </motion.div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.section>

        {/* Customer Testimonials Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="text-center mb-8">
            <motion.h2
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              What Our Customers Say
            </motion.h2>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Real reviews from real customers
            </motion.p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 text-center border-0 bg-gradient-to-br from-background to-muted/30">
                  <Quote className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <p className="text-lg mb-6 italic">"{testimonials[currentTestimonial].comment}"</p>
                  <div className="flex items-center justify-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonials[currentTestimonial].avatar || "/placeholder.svg"} />
                      <AvatarFallback>{testimonials[currentTestimonial].name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-primary" : "bg-muted"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Enhanced Categories Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <motion.h2
              className="text-3xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Shop by Category
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button variant="outline" asChild>
                <Link href="/categories">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="grid gap-6 grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.div key={category.name} variants={fadeInUp}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl">
                    <div className="aspect-square overflow-hidden relative">
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </motion.div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.count} items</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Enhanced Featured Products */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <motion.h2
              className="text-3xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Featured Products
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button variant="outline" asChild>
                <Link href="/products">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="grid gap-6 grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div key={product.asin} variants={fadeInUp}>
                <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="group overflow-hidden transition-all hover:shadow-xl">
                    <div className="relative aspect-square overflow-hidden">
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                        <Image
                          src={product.product_image || "/placeholder.svg"}
                          alt={product.product_title}
                          width={300}
                          height={300}
                          className="h-full w-full object-cover"
                        />
                      </motion.div>
                      {product.productStatus && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
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
                        </motion.div>
                      )}
                      <motion.div
                        className="absolute right-3 top-3 opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button size="icon" variant="secondary">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-2 mb-2">{product.product_title}</h3>
                      <div className="mt-2 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.product_star_rating}</span>
                        <span className="text-sm text-muted-foreground">({product.product_num_ratings})</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg font-bold">${product.product_price}</span>
                        {product.product_original_price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.product_original_price}
                          </span>
                        )}
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="mt-3 w-full group" size="sm" asChild>
                          <Link href={`/products/${product.asin}`}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            View Product
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Service Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Why Choose Us?</h2>
            <p className="text-muted-foreground">We're committed to providing the best shopping experience</p>
          </div>
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                description: "Free delivery on orders over $50",
                color: "text-green-600",
              },
              {
                icon: CreditCard,
                title: "Secure Payment",
                description: "100% secure payment processing",
                color: "text-blue-600",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Round-the-clock customer service",
                color: "text-purple-600",
              },
            ].map((service, index) => (
              <motion.div key={service.title} variants={fadeInUp}>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="text-center p-6 border-0 bg-gradient-to-br from-background to-muted/30">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                      <service.icon className={`h-12 w-12 mx-auto mb-4 ${service.color}`} />
                    </motion.div>
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Enhanced Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-0 bg-gradient-to-r from-primary/10 to-secondary/10 overflow-hidden relative">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(45deg, hsl(var(--primary))/10%, hsl(var(--secondary))/10%)",
                  "linear-gradient(45deg, hsl(var(--secondary))/10%, hsl(var(--primary))/10%)",
                  "linear-gradient(45deg, hsl(var(--primary))/10%, hsl(var(--secondary))/10%)",
                ],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
            />
            <CardContent className="p-8 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
                <p className="text-muted-foreground mb-6">
                  Get the latest updates on new collections, exclusive deals, and special offers
                </p>
              </motion.div>
              <motion.div
                className="flex gap-3 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Input placeholder="Enter your email" className="flex-1" />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button>Subscribe</Button>
                </motion.div>
              </motion.div>
              <motion.p
                className="text-xs text-muted-foreground mt-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                By subscribing, you agree to our privacy policy. Unsubscribe at any time.
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SidebarInset>
  )
}
