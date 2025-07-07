import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import SessionProv from "@/lib/SessionProv"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Carefree Store",
  description: "Your one-stop shop for all your needs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Set defaultOpen to false to make the sidebar collapsed by default
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProv>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider defaultOpen={false}>
          <Toaster position="top-right" />
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <Navbar  />
                <main className="flex-1">{children}</main>
              </div>
            </div>
      
          </SidebarProvider>
        </ThemeProvider>
        </SessionProv>
      </body>
    </html>
  )
}
