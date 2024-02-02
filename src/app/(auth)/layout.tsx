'use client';
import { FullscreenImage as Background } from '@/libs/ui/components';

export default function AuthenLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Background src='/thumbnail.jpg' alt='Picture of Design ITUS' />
      {children}
    </section>
  );
}
