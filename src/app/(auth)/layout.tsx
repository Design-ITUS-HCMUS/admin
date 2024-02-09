'use client';

// Libs
// Internal
import { StyledPaper } from '@/app/(auth)/_components';
import { FullscreenImage as Background, Logo } from '@/libs/ui/components';

export default function AuthenLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Background src='/thumbnail.jpg' alt='Picture of Design ITUS' />
      <StyledPaper elevation={0} variant='section'>
        <Logo size='large' />
        {children}
      </StyledPaper>
    </section>
  );
}
