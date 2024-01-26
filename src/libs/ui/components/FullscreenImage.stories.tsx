import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { FullscreenImage } from './FullscreenImage';

const meta: Meta<typeof FullscreenImage> = {
  component: FullscreenImage,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const Default: Story = {
  name: 'Fullscreen Image',
  args: {
    src: '/thumbnail.jpg',
    alt: 'Picture of Design ITUS',
  },
  render: (args: any) => <FullscreenImage {...args} />,
};
