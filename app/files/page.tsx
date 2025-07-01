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

export default function FilesPage() {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  const handleFileSelect = (file: FileItem) => {
    if (file.type === "file") {
      setSelectedFile(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">File Browser</h1>
        <p className="text-muted-foreground">Browse and manage your media files</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        {/* File Browser */}
        <div className="space-y-4">
          <FileBrowser onFileSelect={handleFileSelect} />
        </div>

        {/* Video Player */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Media Preview</h2>
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
