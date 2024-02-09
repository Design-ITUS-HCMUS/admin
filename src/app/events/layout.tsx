'use client';

import Navbar from '@/libs/ui/components/Navbar';

export default function EventLayout({
  modal,
  children, // will be a page or nested layout
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {modal}
      {children}
    </>
  );
}
