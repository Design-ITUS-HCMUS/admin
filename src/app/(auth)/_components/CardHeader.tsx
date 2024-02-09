'use client';

import Typography, { TypographyProps } from '@mui/material/Typography';

interface CardHeaderProps {
  /**The content of the component.*/
  children?: React.ReactNode;
  /**This component use Typography of MUI as the root, <code>typographyProps</code> helps pass the customization props.*/
  typographyProps?: TypographyProps;
}

export function CardHeader({ children, typographyProps }: CardHeaderProps) {
  return (
    <Typography {...typographyProps} variant='h5' fontWeight='700' textAlign='center' sx={{ color: 'primary.darker' }}>
      {children}
    </Typography>
  );
}
