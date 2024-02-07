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
    buttonProps: {
      state: 'resting',
      onUpload: (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onUpload', event.target.files);
      },
    },
  },
  argTypes: {
    buttonProps: {
      description: (
        `<div>
          Extends from <code>ButtonProps</code> of MUI with additional props:
          <li>
            <code>state</code>: Custom state of uploader <code>resing | error</code>
          </li>
          <li>
            <code>onUpload</code>: Custom event handler, executed when a file is uploaded
          </li>
        </div>`
      ),
    },
    inputProps: {
      description: (
        `<div>
          Uploader has a hidden input element to handle file upload. This prop \
          controls that input, you can custom the input element's performance, such as \
          <code>multiple</code>, <code>required</code>, etc.
        </div>`
      ),
    }
  },
  render: (args: any) => <Uploader {...args} />,
};
