import React, { type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cm } from '../../utils/class-merge'

const featureTabsVariants = tv({
  base: [
    'w-full grid grid-cols-none sm:grid-cols-[35rem_1fr]'
  ],
})

interface FeatureTabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featureTabsVariants> {
      children: ReactNode
    }

const FeatureTabs = React.forwardRef<HTMLDivElement, FeatureTabsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={featureTabsVariants({ className })}>{children}</div>
    )
  },
)
FeatureTabs.displayName = 'FeatureTabs'

// Tab
const FeatureTabsTab = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} {...props} className={cm("cursor-pointer rounded-xl px-6 py-4 text-white hover:bg-white/5 data-[selected=true]:bg-white/10 data-[selected=true]:ring-1 data-[selected=true]:ring-inset data-[selected=true]:ring-white/10 sm:rounded-r-none", className)} />
  },
)
FeatureTabsTab.displayName = 'FeatureTabsTab'

// Content
const FeatureTabsContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} {...props} className={cm("row-start-1 my-10 w-auto overflow-hidden rounded-2xl sm:row-start-auto sm:w-[67.8125rem] lg:mt-0", className)} />
  },
)
FeatureTabsContent.displayName = 'FeatureTabsContent'

// Options
const FeatureTabsOptions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} {...props} className={cm("flex flex-col justify-center sm:ml-12", className)} />
  },
)
FeatureTabsOptions.displayName = 'FeatureTabsOptions'


export { FeatureTabs, FeatureTabsContent, FeatureTabsOptions, FeatureTabsTab, type FeatureTabsProps }

