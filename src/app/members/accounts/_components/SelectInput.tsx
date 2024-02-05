'use client';
import * as React from 'react';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import { DropdownText, colors } from '@/libs/ui';
import { SelectChangeEvent } from '@mui/material/Select';
import { ROLE } from '@/utils';

export function SelectDepartment() {
  const [departments, setDepartments] = React.useState<string[]>([]);
  const options = ['Content', 'Drawing', 'Graphic', 'Photography', 'Video'];
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const newValue = event.target.value as string[] | string;
    setDepartments(
      // On autofill we get a stringified value.
      typeof newValue === 'string' ? newValue.split(',') : newValue
    );
  };

  const renderValue = () => {
    if (departments.length > 0) {
      const value = departments
        .filter((item, id) => id < 2)
        .map((department) => <Chip key={department} label={<Typography>{department}</Typography>} size='small' />);
      value.length < departments.length &&
        value.push(<Typography component='span'>+{departments.length - value.length}</Typography>);
      return value;
    }
    return (
      <Typography color={colors.neutral[200]} fontWeight='regular'>
        Chọn một hoặc nhiều ban hoạt động
      </Typography>
    );
  };

  return (
    <Stack direction='row'>
      <InputLabel id='department-select-label' sx={{ width: '50%' }} required>
        <Typography variant='subtitle2' component='span'>
          Ban hoạt động
        </Typography>
      </InputLabel>
      <DropdownText
        labelId='department-select-label'
        id='department-select'
        fullWidth
        multiple
        value={departments}
        defaultValue={[]}
        onChange={handleChange}
        renderValue={renderValue}
        sx={{ width: '50%' }}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </DropdownText>
    </Stack>
  );
}

export function SelectRole() {
  const ROLE_NAME: any = {
    [ROLE.ADMIN]: 'Admin',
    [ROLE.MEMBER]: 'Member',
  };

  const renderValue = (value: any) => {
    if (value) return <Chip label={<Typography>{ROLE_NAME[value]}</Typography>} size='small' />;
    return (
      <Typography color={colors.neutral[200]} fontWeight='regular'>
        Chọn một vai trò
      </Typography>
    );
  };

  return (
    <Stack direction='row'>
      <InputLabel id='role-select-label' sx={{ width: '100%' }} required>
        <Typography variant='subtitle2' component='span'>
          Vai trò
        </Typography>
      </InputLabel>
      <DropdownText
        labelId='role-select-label'
        id='role-select'
        renderValue={renderValue}
        defaultValue={ROLE.MEMBER}
        fullWidth
        required>
        <MenuItem key='Admin' value={ROLE.ADMIN}>
          Admin
        </MenuItem>
        <MenuItem key='Member' value={ROLE.MEMBER}>
          Member
        </MenuItem>
      </DropdownText>
    </Stack>
  );
}

export function SelectPosition() {
  const options = ['Thành viên', 'Trưởng ban', 'Thành viên BCN', 'Phó chủ nhiệm', 'Chủ nhiệm'];
  const renderValue = (value: any) => {
    if (value) return <Typography>{value}</Typography>;
    return (
      <Typography color={colors.neutral[200]} fontWeight='regular'>
        Chọn một vị trí cho thành viên
      </Typography>
    );
  };

  return (
    <Stack direction='row'>
      <InputLabel id='position-select-label' sx={{ width: '100%' }} required>
        <Typography variant='subtitle2' component='span'>
          Vị trí
        </Typography>
      </InputLabel>
      <DropdownText
        labelId='position-select-label'
        id='leader-select'
        renderValue={renderValue}
        name='position'
        defaultValue='Thành viên'
        fullWidth
        required>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </DropdownText>
    </Stack>
  );
}
