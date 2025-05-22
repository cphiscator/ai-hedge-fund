import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { cn } from '@/lib/utils'

const MODELS = [
  { id: 'claude-3-5-haiku-latest', name: '[anthropic] claude-3.5-haiku' },
  { id: 'claude-3-5-sonnet-latest', name: '[anthropic] claude-3.5-sonnet' },
  { id: 'claude-3-7-sonnet-latest', name: '[anthropic] claude-3.7-sonnet' },
  { id: 'deepseek-reasoner', name: '[deepseek] deepseek-r1' },
  { id: 'deepseek-chat', name: '[deepseek] deepseek-v3' },
  { id: 'gemini-2.0-flash', name: '[gemini] gemini-2.0-flash' },
  { id: 'gemini-2.0-pro-exp-02-05', name: '[gemini] gemini-2.0-pro' },
  { id: 'llama-3.3-70b-versatile', name: '[groq] llama-3.3 70b' },
  { id: 'gpt-4.5-preview', name: '[openai] gpt-4.5' },
  { id: 'gpt-4o', name: '[openai] gpt-4o' },
  { id: 'o1', name: '[openai] o1' },
  { id: 'o3-mini', name: '[openai] o3-mini' },
]

interface ModelSelectionProps {
  selectedModel: string
  onChange: (model: string) => void
}

export function ModelSelection({ selectedModel, onChange }: ModelSelectionProps) {
  return (
    <Listbox value={selectedModel} onChange={onChange}>
      <div className="relative">
        <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
          Select Model
        </Listbox.Label>
        <Listbox.Button className={cn(
          "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left",
          "border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm"
        )}>
          <span className="block truncate">
            {selectedModel ? MODELS.find(m => m.id === selectedModel)?.name : 'Select a model...'}
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
            {MODELS.map((model) => (
              <Listbox.Option
                key={model.id}
                className={({ active }) =>
                  cn(
                    "relative cursor-default select-none py-2 pl-10 pr-4",
                    active ? "bg-primary-100 text-primary-900" : "text-gray-900"
                  )
                }
                value={model.id}
              >
                {({ selected }) => (
                  <>
                    <span className={cn(
                      "block truncate",
                      selected ? "font-medium" : "font-normal"
                    )}>
                      {model.name}
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