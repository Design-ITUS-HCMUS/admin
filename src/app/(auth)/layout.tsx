'use client';

// Internal
import { AuthContextProvider } from './_context/store';
import { FullscreenImage as Background, StyledPaper } from '@/app/(auth)/_components';
import { Logo } from '@/libs/ui/components';

export default function AuthenLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Background src='/thumbnail.jpg' alt='Picture of Design ITUS' />
      <StyledPaper variant='section'>
        <Logo size='large' />
        <AuthContextProvider>{children}</AuthContextProvider>
      </StyledPaper>
    </section>
  );
}
