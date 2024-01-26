'use client';
import React, { CSSProperties } from 'react';
import { styled } from '@mui/material/styles';
import { FullscreenImage as Background, Logo, TextFieldWithLabel as TextField } from '@/lib/ui/components';
import { Typography, Paper, TypographyProps, InputAdornment } from '@mui/material';
import color from '@/lib/ui/color';

const HeaderStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '.5rem',
};

const SupportTextStyle: CSSProperties = {
  color: color.neutral[200],
};

const StyledPaper = styled(Paper)({
  position: 'absolute',
  width: '500px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  '& > *': {
    width: '100%',
  },
});

type Props = {
  children?: React.ReactNode;
  typographyProps?: TypographyProps;
};

const CardHeader = ({ children, typographyProps }: Props) => {
  return (
    <div style={HeaderStyle}>
      <Logo size='large' />
      <Typography
        {...typographyProps}
        variant='h5'
        sx={{
          fontWeight: '700',
          color: 'primary.darker',
          textAlign: 'center',
        }}>
        {children}
      </Typography>
    </div>
  );
};

export default function SignIn() {
  return (
    <>
      <Background src='/thumbnail.jpg' alt='Picture of Design ITUS' />
      <StyledPaper elevation={0}>
        <CardHeader>Đăng ký</CardHeader>
      </StyledPaper>
    </>
  );
}
