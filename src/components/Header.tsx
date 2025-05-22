import { cn } from '@/lib/utils'

export function Header() {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur",
      "supports-[backdrop-filter]:bg-white/60"
    )}>
      <div className="container flex h-16 items-center px-4">
        <div className="flex gap-6 md:gap-10">
          <div className="flex items-center space-x-2">
            <svg 
              className="h-6 w-6 text-primary-600" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-bold text-xl text-primary-900">AI Hedge Fund</span>
          </div>
        </div>
      </div>
    </header>
  )
}