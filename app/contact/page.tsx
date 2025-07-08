"use client"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useState } from "react"
import { FaWhatsapp } from "react-icons/fa"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const whatsappNumber = "+2348114445426"
  const whatsappMessage = encodeURIComponent("Hello, I have a question about Carefree Store!")
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}?text=${whatsappMessage}`

  return (
    <SidebarInset>
      <div className="flex-1 p-4 md:p-8 max-w-2xl mx-auto space-y-8">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-muted-foreground text-lg mb-4">
            Have a question, feedback, or need help? We're here for you!
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us on WhatsApp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4 py-8">
              <FaWhatsapp className="h-12 w-12 text-green-600" />
              <p className="text-lg font-semibold">Chat with us on WhatsApp</p>
              <Button
                className="w-full"
                asChild
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={whatsappUrl}
                  className="flex items-center gap-2"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  Send WhatsApp Message
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>support@carefreestore.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-green-600" />
              <span>+234 811 444 5426</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-purple-600" />
              <span>NSUK, Keffi, Nasarawa, Nigeria</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
} 