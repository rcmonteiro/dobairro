import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const inputVariants = tv({
  base: [
    'flex h-10 w-full rounded-md border ring-primary/50 bg-default/5 border-default/10 px-3 py-2 text-sm',
    'ring-offset-background placeholder:text-default/80 disabled:cursor-not-allowed disabled:opacity-50',
    'focus:bg-transparent focus:border-transparent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-0',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium'
  ],
})

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input ref={ref} {...props} className={inputVariants({ className })} />
    )
  },
)
Input.displayName = 'Input'

export { Input, type InputProps }
