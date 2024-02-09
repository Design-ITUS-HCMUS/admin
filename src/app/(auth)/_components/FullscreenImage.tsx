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

const BlackLayer = styled('div')({
  position: 'absolute',
  width: '100vw',
  height: '100vh',
});

interface FullscreenImageProps {
  opacity?: number | 0.5;
  src: string | '/thumbnail.jpg';
  alt: string;
  imageProps?: ImageProps;
  blackLayerStyle?: React.CSSProperties;
}

export function FullscreenImage({ opacity = 0.5, src, alt, imageProps, blackLayerStyle }: FullscreenImageProps) {
  if (opacity > 1) opacity = 1;
  if (opacity < 0) opacity = 0;
  return (
    <>
      <BGImage src={src} loading='lazy' width='0' height='0' sizes='100vw' alt={alt} {...imageProps} />
      <BlackLayer style={{ backgroundColor: `rgba(0,0,0,${opacity})`, ...blackLayerStyle }} />
    </>
  );
}
