import * as React from 'react';
import { Select, SelectProps, SvgIconProps } from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledSelect = styled(Select)({
  "& .MuiSelect-standard": {
    background: "none !important",
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


export interface DropdownTextProps extends SelectProps {
  variant?: "standard",
  displayEmpty?: true,
}
function DropdownText(props: DropdownTextProps) {
  return (
    <StyledSelect IconComponent={ExpandMoreIcon} variant="standard" displayEmpty {...props}>
      {props.children}
    </StyledSelect>
  );
}

export { DropdownText, ExpandMoreIcon };
