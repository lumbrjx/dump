"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { File, Folder, MoreHorizontal, Play, Download, Trash2, Edit, Search, Upload } from "lucide-react"

interface FileItem {
  name: string
  type: "file" | "folder"
  size?: string
  modified: string
  duration?: string
  format?: string
}

interface FileBrowserProps {
  onFileSelect: (file: FileItem) => void
}

export function FileBrowser({ onFileSelect }: FileBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPath, setCurrentPath] = useState("/")

  const files: FileItem[] = [
    { name: "Movies", type: "folder", modified: "2024-01-15" },
    { name: "TV Shows", type: "folder", modified: "2024-01-14" },
    { name: "Documentaries", type: "folder", modified: "2024-01-13" },
    {
      name: "sample-video-1.mp4",
      type: "file",
      size: "1.2 GB",
      modified: "2024-01-12",
      duration: "2:15:30",
      format: "MP4",
    },
    {
      name: "trailer-2024.mov",
      type: "file",
      size: "450 MB",
      modified: "2024-01-11",
      duration: "0:02:30",
      format: "MOV",
    },
    {
      name: "episode-01.mkv",
      type: "file",
      size: "800 MB",
      modified: "2024-01-10",
      duration: "0:45:20",
      format: "MKV",
    },
    {
      name: "concert-live.mp4",
      type: "file",
      size: "2.1 GB",
      modified: "2024-01-09",
      duration: "1:30:45",
      format: "MP4",
    },
  ]

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleFileClick = (file: FileItem) => {
    if (file.type === "folder") {
      setCurrentPath(`${currentPath}${file.name}/`)
    } else {
      onFileSelect(file)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">Path: {currentPath}</div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Modified</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFiles.map((file, index) => (
              <TableRow key={index} className="cursor-pointer hover:bg-muted/50" onClick={() => handleFileClick(file)}>
                <TableCell className="flex items-center gap-2">
                  {file.type === "folder" ? (
                    <Folder className="w-4 h-4 text-blue-500" />
                  ) : (
                    <File className="w-4 h-4 text-gray-500" />
                  )}
                  <span>{file.name}</span>
                </TableCell>
                <TableCell>{file.size || "-"}</TableCell>
                <TableCell>{file.duration || "-"}</TableCell>
                <TableCell>{file.format && <Badge variant="secondary">{file.format}</Badge>}</TableCell>
                <TableCell>{file.modified}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {file.type === "file" && (
                        <DropdownMenuItem>
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
