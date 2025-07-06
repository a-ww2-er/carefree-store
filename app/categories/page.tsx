import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: "jewelry",
    name: "Jewelry",
    description: "Handcrafted necklaces, earrings, rings, and bracelets",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 234,
    featured: true,
    subcategories: ["Necklaces", "Earrings", "Rings", "Bracelets"],
  },
  {
    id: "home-decor",
    name: "Home Decor",
    description: "Beautiful pieces to enhance your living space",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 156,
    featured: true,
    subcategories: ["Vases", "Candles", "Wall Art", "Sculptures"],
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Unique clothing and accessories",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 189,
    featured: false,
    subcategories: ["Scarves", "Bags", "Hats", "Clothing"],
  },
  {
    id: "art",
    name: "Art",
    description: "Original paintings, prints, and artistic creations",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 98,
    featured: false,
    subcategories: ["Paintings", "Prints", "Sculptures", "Photography"],
  },
  {
    id: "pottery",
    name: "Pottery & Ceramics",
    description: "Handmade bowls, plates, mugs, and decorative pieces",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 145,
    featured: true,
    subcategories: ["Dinnerware", "Decorative", "Planters", "Mugs"],
  },
  {
    id: "textiles",
    name: "Textiles",
    description: "Woven fabrics, tapestries, and textile art",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 87,
    featured: false,
    subcategories: ["Tapestries", "Pillows", "Throws", "Rugs"],
  },
  {
    id: "woodwork",
    name: "Woodwork",
    description: "Carved sculptures, furniture, and wooden accessories",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 76,
    featured: false,
    subcategories: ["Furniture", "Sculptures", "Bowls", "Accessories"],
  },
  {
    id: "glass",
    name: "Glasswork",
    description: "Blown glass, stained glass, and glass sculptures",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 54,
    featured: false,
    subcategories: ["Vases", "Ornaments", "Lighting", "Tableware"],
  },
]

const featuredCategories = categories.filter((cat) => cat.featured)
const allCategories = categories

export default function CategoriesPage() {
  return (
    <SidebarInset>
      <div className="flex-1 p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-lg text-muted-foreground">
            Discover our curated collection of artisan products organized by category
          </p>
        </div>

        {/* Featured Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((category) => (
              <Card key={category.id} className="group overflow-hidden transition-all hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="mb-2">{category.productCount} products</Badge>
                    <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                    <p className="text-sm text-white/90">{category.description}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.subcategories.slice(0, 3).map((sub) => (
                      <Badge key={sub} variant="secondary" className="text-xs">
                        {sub}
                      </Badge>
                    ))}
                    {category.subcategories.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{category.subcategories.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/categories/${category.id}`}>
                      Explore {category.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Categories Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">All Categories</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allCategories.map((category) => (
              <Card key={category.id} className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  {category.featured && <Badge className="absolute left-3 top-3">Featured</Badge>}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <Badge variant="outline">{category.productCount}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {category.subcategories.slice(0, 2).map((sub) => (
                      <Badge key={sub} variant="secondary" className="text-xs">
                        {sub}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" size="sm" asChild>
                    <Link href={`/categories/${category.id}`}>
                      Browse
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Category Stats */}
        <section className="mt-12">
          <Card>
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Discover Artisan Excellence</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our carefully curated categories showcase the finest handcrafted items from talented artisans around
                  the world. Each piece tells a unique story and represents hours of skilled craftsmanship.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">1,200+</div>
                    <div className="text-sm text-muted-foreground">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">150+</div>
                    <div className="text-sm text-muted-foreground">Artisans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">25+</div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">4.8★</div>
                    <div className="text-sm text-muted-foreground">Avg Rating</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </SidebarInset>
  )
}
