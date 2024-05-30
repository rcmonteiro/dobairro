import { Slot } from '@radix-ui/react-slot'
import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const navLinkVariants = tv({
  base: [
    'border-b-2 border-transparent',
    'hover:border-primary transition ease-in-out duration-200'
  ],
})

interface NavLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLinkVariants> {
  asChild?: boolean
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'
    return (
      <Comp ref={ref} {...props} className={navLinkVariants({ className })} />
    )
  },
)
NavLink.displayName = 'NavLink'

export { NavLink, type NavLinkProps }
