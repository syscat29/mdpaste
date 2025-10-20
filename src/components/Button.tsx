import * as React from 'react'
import { cn } from '@/lib/utils'

function Button({ className, type, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      type={type}
      data-slot='button'
      className={cn(
        'bg-neutral-800 hover:bg-neutral-800/50 cursor-pointer text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 h-9 px-4 py-2',
        className,
      )}
      {...props}
    />
  )
}

export { Button }
