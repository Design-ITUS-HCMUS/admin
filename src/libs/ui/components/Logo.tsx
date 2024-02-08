import Image from 'next/image';

enum LogoSize {
  'small' = 32,
  'medium' = 44,
  'large' = 60,
}

interface LogoProps {
  size: keyof typeof LogoSize;
  imgStyle?: React.CSSProperties;
}

export function Logo({ size = 'medium', imgStyle }: LogoProps) {
  return (
    <Image
      src='/designituslogo.svg'
      width='0'
      height={LogoSize[size]}
      style={{ width: 'auto', ...imgStyle }}
      alt='Design ITUS Logo'
    />
  );
}
