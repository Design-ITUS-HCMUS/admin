'use client';
import React, { CSSProperties, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Logo } from '@/libs/ui/components';
import { Typography, Paper, TypographyProps, Link } from '@mui/material';
import color from '@/libs/ui/color';
import { constants } from './index';
import { useRouter } from 'next/navigation';

const HeaderStyle: CSSProperties = {
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
  maxWidth: constants.PAPER_MAX_WIDTH,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  '& > *': {
    width: '100%',
  },
  [`@media (max-width: ${constants.PAPER_MAX_WIDTH})`]: {
    position: 'fixed',
    height: 'fit-content',
    top: 'auto',
    left: '0',
    right: '0',
    transform: 'none',
    bottom: 0,
    borderRadius: '1rem 1rem 0 0',
  },
}));

export const StyledForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
});

export type CardProps = {
  children?: React.ReactNode;
  typographyProps?: TypographyProps;
};

export type FooterProps = {
  mainText?: ReactNode;
  linkText?: ReactNode;
  linkHref?: string;
};

export const CardHeader = ({ children, typographyProps }: CardProps) => {
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

export const CardContents = ({ children, typographyProps }: CardProps) => {
  return (
    <div>
      <Typography
        {...typographyProps}
        variant='body1'
        sx={{
          fontWeight: '400',
          color: color.neutral[400],
          letterSpacing: '0.15px',
        }}>
        {children}
      </Typography>
    </div>
  );
};

export const CardFooter = ({ mainText, linkText, linkHref }: FooterProps) => {
  const router = useRouter();

  const handleLinkClick = (pathname: string) => {
    router.replace(pathname);
  };
  
  return (
    <Row style={{ alignItems: 'baseline', gap: 8 }}>
      <Typography
        variant='body2'
        style={{
          textAlign: 'right',
          ...SupportTextStyle,
          display: 'inline-block',
          width: 'fit-content',
          fontWeight: '600',
        }}>
        {mainText}
      </Typography>
      <Link href={linkHref} style={{ display: 'inline-block', width: 'fit-content' }}>
        <div
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick(`${linkHref}`);
          }}>
          <Typography variant='linkPrimary'>{linkText}</Typography>
        </div>
      </Link>
    </Row>
  );
};
