"use client"

import { useState } from "react"
import { FileBrowser } from "@/components/file-browser"
import { VideoPlayer } from "@/components/video-player"

interface FileItem {
  name: string
  type: "file" | "folder"
  size?: string
  modified: string
  duration?: string
  format?: string
}

export default function DashboardPage() {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  const handleFileSelect = (file: FileItem) => {
    if (file.type === "file") {
      setSelectedFile(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Manage your media files and preview content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Browser */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">File Browser</h2>
          <FileBrowser onFileSelect={handleFileSelect} />
        </div>

        {/* Video Player */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Media Preview</h2>
          <VideoPlayer
            fileName={selectedFile?.name}
            fileSize={selectedFile?.size}
            duration={selectedFile?.duration}
            format={selectedFile?.format}
          />
        </div>
      </div>
    </div>
  )
}
