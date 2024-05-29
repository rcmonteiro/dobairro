import { Meta, StoryObj } from '@storybook/react'

import { Heading, type HeadingProps } from '..'

export default {
  title: 'Typography/Heading',
  component: Heading,
  args: {
    size: 'md',
    as: 'h1',
    children: 'Custom title',
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: 'select',
    },

    as: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
} as Meta<HeadingProps>

export const BaseHeading: StoryObj<HeadingProps> = {
  args: {
    children: 'As "<h2>" base (medium) heading',
  },
}

export const SmallHeading: StoryObj<HeadingProps> = {
  args: {
    children: 'As "<h2>" small heading',
    size: 'sm',
  },
}

export const LargeHeading: StoryObj<HeadingProps> = {
  args: {
    children: 'As "<h2>" large heading',
    size: 'lg',
  },
}

export const ExtraLargeHeading: StoryObj<HeadingProps> = {
  args: {
    children: 'As "<h2>" extra large heading',
    size: 'xl',
  },
}

export const CustomTag: StoryObj<HeadingProps> = {
  args: {
    children: 'As "<h1>" heading',
    as: 'h1',
  },
}