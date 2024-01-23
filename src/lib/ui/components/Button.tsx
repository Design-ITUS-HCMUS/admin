import React from 'react';
import { Button as MuiButton, ButtonProps as MyButtonProps } from '@mui/material';

// export MyButtonProps;

export const MyButton = ({ ...rest }: MyButtonProps) => <MuiButton {...rest}></MuiButton>;