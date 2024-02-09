// React
import React, { useState } from 'react';

// Material UI Components
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';

import ShowIcon from '@mui/icons-material/RemoveRedEyeRounded';
import HideIcon from '@mui/icons-material/VisibilityOffRounded';

// Internal
import color from '@/libs/ui/color';

export function PasswordInput(props: OutlinedInputProps){
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <OutlinedInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position='end'>
          <IconButton
            onClick={togglePasswordVisibility}
            edge='end'
            sx={{ color: color.neutral[100], padding: '12px' }}
            disableRipple>
            {showPassword ? <ShowIcon /> : <HideIcon />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
};
