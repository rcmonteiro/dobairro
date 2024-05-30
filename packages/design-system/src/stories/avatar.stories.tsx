import { Meta, StoryObj } from '@storybook/react'

import { Avatar, type AvatarProps } from '..'

export default {
  title: 'UI/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      options: ['icon', 'full'],
      control: 'select',
    },
  },
} as Meta<AvatarProps>

export const PrimaryAvatar: StoryObj<AvatarProps> = {
  args: {
    size: 'icon',
  },
}