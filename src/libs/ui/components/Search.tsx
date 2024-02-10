import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';

import SearchOutlined from '@mui/icons-material/SearchOutlined';

interface SearchProps {
  /** When the form is submitted (user press Enter), this callback function will be executed.  */
  onSearch: (_value: string) => void;
  /** When the input field is blurred (user click outside), this callback function will be executed. */
  onBlur: (_value: string) => void;
  /** The search bar is a kind of OutlinedInput from MUI, these props are passed to control it. */
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
        name='search'
        placeholder='Tìm kiếm'
        {...inputProps}
        endAdornment={
          <InputAdornment position='end'>
            <SearchOutlined></SearchOutlined>
          </InputAdornment>
        }
        onBlur={handleBlur}
      />
    </form>
  );
}
