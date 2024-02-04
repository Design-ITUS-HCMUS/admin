'use client';

// Material UI Components
import Typography from '@mui/material/Typography';

// Internal
import { CardProps, HeaderStyle } from '.';

export const CardHeader = ({ children, typographyProps }: CardProps) => {
  return (
    <div style={HeaderStyle}>
      <Typography {...typographyProps} variant='h5'>
        {children}
      </Typography>
    </div>
  );
};