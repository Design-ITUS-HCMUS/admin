import { Stack, Typography, InputLabel, OutlinedInput, OutlinedInputProps, InputLabelProps } from '@mui/material';

type Props = {
  label: string;
  containerStyle?: React.CSSProperties;
  labelProps?: InputLabelProps;
  inputProps?: OutlinedInputProps;
};

export const TextFieldWithLabel = ({ label, containerStyle, labelProps, inputProps }: Props) => {
  return (
    <Stack spacing={1} style={{ ...containerStyle }}>
      <InputLabel {...labelProps}>
        <Typography variant='subtitle2' component='span'>
          {label}
        </Typography>
      </InputLabel>
      <OutlinedInput {...inputProps} />
    </Stack>
  );
};
