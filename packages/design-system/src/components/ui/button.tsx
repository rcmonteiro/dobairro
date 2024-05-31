import { Slot } from '@radix-ui/react-slot'
import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: [
    'rounded-full py-2 px-6 ring-offset-background flex items-center whitespace-nowrap flex-nowrap',
    'hover:ring-4 transition ease-in-out duration-200'
  ],

  variants: {
    size: {
      icon: 'p-2',
      small: 'text-sm',
      md: 'text-base',
    },
    variant: {
      primary: 'bg-primary text-white ring-primary/20',
      secondary: 'bg-secondary text-white ring-secondary/20',
      ghost: 'text-default ring-default/20',
      outline: 'text-default border border-default/50 ring-secondary/20',
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, size, variant, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp ref={ref} {...props} className={buttonVariants({ size, variant, className })} />
    )
  },
)
Button.displayName = 'Button'

export { Button, type ButtonProps }
