import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { cn } from '@/lib/utils'

const ANALYSTS = [
  { id: 'ben_graham', name: 'Ben Graham' },
  { id: 'bill_ackman', name: 'Bill Ackman' },
  { id: 'cathie_wood', name: 'Cathie Wood' },
  { id: 'charlie_munger', name: 'Charlie Munger' },
  { id: 'phil_fisher', name: 'Phil Fisher' },
  { id: 'stanley_druckenmiller', name: 'Stanley Druckenmiller' },
  { id: 'warren_buffett', name: 'Warren Buffett' },
  { id: 'technical_analyst', name: 'Technical Analyst' },
  { id: 'fundamentals_analyst', name: 'Fundamentals Analyst' },
  { id: 'sentiment_analyst', name: 'Sentiment Analyst' },
  { id: 'valuation_analyst', name: 'Valuation Analyst' },
]

interface AnalystSelectionProps {
  selectedAnalysts: string[]
  onChange: (analysts: string[]) => void
}

export function AnalystSelection({ selectedAnalysts, onChange }: AnalystSelectionProps) {
  return (
    <Listbox value={selectedAnalysts} onChange={onChange} multiple>
      <div className="relative">
        <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
          Select Analysts
        </Listbox.Label>
        <Listbox.Button className={cn(
          "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left",
          "border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm"
        )}>
          <span className="block truncate">
            {selectedAnalysts.length === 0
              ? 'Select analysts...'
              : `${selectedAnalysts.length} analyst${selectedAnalysts.length === 1 ? '' : 's'} selected`}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className={cn(
            "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base",
            "shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          )}>
            {ANALYSTS.map((analyst) => (
              <Listbox.Option
                key={analyst.id}
                className={({ active }) =>
                  cn(
                    "relative cursor-default select-none py-2 pl-10 pr-4",
                    active ? "bg-primary-100 text-primary-900" : "text-gray-900"
                  )
                }
                value={analyst.id}
              >
                {({ selected }) => (
                  <>
                    <span className={cn(
                      "block truncate",
                      selected ? "font-medium" : "font-normal"
                    )}>
                      {analyst.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}