import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const labelVariants = tv({
  base: 'text-default/80',
})

interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <label ref={ref} {...props} className={labelVariants({ className })}>{children}</label>
    )
  },
)
Label.displayName = 'Label'

export { Label, type LabelProps }
