'use client';
import * as React from 'react';

import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { colors,DropdownText, InputLayout } from '@/libs/ui';
import { ROLE } from '@/utils';

interface CustomSelectProps {
  ratio?: number;
  defaultValue?: number | string | string[];
  readOnly?: boolean;
}

export function SelectDepartment({ ratio = 0.5, defaultValue = [], readOnly }: CustomSelectProps) {
  const [departments, setDepartments] = React.useState<string[]>(defaultValue as string[]);
  const options = [
    { key: 'content', value: 'Content' },
    { key: 'drawing', value: 'Drawing' },
    { key: 'graphic', value: 'Graphic' },
    { key: 'photography', value: 'Photography' },
    { key: 'video', value: 'Video' },
  ];

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
        .filter((_item, id) => id < 2)
        .map((department) => <Chip key={department} label={<Typography>{department}</Typography>} size='small' />);
      value.length < departments.length &&
        value.push(
          <Typography component='span' key='plus'>
            +{departments.length - value.length}
          </Typography>
        );
      return value;
    }
    return (
      <Typography color={colors.neutral[200]} fontWeight='regular'>
        Chọn một hoặc nhiều ban
      </Typography>
    );
  };

  return (
    <InputLayout name='departments' label='Ban hoạt động' direction='row' ratio={ratio} inputprops={{ required: true }}>
      <DropdownText
        name='departments'
        multiple
        value={departments}
        onChange={handleChange}
        inputProps={{ required: true, readOnly: readOnly }}
        renderValue={renderValue}>
        {options.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </DropdownText>
    </InputLayout>
  );
}

export function SelectRole({ ratio = 0.5, defaultValue = ROLE.MEMBER, readOnly }: CustomSelectProps) {
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
    <InputLayout name='role' label='Vai trò' direction='row' ratio={ratio} inputprops={{ required: true }}>
      <DropdownText
        name='role'
        renderValue={renderValue}
        defaultValue={defaultValue as typeof ROLE}
        inputProps={{ required: true, readOnly: readOnly }}>
        <MenuItem key='role-Admin' value={ROLE.ADMIN}>
          Admin
        </MenuItem>
        <MenuItem key='role-Member' value={ROLE.MEMBER}>
          Member
        </MenuItem>
      </DropdownText>
    </InputLayout>
  );
}

export function SelectPosition({ ratio = 0.5, defaultValue = 'Thành viên', readOnly }: CustomSelectProps) {
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
    <InputLayout name='position' label='Vị trí' direction='row' ratio={ratio} inputprops={{ required: true }}>
      <DropdownText
        renderValue={renderValue}
        name='position'
        defaultValue={defaultValue}
        inputProps={{ required: true, readOnly: readOnly }}>
        {options.map((option, index) => (
          <MenuItem key={`position-${index}`} value={option}>
            {option}
          </MenuItem>
        ))}
      </DropdownText>
    </InputLayout>
  );
}
