"use client"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { UserCog } from "lucide-react"
import { updateUserSettings } from "./actions"
import { toast } from "sonner"

export default function SettingsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSave = async () => {
    const result = await updateUserSettings({ name, email, password })
    if (result.success) {
      toast.success("Settings updated successfully!")
    } else {
      toast.error(result.error || "Failed to update settings.")
    }
  }

  return (
    <SidebarInset>
      <div className="flex-1 p-4 md:p-8 max-w-2xl mx-auto space-y-10">
        {/* Hero Section */}
        <section className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <UserCog className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Account Settings</h1>
          <p className="text-muted-foreground text-lg mb-2">
            Manage your profile, email, and password securely.
          </p>
        </section>
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              placeholder="New Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button className="w-full" onClick={handleSave}>Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
} 