"use client"
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
  useSidebar,
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
  User as UserIcon,
  Truck,
} from "lucide-react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useIsMobile } from "@/hooks/use-mobile"

const publicNavigation = [
  {
    title: "Shop",
    items: [
      { title: "Home", url: "/", icon: Home },
      { title: "Products", url: "/products", icon: ShoppingBag },
      { title: "Categories", url: "/categories", icon: Package },
      // { title: "Search", url: "/search", icon: Search },
      { title: "Orders", url: "/order-history", icon: Truck },
      { title: "Cart", url: "/cart", icon: ShoppingCart },
      { title: "Wishlist", url: "/wishlist", icon: Heart },
    ],
  },
  {
    title: "Account",
    items: [
      { title: "Sign In", url: "/auth/login", icon: LogIn },
      { title: "Create Account", url: "/auth/register", icon: UserPlus },
     
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
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user
  const user = session?.user
  console.log(user,session)
  const isMobile = useIsMobile()
  const { close } = useSidebar()

  const handleNavClick = () => {
    if (isMobile && close) close()
  }

  return (
    <Sidebar  variant="inset">
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
        {/* Show user info if logged in */}
        {isLoggedIn && (
          <div className="flex flex-col items-center py-6">
            <Avatar className="h-14 w-14 mb-2">
              {user?.image ? (
                <AvatarImage src={user.image} alt={user.name || "User"} />
              ) : (
                <AvatarFallback>
                  <UserIcon className="h-7 w-7" />
                </AvatarFallback>
              )}
            </Avatar>
            {/* {!isMobile && ( */}
              <>
                <div className="font-semibold text-base">{user?.name}</div>
                <div className="text-xs text-muted-foreground">{user?.email}</div>
                <Button size="sm" variant="outline" className="mt-2" onClick={() => signOut()}>
                  Sign out
                </Button>
              </>
            {/* )} */}
          </div>
        )}
        {/* Show navigation groups, but hide Account group if logged in */}
        {publicNavigation.map((group) => {
          if (isLoggedIn && group.title === "Account") return null
          return (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url} onClick={handleNavClick}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
      <SidebarFooter>
        {/* Hide sign up/sign in CTA if logged in */}
        {!isLoggedIn && (
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
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
