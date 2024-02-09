import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Uploader } from './Uploader';

const meta: Meta<typeof Uploader> = {
  title: 'Global/Input/Uploader',
  component: Uploader,
  parameters: {
    layout: 'centered',
  },
  tags: [ 'autodocs' ],
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
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'white', padding: '2rem', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Resting: StoryObj = {
  name: 'Uploader Resting',
  args: {
    buttonProps: {
      state: 'resting',
    },
  },
};

export const Error: StoryObj = {
  name: 'Uploader Error',
  args: {
    buttonProps: {
      state: 'error',
    },
    helperText: 'Invalid files!',
  },
};

export const WithInputProps: StoryObj = {
  name: 'Uploader with inputProps',
  args: {
    inputProps: {
      multiple: true,
      required: true,
    },
    placeholder: 'Accept multiple files', 
  },
};


