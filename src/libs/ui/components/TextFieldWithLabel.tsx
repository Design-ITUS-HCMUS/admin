import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type Props = {
  label: string;
  containerStyle?: React.CSSProperties;
  containerProps?: StackProps;
  labelProps?: InputLabelProps;
  inputProps?: OutlinedInputProps;
};

export const TextFieldWithLabel = ({ label, containerStyle, containerProps, labelProps, inputProps }: Props) => {
  return (
    <Stack spacing={1} style={{ ...containerStyle }} {...containerProps}>
      <InputLabel {...labelProps}>
        <Typography variant='subtitle2' component='span'>
          {label}
        </Typography>
      </InputLabel>
      <OutlinedInput {...inputProps} />
    </Stack>
  );
};
