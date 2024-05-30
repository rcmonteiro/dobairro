import React, { ComponentProps, type ElementType } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const headingVariants = tv({
  base: 'text-default font-bold',

  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl sm:text-3xl',
      xl: 'text-4xl sm:text-6xl',
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

interface HeadingProps
  extends ComponentProps<'h2'>,
    VariantProps<typeof headingVariants> {
  as?: ElementType
}

const Heading = React.forwardRef<ComponentProps<'h2'>, HeadingProps>(
  ({ as: Tag = 'h2', size, className, ...props }, ref) => {
    return (
      <Tag ref={ref} {...props} className={headingVariants({ size, className })} />
    )
  },
)
Heading.displayName = 'Heading'

export { Heading, type HeadingProps }
