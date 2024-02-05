'use client';

// Internal
import { CardHeader } from '.';

interface CardProps {
  header: string;
  children?: React.ReactNode;
}

export const CardPage = ({
  header,
  children,
}: CardProps) => {
  return (
    <>
      <CardHeader>
        <div dangerouslySetInnerHTML={{ __html: header }} />
      </CardHeader>
      {children}
    </>
  );
};
