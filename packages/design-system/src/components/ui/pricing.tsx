import React, { type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cm } from '../../utils/class-merge'

const pricingCardVariants = tv({
  base: [
    'flex flex-col rounded-2xl p-8 space-y-6 text-white',
    'hover:ring-4 transition ease-in-out duration-200'
  ],

  variants: {
    variant: {
      default: '',
      highlight: 'bg-primary',
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})

interface PricingCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pricingCardVariants> {
      children: ReactNode
      variant?: 'default' | 'highlight'
    }

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({ children, variant, className, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={pricingCardVariants({ className, variant })}>{children}</div>
    )
  },
)
PricingCard.displayName = 'PricingCard'

// Price
const PricingCardPrice = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} {...props} className={cm("text-5xl", className)} />
  },
)
PricingCardPrice.displayName = 'PricingCardPrice'

// Title
const PricingCardTitle = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} {...props} className={cm("font-bold text-xl", className)} />
  },
)
PricingCardTitle.displayName = 'PricingCardTitle'

// Description
const PricingCardDescription = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} {...props} className={cm("text-white", className)} />
  },
)
PricingCardDescription.displayName = 'PricingCardDescription'

// CTA Button
const PricingCardCTA = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return <button ref={ref} {...props} className={cm("bg-white rounded-full py-2 text-black", className)} />
  },
)
PricingCardCTA.displayName = 'PricingCardCTA'

// Feature list
const PricingCardFeatures = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={
        cm(
          "[&_li]:bg-[url(/images/check-circle-thin.svg)] [&_li]:bg-no-repeat [&_li]:pl-8 [&_li]:my-6 text-sm", 
          className
        )}>{children}</div>
    )
  },
)
PricingCardFeatures.displayName = 'PricingCardFeatures'


export { PricingCard, PricingCardCTA, PricingCardDescription, PricingCardFeatures, PricingCardPrice, PricingCardTitle, type PricingCardProps }

