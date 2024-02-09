import Image from 'next/image';

enum LogoSize {
  'small' = 32,
  'medium' = 44,
  'large' = 60,
}

interface LogoProps {
  /**
   * Size of the logo corresponding to the size of the logo in the design system:
   *    <li><code>small</code>: 32px</li>
   *    <li><code>medium</code>: 44px</li>
   *    <li><code>large</code>: 60px</li>
   */
  size: keyof typeof LogoSize;
}

export function Logo({ size = 'medium' }: LogoProps) {
  return (
    <Image
      src='/designituslogo.svg'
      width='0'
      height={LogoSize[size]}
      style={{ width: 'auto' }}
      alt='Design ITUS Logo'
    />
  );
}
