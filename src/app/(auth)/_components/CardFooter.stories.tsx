// React
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Internal
import { CardFooter } from './CardFooter';

const meta: Meta<typeof CardFooter> = {
  component: CardFooter,
};

export default meta;
type Story = StoryObj;

// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/api/csf
//  * to learn how to use render functions.
//  */

export const Default: Story = {
  name: 'Card Footer',
  args: {
    mainText: 'Main Text',
    linkText: 'Link Text',
    linkHref: 'https://example.com',
  },
  render: (args: any) => <CardFooter {...args} />,
};
