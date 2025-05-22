import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import { cn } from '@/lib/utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface DashboardProps {
  selectedAnalysts: string[]
  selectedModel: string
  tickers: string[]
  onTickersChange: (tickers: string[]) => void
}

export function Dashboard({ 
  selectedAnalysts, 
  selectedModel,
  tickers,
  onTickersChange,
}: DashboardProps) {
  const [newTicker, setNewTicker] = useState('')
  const [portfolioValue, setPortfolioValue] = useState(100000)
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [100000, 102000, 101500, 103000, 105000],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
      },
    ],
  })

  const handleAddTicker = () => {
    if (newTicker && !tickers.includes(newTicker.toUpperCase())) {
      onTickersChange([...tickers, newTicker.toUpperCase()])
      setNewTicker('')
    }
  }

  const handleRemoveTicker = (ticker: string) => {
    onTickersChange(tickers.filter(t => t !== ticker))
  }

  return (
    <div className="grid gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Portfolio Overview</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Portfolio Value</p>
            <p className="text-2xl font-bold text-primary-600">
              ${portfolioValue.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Active Positions</p>
            <p className="text-2xl font-bold text-primary-600">{tickers.length}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Selected Analysts</p>
            <p className="text-2xl font-bold text-primary-600">{selectedAnalysts.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Portfolio Performance</h2>
        <div className="h-[300px]">
          <Line 
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Manage Tickers</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTicker}
            onChange={(e) => setNewTicker(e.target.value.toUpperCase())}
            placeholder="Enter ticker symbol..."
            className={cn(
              "block w-full rounded-lg border-gray-300 shadow-sm",
              "focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            )}
          />
          <button
            onClick={handleAddTicker}
            className={cn(
              "inline-flex items-center rounded-lg bg-primary-600 px-4 py-2",
              "text-sm font-semibold text-white shadow-sm hover:bg-primary-500",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-primary-600"
            )}
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tickers.map((ticker) => (
            <span
              key={ticker}
              className={cn(
                "inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-1",
                "text-xs font-semibold text-primary-600"
              )}
            >
              {ticker}
              <button
                onClick={() => handleRemoveTicker(ticker)}
                className="ml-1 text-primary-500 hover:text-primary-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}