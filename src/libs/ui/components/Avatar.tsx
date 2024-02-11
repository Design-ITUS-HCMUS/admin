'use client';
import * as React from 'react';

import MUIAvatar, { AvatarProps as MUIAvatarProps } from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

enum AvatarSize {
  'medium' = 32,
  'large' = 60,
}

interface AvatarProps extends MUIAvatarProps {
  /**The name of the user to be displayed in the avatar.*/
  name: string;
  /**The size of the avatar. <br/>
   * <code>medium</code>: 32px. <br/>
   * <code>large</code>: 60px. <br/>
   * Default is <code>medium</code>.
   */
  size?: keyof typeof AvatarSize;
}

export function Avatar(prop: AvatarProps) {
  const { name, size = 'medium' }: AvatarProps = prop;
  const typographyVariant = size === 'medium' ? 'subtitle2' : 'h6';
  const nameArray = name.split(' ');
  const nameLetters = `${nameArray.length > 1 ? nameArray.slice(-2)[0][0] : ''}${nameArray.slice(-1)[0][0]}`;
  const attr: AvatarProps = {
    ...prop,
    sx: { ...prop.sx, width: AvatarSize[size], height: AvatarSize[size], bgcolor: stringToColor(name) },
    children: (
      <Typography variant={typographyVariant} fontWeight='bold'>
        {nameLetters}{' '}
      </Typography>
    ),
  };
  return <MUIAvatar {...attr} />;
}
