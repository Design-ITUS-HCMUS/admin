'use client';

import Navbar from '@/libs/ui/components/Navbar';

export default function ProfileLayout({
  children, // will be a page or nested layout
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
