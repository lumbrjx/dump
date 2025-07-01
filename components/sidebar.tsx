import { Button } from "@/components/ui/button"
import { Home, FolderOpen, Upload, Settings, BarChart3, Users, HardDrive } from "lucide-react"

export function Sidebar() {
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
          <Button variant="ghost" className="w-full justify-start">
            <Home className="w-4 h-4 mr-3" />
            Dashboard
          </Button>

          <Button variant="default" className="w-full justify-start">
            <FolderOpen className="w-4 h-4 mr-3" />
            File Browser
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <Upload className="w-4 h-4 mr-3" />
            Upload
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <BarChart3 className="w-4 h-4 mr-3" />
            Analytics
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <Users className="w-4 h-4 mr-3" />
            Users
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
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
