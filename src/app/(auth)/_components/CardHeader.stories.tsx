import type { Meta, StoryObj } from '@storybook/react';

import { CardHeader } from './CardHeader';

const meta: Meta<typeof CardHeader> = {
  title: 'Pages/Auth/CardHeader',
  component: CardHeader,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Design ITUS',
    typographyProps: {},
  },
};

export default meta;
export const Default: StoryObj = {
  name: 'Card Header',
};