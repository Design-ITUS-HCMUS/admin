'use client';

// React
import React, { CSSProperties, ReactNode } from 'react';

// Material UI Components
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { TypographyProps } from '@mui/material/';

// Libs
import color from '@/libs/ui/color';

export const HeaderStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '.5rem',
};

export const SupportTextStyle: CSSProperties = {
  color: color.neutral[200],
};

export const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '1rem',
  '& > *': {
    width: '100%',
  },
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  maxWidth: '31.25rem',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  '& > *': {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    position: 'fixed',
    height: 'fit-content',
    top: 'auto',
    left: '0',
    right: '0',
    transform: 'none',
    bottom: 0,
    borderRadius: '1rem 1rem 0 0',
    maxWidth: '100vh',
  },
}));

export const StyledForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
});

export interface CardProps {
  children?: React.ReactNode;
  typographyProps?: TypographyProps;
};

export interface FooterProps {
  mainText?: ReactNode;
  linkText?: ReactNode;
  linkHref?: string;
};