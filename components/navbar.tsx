"use client"

import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Search, LogIn, UserPlus, ShoppingCart, Heart, User as UserIcon } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { AVATAR_IMAGES } from "@/lib/constants/images"
import { useCartStore } from '@/store/cart';
import data from '@/data.json';
import { useRouter } from 'next/navigation';

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

interface NavbarProps {
  cartItemCount?: number
}

export function Navbar() {
  const { state } = useSidebar()
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user
  const user = session?.user
  const cartItems = useCartStore((store) => store.cartItems)
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const allProducts: Product[] = Object.values(data).flat();

  // Add scroll event listener to detect when to add shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 1) {
      const results = allProducts.filter((p) =>
        p.product_title.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur transition-shadow duration-200 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 items-center justify-between md:px-10">
        <div className="md:block hidden"></div>
        <div className="relative flex-1 max-w-md">
          <form onSubmit={handleSearch} autoComplete="off">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for products..."
              className="pl-10"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            />
          </form>
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute z-50 mt-2 w-full bg-white border rounded shadow-lg max-h-64 overflow-auto">
              {searchResults.map((product) => (
                <Link
                  key={product.asin}
                  href={`/products/${product.asin}`}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <img src={product.product_image || '/placeholder.svg'} alt={product.product_title} className="w-8 h-8 object-cover rounded" />
                  <span className="truncate">{product.product_title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Show login/signup buttons when sidebar is collapsed and user is not logged in */}
          {state === "collapsed" && !isLoggedIn && (
            <>
              <Button size="sm" variant="outline" asChild>
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button size="sm" asChild className="hidden sm:flex">
                <Link href="/auth/register">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}

          {/* Always show these buttons */}
          <Button size="icon" variant="outline" asChild>
            <Link href="/wishlist">
              <Heart className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="icon" variant="outline" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Show user avatar when logged in */}
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  {user?.image ? (
                    <AvatarImage src={user.image} alt={user.name || "User"} />
                  ) : (
                    <AvatarFallback>
                      <UserIcon className="h-5 w-5" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-3 py-2 border-b mb-2">
                  <div className="font-semibold text-sm">{user?.name}</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
