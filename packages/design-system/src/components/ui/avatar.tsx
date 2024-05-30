import React, { type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cm } from '../../utils/class-merge'

const avatarVariants = tv({
  base: [
    ''
  ],

  variants: {
    size: {
      icon: '',
      full: 'grid grid-cols-2 grid-rows-2 border-t border-primary/50 pt-4',
    },
  },

  defaultVariants: {
    size: 'icon',
  },
})

interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
      children: ReactNode
      size?: 'icon' | 'full'
    }

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ children, size, className, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={avatarVariants({ className, size })}>{children}</div>
    )
  },
)
Avatar.displayName = 'Avatar'

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => {
    return <img ref={ref} {...props} className={cm("rounded-full size-12 row-span-2", className)} />
  },
)
AvatarImage.displayName = 'AvatarImage'

const AvatarName = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} {...props} className={cm("text-black", className)} />
  },
)
AvatarName.displayName = 'AvatarName'

const AvatarRole = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} {...props} className={cm("text-default/80", className)} />
  },
)
AvatarRole.displayName = 'AvatarRole'

export { Avatar, AvatarImage, AvatarName, AvatarRole, type AvatarProps }
