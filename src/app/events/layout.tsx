'use client';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Section = styled('section')(({ theme }) => ({
  padding: theme.spacing(3, 3, 3),
  minHeight: 'calc(100vh - 64px)',
}));

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  minHeight: 'inherit',
});

export default function EventLayout({
  modal,
  children, // will be a page or nested layout
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <StyledPaper variant='section'>
        {modal}
        {children}
      </StyledPaper>
    </Section>
  );
}
