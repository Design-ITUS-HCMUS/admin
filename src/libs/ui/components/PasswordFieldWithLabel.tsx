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

export const PasswordFieldWithLabel = ({ label, containerStyle, inputProps }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  
    return (
      <div style={{ ...style, ...containerStyle }}>
        <InputLabel>
          <Typography variant='subtitle2'>{label}</Typography>
        </InputLabel>
        <OutlinedInput
          {...inputProps}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={togglePasswordVisibility} edge='end' style={stylePasswordIcon} disableRipple>
                <ShowIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    );
  };