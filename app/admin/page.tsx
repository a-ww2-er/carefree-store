import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Package, DollarSign, ShoppingCart, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+180.1%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    value: "1,234",
    change: "+19%",
    trend: "up",
    icon: Package,
  },
  {
    title: "Active Users",
    value: "573",
    change: "+201",
    trend: "up",
    icon: Users,
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "Artisan Ceramic Vase",
    amount: "$89.99",
    status: "completed",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    product: "Handwoven Silk Scarf",
    amount: "$156.00",
    status: "processing",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    product: "Crystal Pendant",
    amount: "$234.00",
    status: "shipped",
  },
]

const topProducts = [
  {
    name: "Artisan Ceramic Vase",
    sales: 234,
    revenue: "$21,066",
    progress: 85,
  },
  {
    name: "Handwoven Silk Scarf",
    sales: 189,
    revenue: "$29,484",
    progress: 72,
  },
  {
    name: "Crystal Pendant Necklace",
    sales: 156,
    revenue: "$36,504",
    progress: 68,
  },
]

export default function AdminDashboard() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </header>

      <div className="flex-1 p-4 md:p-8">
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3 text-red-600" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.product}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "processing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                        <span className="text-sm font-medium">{order.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Eye className="mr-2 h-4 w-4" />
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best performing products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product) => (
                    <div key={product.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-muted-foreground">{product.revenue}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{product.sales} sales</span>
                        <span>{product.progress}%</span>
                      </div>
                      <Progress value={product.progress} className="h-2" />
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <Button className="h-20 flex-col gap-2">
                  <Package className="h-6 w-6" />
                  Add Product
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  Manage Users
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <ShoppingCart className="h-6 w-6" />
                  Process Orders
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <TrendingUp className="h-6 w-6" />
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
