'use client'

import { CaretDown, Check } from '@phosphor-icons/react'
import * as Select from '@radix-ui/react-select'
import React, { type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const selectItemVariants = tv({
  base: 'flex justify-between cursor-pointer px-2 py-2 border-none ring-0 outline-none items-center hover:bg-default/10',
})

interface SelectItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof selectItemVariants> {
  value: string
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, value, className, ...props }, ref) => {
    return (
      <Select.Item
        className={selectItemVariants({ className })}
        value={value}
        {...props}
        ref={ref}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator>
          <Check />
        </Select.ItemIndicator>
      </Select.Item>
    )
  },
)

const SelectRoot = ({ children }: { children: ReactNode}) => {
  return <Select.Root>{children}</Select.Root>
}

const SelectContent = ({ children }: { children: ReactNode }) => {
  return (
    <Select.Portal>
      <Select.Content className="bg-white border-default/10 flex flex-col gap-4 w-full rounded-md text-sm">
        <Select.Viewport className="SelectViewport">
          <Select.Group>
            {children}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  )
}

const SelectTrigger = ({label}:{label: string}) => {
  return (
    <Select.Trigger className="SelectTrigger flex items-center ring-offset-background placeholder:text-default/80 disabled:cursor-not-allowed focus:bg-transparent focus:border-transparent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:opacity-50 justify-between h-10 w-full rounded-md border ring-primary/50 bg-default/5 border-default/10 px-3 py-2 text-sm" aria-label={label}>
      <Select.Value placeholder={label} className='text-default/80' />
      <Select.Icon className="SelectIcon">
        <CaretDown />
      </Select.Icon>
    </Select.Trigger>
  )
}

export { SelectContent, SelectItem, SelectRoot, SelectTrigger }

