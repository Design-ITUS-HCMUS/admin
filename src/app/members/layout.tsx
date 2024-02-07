'use client';

import Navbar from "@/libs/ui/components/Navbar";

export default function EventLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
