import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const navItemVariants = tv({
  base: [
    'group relative flex items-center gap-2 cursor-pointer rounded-full'
  ],

  variants: {
    current: {
      true: 'bg-primary text-white [&_svg]:text-white',
      false: 'text-default'
    }
  },

  defaultVariants: {
    current: false
  }


})

interface NavItemProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navItemVariants> {
  title: string
  href: string
  current: boolean
  icon: React.ElementType
}

const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ title, icon: Icon, current, className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        {...props}
        className={navItemVariants({ className, current })}
      >
        <div className="absolute left-0 size-12 top-0 inset-0 z-0 bg-primary rounded-full transform group-hover:w-full transition-all duration-150" />
        <Icon className="relative z-10 size-12 text-white rounded-full p-3" />
        <span className="relative z-10 font-medium group-hover:text-white transition-colors ease-in-out duration-150">
          {title}
        </span>
      </a>
    )
  }
)
NavItem.displayName = 'NavItem'

export { NavItem, type NavItemProps }
