import React, { type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const cardRootVariants = tv({
  base: [
    'rounded-md p-6 ring-offset-background ring-2 space-y-4',
    'hover:ring-4 transition ease-in-out duration-200'
  ],
})

interface CardRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardRootVariants> {
      children: ReactNode
    }

const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cardRootVariants({ className })}>{children}</div>
    )
  },
)
CardRoot.displayName = 'Root'

export { CardRoot as Root, type CardRootProps }
