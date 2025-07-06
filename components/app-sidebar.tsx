import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Home,
  ShoppingBag,
  Search,
  Package,
  Heart,
  ShoppingCart,
  Sparkles,
  LogIn,
  UserPlus,
  Info,
  Phone,
} from "lucide-react"
import Link from "next/link"

const publicNavigation = [
  {
    title: "Shop",
    items: [
      { title: "Home", url: "/", icon: Home },
      { title: "Products", url: "/products", icon: ShoppingBag },
      { title: "Categories", url: "/categories", icon: Package },
      { title: "Search", url: "/search", icon: Search },
    ],
  },
  {
    title: "Account",
    items: [
      { title: "Sign In", url: "/auth/login", icon: LogIn },
      { title: "Create Account", url: "/auth/register", icon: UserPlus },
      { title: "Cart", url: "/cart", icon: ShoppingCart },
      { title: "Wishlist", url: "/wishlist", icon: Heart },
    ],
  },
  {
    title: "Support",
    items: [
      { title: "About Us", url: "/about", icon: Info },
      { title: "Contact", url: "/contact", icon: Phone },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Carefree Store</span>
                  <span className="truncate text-xs">Your Shopping Destination</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {publicNavigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-4 text-center space-y-3">
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm">Join Our Community</h3>
                  <p className="text-xs text-muted-foreground">
                    Sign up for exclusive deals and early access to new collections
                  </p>
                </div>
                <div className="space-y-2">
                  <Button size="sm" className="w-full" asChild>
                    <Link href="/auth/register">
                      <UserPlus className="mr-2 h-3 w-3" />
                      Sign Up
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link href="/auth/login">
                      <LogIn className="mr-2 h-3 w-3" />
                      Sign In
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
