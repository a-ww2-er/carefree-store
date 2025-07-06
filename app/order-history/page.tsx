"use client"

import { useState } from "react"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, Clock, Eye, Download, RotateCcw, Search, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Order {
  id: string
  orderNumber: string
  date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  itemCount: number
  trackingNumber?: string
  estimatedDelivery?: string
  items: {
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }[]
}

const orders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001234",
    date: "2024-01-28",
    status: "processing",
    total: 401.97,
    itemCount: 3,
    estimatedDelivery: "2024-02-05",
    items: [
      {
        id: 1,
        name: "Artisan Ceramic Vase",
        price: 89.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        name: "Handwoven Silk Scarf",
        price: 156.0,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-2024-001123",
    date: "2024-01-20",
    status: "shipped",
    total: 234.5,
    itemCount: 1,
    trackingNumber: "1Z999AA1234567890",
    estimatedDelivery: "2024-01-30",
    items: [
      {
        id: 3,
        name: "Crystal Pendant Necklace",
        price: 234.0,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD-2024-001089",
    date: "2024-01-15",
    status: "delivered",
    total: 145.99,
    itemCount: 2,
    items: [
      {
        id: 4,
        name: "Vintage Leather Journal",
        price: 45.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 5,
        name: "Handmade Pottery Bowl",
        price: 67.5,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "4",
    orderNumber: "ORD-2024-000987",
    date: "2024-01-10",
    status: "delivered",
    total: 89.99,
    itemCount: 1,
    items: [
      {
        id: 6,
        name: "Artisan Wooden Watch",
        price: 89.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "5",
    orderNumber: "ORD-2024-000856",
    date: "2024-01-05",
    status: "cancelled",
    total: 156.0,
    itemCount: 1,
    items: [
      {
        id: 7,
        name: "Silk Tapestry",
        price: 156.0,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "shipped":
      return <Truck className="h-4 w-4 text-blue-600" />
    case "processing":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "cancelled":
      return <Package className="h-4 w-4 text-red-600" />
    default:
      return <Package className="h-4 w-4 text-gray-600" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "shipped":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "processing":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export default function OrderHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "recent" && new Date(order.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === "older" && new Date(order.date) <= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    const matchesTab = activeTab === "all" || order.status === activeTab

    return matchesSearch && matchesStatus && matchesDate && matchesTab
  })

  const orderStats = {
    total: orders.length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  }

  return (
    <SidebarInset>
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Order History</h1>
              <p className="text-muted-foreground">Track and manage all your orders in one place</p>
            </div>
            <Badge variant="secondary">{orders.length} total orders</Badge>
          </div>

          {/* Order Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{orderStats.total}</div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{orderStats.processing}</div>
                <div className="text-sm text-muted-foreground">Processing</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{orderStats.shipped}</div>
                <div className="text-sm text-muted-foreground">Shipped</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{orderStats.delivered}</div>
                <div className="text-sm text-muted-foreground">Delivered</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{orderStats.cancelled}</div>
                <div className="text-sm text-muted-foreground">Cancelled</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search orders or products..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="recent">Last 30 Days</SelectItem>
                    <SelectItem value="older">Older than 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Order Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All ({orderStats.total})</TabsTrigger>
              <TabsTrigger value="processing">Processing ({orderStats.processing})</TabsTrigger>
              <TabsTrigger value="shipped">Shipped ({orderStats.shipped})</TabsTrigger>
              <TabsTrigger value="delivered">Delivered ({orderStats.delivered})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled ({orderStats.cancelled})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredOrders.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery || statusFilter !== "all" || dateFilter !== "all"
                        ? "Try adjusting your filters to see more results"
                        : "You haven't placed any orders yet"}
                    </p>
                    {!searchQuery && statusFilter === "all" && dateFilter === "all" && (
                      <Button asChild>
                        <Link href="/products">Start Shopping</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(order.date).toLocaleDateString()}
                              </div>
                              <span>•</span>
                              <span>
                                {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
                              </span>
                              <span>•</span>
                              <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getStatusColor(order.status)}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </div>
                            </Badge>
                          </div>
                        </div>
                        {order.trackingNumber && (
                          <div className="mt-2 p-2 bg-muted rounded-lg">
                            <p className="text-sm">
                              <span className="font-medium">Tracking:</span> {order.trackingNumber}
                            </p>
                          </div>
                        )}
                        {order.estimatedDelivery && order.status !== "delivered" && (
                          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              <span className="font-medium">Estimated delivery:</span>{" "}
                              {new Date(order.estimatedDelivery).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3 mb-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={60}
                                height={60}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{item.name}</h4>
                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-semibold text-sm">${item.price.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>

                        <Separator className="my-4" />

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/orders/${order.orderNumber}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </Button>
                            {order.status === "delivered" && (
                              <>
                                <Button variant="outline" size="sm">
                                  <Download className="mr-2 h-4 w-4" />
                                  Invoice
                                </Button>
                                <Button variant="outline" size="sm">
                                  <RotateCcw className="mr-2 h-4 w-4" />
                                  Reorder
                                </Button>
                              </>
                            )}
                            {order.status === "shipped" && (
                              <Button variant="outline" size="sm">
                                <Truck className="mr-2 h-4 w-4" />
                                Track Package
                              </Button>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Order total:{" "}
                            <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
                  <Package className="h-6 w-6" />
                  <span className="font-medium">Track an Order</span>
                  <span className="text-xs text-muted-foreground">Get real-time updates</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
                  <RotateCcw className="h-6 w-6" />
                  <span className="font-medium">Return an Item</span>
                  <span className="text-xs text-muted-foreground">Easy 30-day returns</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
                  <Download className="h-6 w-6" />
                  <span className="font-medium">Download Invoices</span>
                  <span className="text-xs text-muted-foreground">For your records</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
