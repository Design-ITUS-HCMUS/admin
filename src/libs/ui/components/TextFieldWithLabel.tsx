import { forwardRef } from 'react';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import OutlinedInput, { OutlinedInputProps, InputBaseComponentProps } from '@mui/material/OutlinedInput';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export type TextFieldWithLabelProps = {
  label: string;
  containerStyle?: React.CSSProperties;
  containerProps?: StackProps;
  labelProps?: InputLabelProps;
  inputProps?: OutlinedInputProps;
};

export const TextFieldWithLabel = forwardRef(({ label, containerStyle, containerProps, labelProps, outlinedInputProps }: TextFieldWithLabelProps, ref:React.Ref<HTMLInputElement>) => {
  return (
    <Stack spacing={1} style={{ ...containerStyle }} {...containerProps}>
      <InputLabel {...labelProps}>
        <Typography variant='subtitle2' component='span'>
          {label}
        </Typography>
      </InputLabel>
      <OutlinedInput {...outlinedInputProps} inputRef={ref}/>
    </Stack>
  );
});
