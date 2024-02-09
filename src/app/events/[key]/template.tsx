'use client';
import * as React from 'react';
import { useParams,usePathname, useRouter } from 'next/navigation';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import PeopleAltRounded from '@mui/icons-material/PeopleAltRounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';
import SubmissionsRounded from '@mui/icons-material/WysiwygRounded';

import { ISideBarItem,SideBar } from '@/libs/ui';
const Section = styled('section')(({ theme }) => ({
  padding: theme.spacing(3, 3, 3),
  minHeight: 'calc(100vh - 64px - 48px)',
  marginTop: '64px',
  marginLeft: '240px',
}));

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  minHeight: 'inherit',
});

const StyledSideBar = styled(SideBar)({
  top: 64,
  left: 0,
});

const SideBarItems: ISideBarItem[] = [
  {
    key: 'settings',
    label: 'Thông tin',
    icon: <SettingsRounded />,
  },
  {
    key: 'accounts',
    label: 'Tài khoản',
    icon: <PeopleAltRounded />,
  },
  {
    key: 'submissions',
    label: 'Bài nộp',
    icon: <SubmissionsRounded />,
  },
];

export default function EventDetailsTemplate({ children }: { children: React.ReactNode }) {
  const [active, setActive] = React.useState('');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const baseSegment = `/events/${params.key}`;

  React.useEffect(() => {
    const pathSegments = pathname.split('/');
    const baseSegments = baseSegment.split('/');
    if (baseSegment.split('/').length !== pathSegments.length) setActive(pathSegments[baseSegments.length]);
  }, [pathname, baseSegment]);

  const handleClick = (key: string) => {
    if (key === active) return;
    router.push(`${baseSegment}/${key}`);
    setActive(key);
  };

  return (
    <main>
      <StyledSideBar
        header={
          <Typography
            variant='subtitle1'
            textTransform='uppercase'
            fontWeight='bold'
            sx={{
              color: 'primary.darker',
            }}>
            {params.key}
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
