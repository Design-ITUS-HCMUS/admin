'use client';
import React from 'react';
import Image, { ImageProps } from 'next/image';

import { styled } from '@mui/material/styles';

const BGImage = styled(Image)({
  position: 'absolute',
  objectFit: 'cover',
  width: '100vw',
  height: '100vh',
});

const BlackLayer = styled('div', { shouldForwardProp: (prop) => prop !== 'opacity' })<{ opacity: number }>(
  ({ opacity }) => ({
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    backgroundColor: `rgba(0,0,0,${opacity})`,
  })
);

interface FullscreenImageProps {
  /**How transparent the black layer should be. A number between 0 and 1.*/
  opacity?: number;
  /**The source of the image.*/
  src: string;
  /**The alt text of the image.*/
  alt: string;
  /**Props for the Image Component from next.*/
  imageProps?: ImageProps;
}

export function FullscreenImage({ opacity = 0.5, src, alt, imageProps }: FullscreenImageProps) {
  opacity = Math.max(0, Math.min(1, opacity));
  return (
    <>
      <BGImage src={src} loading='lazy' width='0' height='0' sizes='100vw' alt={alt} {...imageProps} />
      <BlackLayer opacity={opacity} />
    </>
  );
}
