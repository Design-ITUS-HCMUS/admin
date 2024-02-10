import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Global/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    name: 'Ngân Trúc',
  },
};

export default meta;
export const Default: StoryObj = {
  name: 'Avatar',
};
export const Fullname: StoryObj = {
  name: 'Avatar full name',
  args: {
    name: 'Lê Vũ Ngân Trúc',
  },
};
export const OneWord: StoryObj = {
  name: 'Avatar one word',
  args: {
    name: 'Quân',
  },
};
