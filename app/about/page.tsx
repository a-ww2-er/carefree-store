"use client"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, Star, Shield } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <SidebarInset>
      <div className="flex-1 p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">About Carefree Store</h1>
          <p className="text-muted-foreground text-lg mb-4">
            Discover our story, mission, and the passionate team behind Carefree Store.
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">Since 2025</Badge>
            <Badge variant="outline">Your Trusted Marketplace</Badge>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="grid gap-6 md:grid-cols-3">
          <Card className="border bg-none border-gray-300 from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader>
              <Heart className="h-8 w-8 text-pink-600" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To connect people with quality products and exceptional service, making shopping joyful and effortless for everyone.
              </p>
            </CardContent>
          </Card>
          <Card className="border bg-none border-gray-300 from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardHeader>
              <Star className="h-8 w-8 text-yellow-500" />
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Customer First</li>
                <li>Integrity & Trust</li>
                <li>Innovation</li>
                <li>Community</li>
                <li>Sustainability</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border bg-none border-gray-300 from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardHeader>
              <Shield className="h-8 w-8 text-purple-600" />
              <CardTitle>Why Choose Us?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Curated, authentic products</li>
                <li>Secure shopping experience</li>
                <li>Fast, reliable delivery</li>
                <li>Dedicated support</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section className="mt-12 ">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Users className="h-6 w-6" /> Meet Our Team</h2>
          <div className="justify-center gap-6 items-center flex">
            {/* Example team members, replace with real data if available */}
            <Card className="text-center">
              <CardContent className="flex flex-col items-center p-6">
                <Image src="https://picsum.photos/400/400" alt="Team Member" width={80} height={80} className="rounded-full mb-3" />
                <h3 className="font-semibold">Ibrahim Kefas</h3>
                <p className="text-sm text-muted-foreground mb-1">Founder & CEO</p>
                <p className="text-xs text-muted-foreground">"Passionate about building a better marketplace for all."</p>
              </CardContent>
            </Card>
     
          </div>
        </section>
      </div>
    </SidebarInset>
  )
} 