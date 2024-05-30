import React, { type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const cardVariants = tv({
  base: [
    'rounded-md p-6 shadow-lg ring-offset-background shadow-black/10 ring-primary/50 ring-1 space-y-4',
    'hover:ring-4 transition ease-in-out duration-200'
  ],
})

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
      children: ReactNode
    }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cardVariants({ className })}>{children}</div>
    )
  },
)
Card.displayName = 'Card'

export { Card, type CardProps }
