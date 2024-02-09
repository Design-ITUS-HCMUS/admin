import type { Meta, StoryObj } from '@storybook/react';

import { FullscreenImage } from './FullscreenImage';

const meta: Meta<typeof FullscreenImage> = {
  title: 'Pages/Auth/Fullscreen Image',
  component: FullscreenImage,
  args: {
    src: '/thumbnail.jpg',
    alt: 'Picture of Design ITUS',
  },
  argTypes: {
    opacity: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
  },
};

export default meta;
export const Default: StoryObj = {
  name: 'Fullscreen Image',
};
