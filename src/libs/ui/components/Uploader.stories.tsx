import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';
import { Uploader } from './Uploader';

const meta: Meta<typeof Uploader> = {
  component: Uploader,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const Default: Story = {
  name: 'Uploader',
  args: {
    placeholder: 'SVG, PNG, JPG or GIF (1400x700px)',
  },
  render: (args: any) => <Uploader {...args} />,
};
