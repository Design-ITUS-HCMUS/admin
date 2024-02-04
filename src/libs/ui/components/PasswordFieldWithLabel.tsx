// React
import React, { useState } from 'react';

// Material UI Components
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Material UI Icons
import HideIcon from '@mui/icons-material/VisibilityOffRounded';
import ShowIcon from '@mui/icons-material/RemoveRedEyeRounded';

// Internal
import color from '@/libs/ui/color';

const stylePasswordIcon: React.CSSProperties = {
  color: color.neutral[100],
  padding: '12px',
};

interface PasswordFieldProps {
  label: string;
  containerStyle?: React.CSSProperties;
  inputProps?: OutlinedInputProps;
}

export const PasswordFieldWithLabel = ({ label, containerStyle, inputProps }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Stack style={{ ...containerStyle }} spacing={1}>
      <InputLabel>
        <Typography variant='subtitle2'>{label}</Typography>
      </InputLabel>
      <OutlinedInput
        {...inputProps}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton onClick={togglePasswordVisibility} edge='end' style={stylePasswordIcon} disableRipple>
              {showPassword ? <ShowIcon /> : <HideIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </Stack>
  );
};
