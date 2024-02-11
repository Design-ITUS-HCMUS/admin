import * as React from 'react';

import { createSvgIcon } from '@mui/material/utils';

export const ProgressIcon = createSvgIcon(
  <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <rect width='24' height='24' rx='2' opacity={0.2} fill='currentColor' />
    <path
      d='M6 7.5C6 6.67157 6.67157 6 7.5 6H16.5C17.3284 6 18 6.67157 18 7.5V16.5C18 17.3284 17.3284 18 16.5 18H7.5C6.67157 18 6 17.3284 6 16.5V7.5Z'
      fill='currentColor'
    />
  </svg>,
  'Progress'
);
