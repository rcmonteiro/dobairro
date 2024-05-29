import { Meta, StoryObj } from '@storybook/react'

import { Button, type ButtonProps } from '..'

export default {
  title: 'Typography/Button',
  component: Button,
  args: {
    children: 'Click me',
    asChild: false,
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: 'select',
    },
    variant: {
      options: ['primary', 'secondary'],
      control: 'select',
    },
    asChild: {
      options: [true, false],
      control: 'boolean',
    }
  },
} as Meta<ButtonProps>

export const PrimaryButton: StoryObj<ButtonProps> = {
  args: {
    variant: 'primary',
  },
}

export const SecondaryButton: StoryObj<ButtonProps> = {
  args: {
    variant: 'secondary',
  },
}
