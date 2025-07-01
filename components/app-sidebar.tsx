"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, FolderOpen, Upload, Settings, BarChart3, Users, HardDrive, Key } from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "File Browser", href: "/files", icon: FolderOpen },
    { name: "Upload", href: "/upload", icon: Upload },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "API Keys", href: "/api-keys", icon: Key },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="w-64 bg-card border-r h-full">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <HardDrive className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">StreamManager</span>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Button key={item.name} variant={isActive ? "default" : "ghost"} className="w-full justify-start" asChild>
                <Link href={item.href}>
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.name}
                </Link>
              </Button>
            )
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
        <div className="text-sm text-muted-foreground">
          <div className="flex justify-between mb-1">
            <span>Storage Used</span>
            <span>2.1 TB / 5 TB</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "42%" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
