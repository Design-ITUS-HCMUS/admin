'use client';
import * as React from 'react';
import { Field, useFormikContext } from 'formik';

import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { colors, DropdownText, InputLayout } from '@/libs/ui';
import { DEPARTMENT, POSITION, ROLE } from '@/utils';

export interface CustomSelectProps {
  /** The ratio of the input to the label. Each of the component use InputLayout as the root component, this prop will be passed directly to InputLayout */
  ratio?: number;
  /** Default value of the input, depend on which component you use, the type can be different.*/
  defaultValue?: number | string | string[];
  /** Determine the select can be modified or not. */
  readOnly?: boolean;
}

export function SelectDepartment({ ratio = 0.5, readOnly }: CustomSelectProps) {
  const options = Object.values(DEPARTMENT);
  const { values } = useFormikContext();

  const renderValue = (departments: string[]) => {
    if (Boolean(departments) && departments.length > 0) {
      const value = departments
        .slice(0, 2)
        .map((department) => (
          <Chip
            key={department}
            label={<Typography textTransform='capitalize'>{department}</Typography>}
            size='small'
          />
        ));
      if (value.length < departments.length) {
        value.push(
          <Typography component='span' key='plus'>
            +{departments.length - value.length}
          </Typography>
        );
      }
      return value;
    }
    return <Typography color={colors.neutral[200]}>Chọn một hoặc nhiều ban</Typography>;
  };

  return (
    <InputLayout label='Ban hoạt động' direction='row' ratio={ratio}>
      <Field
        as={DropdownText}
        name='profile.departments'
        multiple
        inputProps={{ readOnly: readOnly }}
        renderValue={renderValue}
        value={(values as any)?.profile?.departments || []}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Typography textTransform='capitalize'>{option}</Typography>
          </MenuItem>
        ))}
      </Field>
    </InputLayout>
  );
}

export function SelectRole({ ratio = 0.5, readOnly }: CustomSelectProps) {
  const options = [ROLE.ADMIN, ROLE.MEMBER];
  const ROLE_NAME = {
    [ROLE.ADMIN]: 'Admin',
    [ROLE.MEMBER]: 'Member',
  };

  const renderValue = (value: number) => {
    if (value) return <Chip label={<Typography>{ROLE_NAME[value]}</Typography>} size='small' />;
    return <Typography color={colors.neutral[200]}>Chọn một vai trò</Typography>;
  };

  return (
    <InputLayout label='Vai trò' direction='row' ratio={ratio} required={!readOnly}>
      <Field as={DropdownText} name='roleID' renderValue={renderValue} inputProps={{ readOnly: readOnly }}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Typography textTransform='capitalize'>{ROLE_NAME[option]}</Typography>
          </MenuItem>
        ))}
      </Field>
    </InputLayout>
  );
}

export function SelectPosition({ ratio = 0.5, readOnly }: CustomSelectProps) {
  const options = Object.values(POSITION);
  const renderValue = (value: any) => {
    if (value) return <Typography>{value}</Typography>;
    return <Typography color={colors.neutral[200]}>Chọn một vị trí cho thành viên</Typography>;
  };

  return (
    <InputLayout label='Vị trí' direction='row' ratio={ratio} required={!readOnly}>
      <Field as={DropdownText} renderValue={renderValue} name='profile.position' inputProps={{ readOnly: readOnly }}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Typography textTransform='capitalize'>{option}</Typography>
          </MenuItem>
        ))}
      </Field>
    </InputLayout>
  );
}
