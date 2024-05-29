import { Meta, StoryObj } from '@storybook/react'

import { Text, type TextProps } from '..'

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: 'select',
    },

    as: {
      options: ['span', 'strong', 'em', 'p'],
    },
  },
} as Meta<TextProps>

export const BaseText: StoryObj<TextProps> = {
  args: {
    children: 'As "<span>" base (medium) text',
  },
}

export const SmallText: StoryObj<TextProps> = {
  args: {
    children: 'As "<span>" small text',
    size: 'sm',
  },
}

export const LargeText: StoryObj<TextProps> = {
  args: {
    children: 'As "<span>" large text',
    size: 'lg',
  },
}

export const ExtraLargeText: StoryObj<TextProps> = {
  args: {
    children: 'As "<span>" extra large text',
    size: 'xl',
  },
}

export const CustomStrongTag: StoryObj<TextProps> = {
  args: {
    children: 'As "<strong>" text',
    as: 'strong',
  },
}

export const CustomEmTag: StoryObj<TextProps> = {
  args: {
    children: 'As "<em>" text',
    as: 'em',
  },
}
