"use client"

import { useState } from "react"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, LogIn, UserPlus, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  inStock: boolean
  variant?: string
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Artisan Ceramic Vase",
    price: 89.99,
    originalPrice: 120.0,
    image: "/placeholder.svg?height=150&width=150",
    quantity: 1,
    inStock: true,
    variant: "Blue Glaze",
  },
  {
    id: 2,
    name: "Handwoven Silk Scarf",
    price: 156.0,
    image: "/placeholder.svg?height=150&width=150",
    quantity: 2,
    inStock: true,
    variant: "Emerald Pattern",
  },
]

export default function GuestCartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [promoCode, setPromoCode] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-xl font-semibold">Guest Cart</h1>
          <Badge variant="secondary">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</Badge>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-8">
        {/* Guest Notice */}
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Info className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>You're shopping as a guest. Sign in to save your cart and access member benefits.</span>
            <div className="flex gap-2 ml-4">
              <Button size="sm" variant="outline" asChild>
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-3 w-3" />
                  Sign In
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">
                  <UserPlus className="mr-2 h-3 w-3" />
                  Sign Up
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={150}
                          height={150}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            {item.variant && <p className="text-sm text-muted-foreground">{item.variant}</p>}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">${item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" className="w-full">
                      Apply Code
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/auth/login?redirect=/checkout">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In to Checkout
                      </Link>
                    </Button>

                    <Button variant="outline" className="w-full" size="lg" asChild>
                      <Link href="/guest-checkout">
                        Continue as Guest
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="text-center text-sm text-muted-foreground space-y-1">
                    {shipping > 0 && <p>Free shipping on orders over $100</p>}
                    <p>Create an account to save your cart and track orders</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold">Member Benefits</h3>
                    <p className="text-sm text-muted-foreground">Join to unlock exclusive perks</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Save favorites and wishlists</li>
                      <li>• Track order history</li>
                      <li>• Exclusive member discounts</li>
                      <li>• Early access to new collections</li>
                    </ul>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/auth/register">
                        <UserPlus className="mr-2 h-3 w-3" />
                        Join Free
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </SidebarInset>
  )
}
