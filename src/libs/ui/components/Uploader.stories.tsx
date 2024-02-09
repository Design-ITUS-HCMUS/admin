import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Uploader } from './Uploader';

const meta: Meta<typeof Uploader> = {
  title: 'Global/Input/Uploader',
  component: Uploader,
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'SVG, PNG, JPG or GIF (1400x700px)',
    buttonProps: {
      state: 'resting',
      onUpload: (event: React.ChangeEvent<HTMLInputElement>) => {
        /* eslint-disable */
        console.log('onUpload', event.target.files);
      },
    },
  },
  argTypes: {
    buttonProps: {
      description: `<div>
          Extends from <code>ButtonProps</code> of MUI with additional props:
          <li>
            <code>state</code>: Custom state of uploader <code>resing | error</code>
          </li>
          <li>
            <code>onUpload</code>: Custom event handler, executed when a file is uploaded
          </li>
        </div>`,
    },
    inputProps: {
      description: `<div>
          Uploader has a hidden input element to handle file upload. This prop \
          controls that input, you can custom the input element's performance, such as \
          <code>multiple</code>, <code>required</code>, etc.
        </div>`,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'white', padding: '2rem', width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
export const Default: StoryObj = {
  name: 'Uploader',
};
