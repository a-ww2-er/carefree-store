import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import data from '@/data.json'

export default function CategoriesPage() {
  const categories = Object.keys(data);

  return (
    <SidebarInset>
      <div className="flex-1 p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-lg text-muted-foreground">
            Discover our curated collection of artisan products organized by category
          </p>
        </div>
        <section>
          <h2 className="text-2xl font-bold mb-6">All Categories</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const products = data[category];
              const preview = products[0];
              return (
                <Card key={category} className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={preview?.product_image || "/placeholder.svg"}
                      alt={category}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{category}</CardTitle>
                      <Badge variant="outline">{products.length}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="outline" className="w-full bg-transparent" size="sm" asChild>
                      <Link href={`/products?category=${encodeURIComponent(category)}`}>
                        Browse
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </SidebarInset>
  );
}
