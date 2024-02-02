import React, { useState } from 'react';
import { Typography, InputLabel, OutlinedInput, OutlinedInputProps, IconButton, InputAdornment } from '@mui/material';
import { RemoveRedEyeRounded as ShowIcon } from '@mui/icons-material';
import color from '@/libs/ui/color';

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
};

const stylePasswordIcon: React.CSSProperties = {
  color: color.neutral[100],
  padding: '12px',
};

type Props = {
  label: string;
  containerStyle?: React.CSSProperties;
  inputProps?: OutlinedInputProps;
};

export const TextFieldWithLabel = ({ label, containerStyle, inputProps }: Props) => {
  return (
    <div style={{ ...style, ...containerStyle }}>
      <InputLabel>
        <Typography variant='subtitle2'>{label}</Typography>
      </InputLabel>
      <OutlinedInput {...inputProps} />
    </div>
  );
};
