import FormHelperText from '@mui/material/FormHelperText';
import { InputBaseComponentProps } from '@mui/material/InputBase';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&.Mui-disabled': {
    color: theme.palette.text.primary,
  },
  '&.Mui-error': {
    color: theme.palette.text.primary,
  },
}));

interface InputLayoutProps extends StackProps {
  /** The HTML attribute <code>name</code> applied to the input. The <code>id</code> and <code>htmlFor</code> of the InputLabel are inherited from this too.*/
  name?: string;
  /** The label of the input.  */
  label?: string;
  /** The ratio of label width to field width. Only available when direction is <code>row</code>. */
  ratio?: number;
  /** As default, the Input Layout use OutlinedInput, when children is passed, that input will be removed, you can use a custom input. */
  children?: React.ReactNode;
  /** The helper text will show when <code>inputprops.error=true</code> */
  helperText?: string;
  /** The props of the default input component. 
   * If you want to use a custom input component, you can pass it as a child of <code>InputLayout</code>.
   * These props will be ignored. */
  inputprops?: InputBaseComponentProps;
}

export function InputLayout(props: InputLayoutProps) {
  const { name, label, ratio = 0, children, helperText, inputprops, direction } = props;

  const outlinedInputProps: OutlinedInputProps = { ...inputprops } as OutlinedInputProps;
  const labelProps: InputLabelProps = { ...inputprops } as InputLabelProps;
  const calRatio = Math.max(0, Math.min(1, ratio));
  let labelWidth = 'inherit';
  let fieldsetWidth = 'inherit';
  if (direction === 'row') {
    labelWidth = calRatio ? `${Math.floor(100.0 * calRatio)}%` : 'inherit';
    fieldsetWidth = 1 - calRatio ? `${Math.floor(100.0 * (1 - calRatio))}%` : 'inherit';
  }

  return (
    <Stack spacing={1} alignItems='baseline' sx={{ width: '100%' }} {...props}>
      {Boolean(label) ? (
        <StyledInputLabel id={`${name}-label`} htmlFor={name} {...labelProps} sx={{ width: labelWidth }}>
          <Typography variant='subtitle2' component='span'>
            {label}
          </Typography>
        </StyledInputLabel>
      ) : null}
      <Stack sx={{ width: fieldsetWidth }}>
        {children ? children : <OutlinedInput inputProps={{ name: name, ...inputprops }} {...outlinedInputProps} />}
        {Boolean(helperText) ? <FormHelperText error={inputprops?.error}>{helperText}</FormHelperText> : null}
      </Stack>
    </Stack>
  );
}
