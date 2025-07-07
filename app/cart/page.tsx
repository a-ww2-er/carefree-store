"use client"

import { useState } from "react"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, Heart, ShoppingBag, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCartStore } from '@/store/cart';
import { useSession } from "next-auth/react"
import { saveForLater } from "./actions"
import { useTransition } from "react"

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

export default function CartPage() {
  const { data: session } = useSession()
  const { cartItems, updateQuantity, removeItem } = useCartStore();
  const [promoCode, setPromoCode] = useState("")
  const user = session?.user
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax
  const [isPending, startTransition] = useTransition();

  const handleSaveForLater = (asin: string) => {
    startTransition(async () => {
      await saveForLater(asin);
      removeItem(asin);
    });
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
     
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-xl font-semibold">Shopping Cart</h1>
          <Badge variant="secondary">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</Badge>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-8">
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
                    <div key={item.asin} className="flex gap-4 p-4 border rounded-lg">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={150}
                          height={150}
                          className="w-full h-full object-cover"
                        />
                        {/* {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="secondary" className="text-xs">
                              Out of Stock
                            </Badge>
                          </div>
                        )} */}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            {/* {item.variant && <p className="text-sm text-muted-foreground">{item.variant}</p>} */}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.asin)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">${item.price}</span>
                            {/* {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                            )} */}
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.asin, item.quantity - 1)}
                              // disabled={!item.inStock}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.asin, item.quantity + 1)}
                              // disabled={!item.inStock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleSaveForLater(item.asin)} disabled={isPending}>
                            <Heart className="mr-1 h-3 w-3" />
                            Save for Later
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Saved Items */}
              {/* This section is no longer needed as saved items are not tracked in the store */}
              {/* {savedItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Saved for Later</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {savedItems.map((item) => (
                        <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div className="flex-1 space-y-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">${item.price}</span>
                              {item.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ${item.originalPrice}
                                </span>
                              )}
                            </div>
                            <Button size="sm" variant="outline" className="w-full">
                              Move to Cart
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )} */}
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

                  <Button className="w-full" size="lg" asChild>
                    <Link href={user ? "/checkout":"/auth/login"}>
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    {shipping > 0 && <p>Free shipping on orders over $100</p>}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold">Need Help?</h3>
                    <p className="text-sm text-muted-foreground">Contact our customer service team</p>
                    <Button variant="outline" size="sm">
                      Get Support
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
