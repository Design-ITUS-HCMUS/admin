// React
import { CardFooter } from './CardFooter';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CardFooter> = {
  title: 'Pages/Auth/Card Footer',
  component: CardFooter,
  parameters: {
    layout: 'centered',
  },
  args: {
    mainText: 'Main Text',
    linkText: 'Link Text',
    linkHref: 'https://example.com',
  },
};

export default meta;
export const Default: StoryObj = {
  name: 'Card Footer',
};
