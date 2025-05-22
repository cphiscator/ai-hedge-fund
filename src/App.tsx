import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Header } from '@/components/Header'
import { Dashboard } from '@/components/Dashboard'
import { AnalystSelection } from '@/components/AnalystSelection'
import { ModelSelection } from '@/components/ModelSelection'

export default function App() {
  const [selectedAnalysts, setSelectedAnalysts] = useState<string[]>([])
  const [selectedModel, setSelectedModel] = useState('')
  const [tickers, setTickers] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <div className="grid gap-6 md:grid-cols-2">
            <AnalystSelection 
              selectedAnalysts={selectedAnalysts}
              onChange={setSelectedAnalysts}
            />
            <ModelSelection
              selectedModel={selectedModel}
              onChange={setSelectedModel}
            />
          </div>
          
          <Dashboard
            selectedAnalysts={selectedAnalysts}
            selectedModel={selectedModel}
            tickers={tickers}
            onTickersChange={setTickers}
          />
        </div>
      </main>
    </div>
  )
}