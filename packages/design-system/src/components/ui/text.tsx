import React, { ComponentProps, type ElementType } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const textVariants = tv({
  base: '',

  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-xl',
      xl: 'text-2xl',
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

interface TextProps
  extends ComponentProps<'span'>,
    VariantProps<typeof textVariants> {
  as?: ElementType
}

const Text = React.forwardRef<ComponentProps<'span'>, TextProps>(
  ({ as: Tag = 'span', size, className, ...props }, ref) => {
    return (
      <Tag ref={ref} {...props} className={textVariants({ size, className })} />
    )
  },
)
Text.displayName = 'Text'

export { Text, type TextProps }
