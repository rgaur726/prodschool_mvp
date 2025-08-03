"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimerProps {
  initialTime?: number // in seconds
  onTimeUp?: () => void
  className?: string
}

export function Timer({ initialTime = 1800, onTimeUp, className }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false)
            setIsFinished(true)
            onTimeUp?.()
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, onTimeUp])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(initialTime)
    setIsFinished(false)
  }

  const getTimerColor = () => {
    if (isFinished) return "text-destructive"
    if (timeLeft < 300) return "text-yellow-600" // Last 5 minutes
    if (timeLeft < 60) return "text-destructive" // Last minute
    return "text-foreground"
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className={cn("font-mono text-2xl font-bold", getTimerColor())}>{formatTime(timeLeft)}</div>
      <div className="flex gap-2">
        {!isRunning ? (
          <Button size="sm" onClick={handleStart} disabled={isFinished && timeLeft === 0}>
            <Play className="h-3 w-3 mr-1" />
            Start
          </Button>
        ) : (
          <Button size="sm" variant="outline" onClick={handlePause}>
            <Pause className="h-3 w-3 mr-1" />
            Pause
          </Button>
        )}
        <Button size="sm" variant="outline" onClick={handleReset}>
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset
        </Button>
      </div>
    </div>
  )
}
