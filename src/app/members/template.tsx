'use client';
import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import PeopleAltRounded from '@mui/icons-material/PeopleAltRounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';

import { SideBar, ISideBarItem } from '@/libs/ui';

const Section = styled('section')(({ theme }) => ({
  padding: theme.spacing(3, 3, 3),
  minHeight: 'calc(100vh - 64px - 48px)',
  marginLeft: '240px',
}));

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  minHeight: 'inherit',
});

const SideBarItems: ISideBarItem[] = [
  {
    key: 'accounts',
    label: 'Tài khoản',
    icon: <PeopleAltRounded />,
  },
  {
    key: 'permissions',
    label: 'Quyền truy cập',
    icon: <SettingsRounded />,
  },
];

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = React.useState('');
  const router = useRouter();
  const pathname = usePathname();
  const baseSegment = '/members';

  React.useEffect(() => {
    const pathSegments = pathname.split('/');
    const baseSegments = baseSegment.split('/');
    if (baseSegment.split('/').length !== pathSegments.length) setActive(pathSegments[baseSegments.length]);
  }, [pathname, baseSegment]);

  const handleClick = (key: string) => {
    if (key === active && `${baseSegment}/${key}` === pathname) return;
    router.push(`${baseSegment}/${key}`);
    setActive(key);
  };

  return (
    <main>
      <SideBar
        header={
          <Typography
            variant='subtitle1'
            textTransform='uppercase'
            fontWeight='bold'
            sx={{
              color: 'primary.darker',
            }}>
            Quản lý thành viên
          </Typography>
        }
        active={active}
        SideBarItems={SideBarItems}
        onClickMenuItem={handleClick}
      />
      <Section>
        <StyledPaper variant='section'>{children}</StyledPaper>
      </Section>
    </main>
  );
}
