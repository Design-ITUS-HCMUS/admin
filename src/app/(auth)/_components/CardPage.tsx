'use client';

// Internal
import { CardFooter, CardHeader } from '.';

interface CardProps {
  header: string;
  children?: React.ReactNode;
  showFooter?: boolean;
  mainText?: string;
  linkText?: string;
  linkHref?: string;
}

export const CardPage = ({ header, children, showFooter, mainText, linkText, linkHref }: CardProps) => {
  return (
    <>
      <CardHeader>
        <div dangerouslySetInnerHTML={{ __html: header }} />
      </CardHeader>
      {children}
      {showFooter && <CardFooter mainText={mainText || ''} linkText={linkText || ''} linkHref={linkHref || ''} />}
    </>
  );
};
