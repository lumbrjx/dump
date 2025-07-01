"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"

interface UploadFile {
  id: string
  name: string
  size: number
  progress: number
  status: "uploading" | "completed" | "error"
  type: string
}

export default function UploadPage() {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFileUpload = (files: FileList) => {
    const newFiles: UploadFile[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading" as const,
      type: file.type,
    }))

    setUploadFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file) => {
      const interval = setInterval(() => {
        setUploadFiles((prev) =>
          prev.map((f) => {
            if (f.id === file.id) {
              const newProgress = f.progress + Math.random() * 20
              if (newProgress >= 100) {
                clearInterval(interval)
                return { ...f, progress: 100, status: "completed" }
              }
              return { ...f, progress: newProgress }
            }
            return f
          }),
        )
      }, 500)
    })
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const removeFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload Media</h1>
        <p className="text-muted-foreground">Upload videos and media files to your library</p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>Drag and drop files here or click to browse</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Drop files here to upload</p>
            <p className="text-muted-foreground mb-4">Supports MP4, MOV, AVI, MKV and more</p>
            <Button
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.multiple = true
                input.accept = "video/*,audio/*"
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files
                  if (files) handleFileUpload(files)
                }
                input.click()
              }}
            >
              Browse Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploadFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
            <CardDescription>{uploadFiles.length} files in queue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadFiles.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <File className="w-8 h-8 text-muted-foreground" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2">
                      {file.status === "completed" && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {file.status === "error" && <AlertCircle className="w-4 h-4 text-red-500" />}
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>{formatFileSize(file.size)}</span>
                    <Badge variant="outline">{file.type.split("/")[1]?.toUpperCase()}</Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Progress value={file.progress} className="flex-1" />
                    <span className="text-sm font-medium min-w-[3rem]">{Math.round(file.progress)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Upload Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1 TB</div>
            <p className="text-xs text-muted-foreground">42% of total capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processing Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uploadFiles.filter((f) => f.status === "uploading").length}</div>
            <p className="text-xs text-muted-foreground">Files being processed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
