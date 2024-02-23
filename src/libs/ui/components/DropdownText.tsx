'use client';
import * as React from 'react';

import Select, { SelectProps } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';

import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';

const StyledSelect = styled(Select)({
  '& .MuiSelect-standard': {
    background: 'none !important',
  },
  '& .MuiSelect-icon': {
    opacity: 0,
  },
  '::before': {
    borderBottom: 'none',
  },
  ':hover:not(.Mui-disabled, .Mui-error):before': {
    borderBottom: 'none',
  },
  ':hover': {
    '& .MuiSelect-icon': {
      opacity: 1,
    },
  },
});

function ExpandMoreIcon(props: SvgIconProps) {
  return <ExpandMoreRounded fontSize='small' {...props} />;
}
ExpandMoreIcon.muiName = 'SvgIcon';

export function DropdownText(props: SelectProps) {
  return (
    <StyledSelect IconComponent={ExpandMoreIcon} variant='standard' displayEmpty {...props}>
      {props.children}
    </StyledSelect>
  );
}
