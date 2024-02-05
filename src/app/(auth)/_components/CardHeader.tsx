'use client';

// React
import { CSSProperties } from 'react';

// Material UI Components
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// Internal
import { CardProps } from '.';

const CardHeaderWrapper = styled(Typography)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '.5rem',
});

export const CardHeader = ({ children, typographyProps }: CardProps) => {
  return (
    <CardHeaderWrapper {...typographyProps} variant='h5'>
      {children}
    </CardHeaderWrapper>
  );
};
