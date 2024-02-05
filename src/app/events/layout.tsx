'use client';

export default function EventLayout({
  modal,
  children, // will be a page or nested layout
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
