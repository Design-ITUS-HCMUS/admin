'use client';

// React and Next
import React from 'react';
import Link from 'next/link';

// Material UI Components
import Typography from '@mui/material/Typography';

// Internal
import { Row, SupportTextStyle } from '.';

interface CardFooterProps {
  mainText?: string;
  linkText?: string;
  linkHref?: string;
}

export const CardFooter = ({ mainText, linkText, linkHref }: CardFooterProps) => {
  return (
    <Row style={{ alignItems: 'baseline', gap: 8 }}>
      <Typography
        sx={{
          ...SupportTextStyle,
          textAlign: 'right',
          display: 'inline-block',
          width: 'fit-content',
          fontWeight: '600',
        }}>
        {mainText}
      </Typography>
      <Typography
        component={Link}
        href={linkHref || ''}
        variant='linkPrimary'
        sx={{ display: 'inline-block', width: 'fit-content' }}>
        {linkText}
      </Typography>
    </Row>
  );
};
