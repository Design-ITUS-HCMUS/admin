'use client';

// React and Next
import React from 'react';
import Link from 'next/link';

// Material UI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Internal
import { SupportTextStyle } from '.';

interface CardFooterProps {
  /**The main text of the footer.*/
  mainText?: string;
  /**The text of the hyperlink.*/
  linkText?: string;
  /**The href of the hyperlink.*/
  linkHref?: string;
}

export const CardFooter = ({ mainText, linkText, linkHref = '' }: CardFooterProps) => {
  return (
    <Stack alignItems='baseline' direction='row' justifyContent='center' spacing={1}>
      <Typography
        sx={{
          ...SupportTextStyle,
          fontWeight: '600',
        }}>
        {mainText}
      </Typography>
      <Typography component={Link} href={linkHref} variant='linkPrimary'>
        {linkText}
      </Typography>
    </Stack>
  );
};
