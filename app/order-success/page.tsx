"use client"

import { useEffect, useState } from "react"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  Download,
  Share2,
  ArrowRight,
  Calendar,
  MapPin,
  CreditCard,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getOrderByNumber } from "../checkout/actions"
import { useSearchParams } from "next/navigation"

export default function OrderSuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true)
  const [orderData, setOrderData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('orderNumber')

  useEffect(() => {
    async function fetchOrder() {
      if (orderNumber) {
        const order = await getOrderByNumber(orderNumber)
        setOrderData(order)
      }
      setLoading(false)
    }
    fetchOrder()
  }, [orderNumber])

  useEffect(() => {
    // Hide confetti effect after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const downloadInvoice = () => {
    if (!orderData) return;
    
    // Create invoice content
    const invoiceContent = `
      CAREFREE STORE - INVOICE
      
      Order Number: ${orderData.orderNumber}
      Date: ${new Date(orderData.orderDate).toLocaleDateString()}
      
      SHIPPING ADDRESS:
      ${orderData.shippingInfo.firstName} ${orderData.shippingInfo.lastName}
      ${orderData.shippingInfo.address}
      ${orderData.shippingInfo.city}, ${orderData.shippingInfo.state} ${orderData.shippingInfo.zipCode}
      ${orderData.shippingInfo.country}
      
      ITEMS:
      ${orderData.items.map((item: any) => 
        `${item.name} x${item.quantity} - $${item.price}`
      ).join('\n')}
      
      SUBTOTAL: $${orderData.subtotal.toFixed(2)}
      SHIPPING: $${orderData.shipping.toFixed(2)}
      TAX: $${orderData.tax.toFixed(2)}
      TOTAL: $${orderData.total.toFixed(2)}
      
      Payment Method: ${orderData.paymentMethod}
      Status: ${orderData.status}
    `;

    // Create blob and download
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${orderData.orderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <SidebarInset>
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Loading order details...</h3>
            </div>
          </div>
        </div>
      </SidebarInset>
    )
  }

  if (!orderData) {
    return (
      <SidebarInset>
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Order not found</h3>
              <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist.</p>
              <Button asChild>
                <Link href="/order-history">View Order History</Link>
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
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="relative">
              <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
              {showConfetti && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-ping absolute h-16 w-16 rounded-full bg-green-400 opacity-20"></div>
                </div>
              )}
            </div>
            <h1 className="text-4xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Order #{orderData.orderNumber}</span>
              <span>•</span>
              <span>{new Date(orderData.orderDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Order Status Timeline */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center mb-2">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Order Placed</span>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
                <div className="flex-1 h-0.5 bg-muted mx-4"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mb-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium">Processing</span>
                  <span className="text-xs text-muted-foreground">1-2 days</span>
                </div>
                <div className="flex-1 h-0.5 bg-muted mx-4"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mb-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium">Shipped</span>
                  <span className="text-xs text-muted-foreground">3-5 days</span>
                </div>
                <div className="flex-1 h-0.5 bg-muted mx-4"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mb-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium">Delivered</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(orderData.estimatedDelivery).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderData.items.map((item: any) => (
                    <div key={item.asin} className="flex gap-4 p-4 border rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        <p className="font-semibold">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{orderData.shippingInfo.firstName} {orderData.shippingInfo.lastName}</p>
                    <p className="text-sm text-muted-foreground">{orderData.shippingInfo.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {orderData.shippingInfo.city}, {orderData.shippingInfo.state} {orderData.shippingInfo.zipCode}
                    </p>
                    <p className="text-sm text-muted-foreground">{orderData.shippingInfo.country}</p>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Estimated delivery: {new Date(orderData.estimatedDelivery).toLocaleDateString()}</span>
                  </div>
                  {orderData.trackingNumber && (
                    <div className="flex items-center gap-2 text-sm mt-2">
                      <Truck className="h-4 w-4" />
                      <span>Tracking: {orderData.trackingNumber}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <span className="text-sm">{orderData.paymentMethod}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary & Actions */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${orderData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${orderData.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${orderData.tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${orderData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* <Button className="w-full" asChild>
                    <Link href={`/orders/${orderData.orderNumber}`}>
                      <Package className="mr-2 h-4 w-4" />
                      Track Your Order
                    </Link>
                  </Button> */}
                  <Button  className="w-full" onClick={downloadInvoice}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Receipt
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Receipt
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Order
                  </Button>
                </CardContent>
              </Card>

              {/* Continue Shopping */}
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Continue Shopping</h3>
                  <p className="text-sm text-muted-foreground mb-4">Discover more unique artisan products</p>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/products">
                      Browse Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Support */}
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">Our customer service team is here to help</p>
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Email Confirmation Notice */}
          {/* <Card className="mt-8 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-200">Confirmation Email Sent</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    We've sent a confirmation email with your order details and tracking information to your email
                    address.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </SidebarInset>
  )
}
