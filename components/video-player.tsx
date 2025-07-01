"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings } from "lucide-react"

interface VideoPlayerProps {
  fileName?: string
  fileSize?: string
  duration?: string
  format?: string
}

export function VideoPlayer({ fileName, fileSize, duration, format }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState([75])
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  if (!fileName) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Select a video file to preview</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{fileName}</span>
          <div className="flex gap-2">
            {format && <Badge variant="secondary">{format}</Badge>}
            <Badge variant="outline">{fileSize}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          <video ref={videoRef} className="w-full h-full" poster="/placeholder.svg?height=400&width=600">
            <source src="/placeholder-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200">
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
              {/* Progress Bar */}
              <Slider
                value={[currentTime]}
                max={100}
                step={1}
                className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white"
              />

              {/* Control Buttons */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>

                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <SkipBack className="w-4 h-4" />
                  </Button>

                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <SkipForward className="w-4 h-4" />
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="w-20 [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white"
                    />
                  </div>

                  <span className="text-sm">0:00 / {duration || "0:00"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Settings className="w-4 h-4" />
                  </Button>

                  <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Duration:</span>
            <span className="ml-2">{duration || "Unknown"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Size:</span>
            <span className="ml-2">{fileSize || "Unknown"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
