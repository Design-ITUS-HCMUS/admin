'use client';

// Material UI Components
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { TypographyProps } from '@mui/material/';
import { useTheme } from '@mui/material/styles';

interface CardHeaderProps {
  children?: React.ReactNode;
  typographyProps?: TypographyProps;
}

const CardHeaderWrapper = styled(Typography)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '.5rem',
});

export const CardHeader = ({ children, typographyProps }: CardHeaderProps) => {
  const theme = useTheme();

  return (
    <CardHeaderWrapper
      {...typographyProps}
      variant='h5'
      sx={{ fontWeight: '700', textAlign: 'center', color: theme.palette.primary.darker }}>
      {children}
    </CardHeaderWrapper>
  );
};
