import { OutlinedInput, OutlinedInputProps, InputAdornment } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

interface SearchProps {
  onSearch: (_value: string) => void;
  onBlur: (_value: string) => void;
  inputProps?: OutlinedInputProps;
}

export function Search(props: SearchProps) {
  const { onSearch, onBlur, inputProps } = props;
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    onSearch(target.search.value);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e.target.value);
  };
  return (
    <form onSubmit={handleSearch}>
      <OutlinedInput
        id='search'
        placeholder='Tìm kiếm'
        {...inputProps}
        endAdornment={
          <InputAdornment position='end'>
            <SearchOutlined></SearchOutlined>
          </InputAdornment>
        }
        onBlur={handleBlur}></OutlinedInput>
    </form>
  );
}
