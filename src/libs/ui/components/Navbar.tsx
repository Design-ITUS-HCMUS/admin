'use client';

// React and Next
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Material UI Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ButtonProps } from '@mui/material/Button';

// Material UI Icons
import PersonIcon from '@mui/icons-material/PersonRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoneyRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessIcon from '@mui/icons-material/ExpandLessRounded';
import MenuIcon from '@mui/icons-material/MenuRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';

// Local Imports
import { Logo } from './Logo';
import { colors } from '../';

interface INavbarPill {
  name: string;
  link?: string;
  disabled?: boolean;
  menuItems?: {
    icon?: React.ReactNode;
    name: string;
    link: string;
    disabled?: boolean;
  }[];
}

interface NavbarPillProps extends INavbarPill {
  active?: boolean;
}
interface StyledNavbarPillProps extends ButtonProps {
  active?: boolean;
}

const StyledNavbarPill = styled(Button, { shouldForwardProp: (prop) => prop !== 'active' })<StyledNavbarPillProps>(
  ({ active }) => ({
    color: active ? colors.blue[500] : colors.neutral[400],
    backgroundColor: 'transparent',
    padding: '4px 6px',
    fontSize: '16px',
    '&:hover': {
      color: active ? colors.blue[500] : colors.blue[900],
      backgroundColor: active ? colors.blue[50] : colors.neutral[50],
    },
  })
);

const FocusedNavbarPillStyle = {
  color: colors.blue[500],
  backgroundColor: colors.blue[50],
};

function NavbarPill({ name, link, menuItems, active, disabled }: NavbarPillProps): React.JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.currentTarget.focus();
    console.log('focused');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const BoxStyle = {
    display: 'flex',
    height: '64px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: active ? '4px solid ' + colors.blue[500] : 'none',
    borderRadius: '4px',
    mr: 4,
  };

  return (
    <Box sx={BoxStyle}>
      <StyledNavbarPill
        LinkComponent={Link}
        href={!menuItems ? link : undefined}
        onClick={menuItems && handleOpen}
        endIcon={menuItems && <ExpandMoreIcon />}
        sx={open ? FocusedNavbarPillStyle : undefined}
        active={active}
        disabled={disabled}>
        {name}
      </StyledNavbarPill>
      {menuItems && (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} disableScrollLock>
          {menuItems.map(
            (menuItem, i, arr) =>
              i < arr.length - 1 && (
                <MenuItem key={menuItem.name} component={Link} href={menuItem.link}>
                  {menuItem.name}
                </MenuItem>
              )
          )}
          <Divider />
          <MenuItem
            key={menuItems[menuItems.length - 1].name}
            component={Link}
            href={menuItems[menuItems.length - 1].link}>
            {menuItems[menuItems.length - 1].name}
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
}

const StyledDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: theme.spacing(2),
  padding: theme.spacing(0, 3, 0),
  [theme.breakpoints.down('md')]: {
    columnGap: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(0, 2, 0),
  },
}));

function Title(): React.JSX.Element {
  return (
    <StyledDiv>
      <Logo size='small' />
      <Typography noWrap variant='h6' fontWeight={600}>
        Administrator Portal
      </Typography>
    </StyledDiv>
  );
}

function UserSettings(settings: INavbarPill): React.JSX.Element {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    !isMobile && setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <ListItemButton
        onClick={handleOpenUserMenu}
        component={isMobile ? Link : Button}
        href={isMobile ? '/profile' : undefined}>
        <ListItemText primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }} primary={settings.name} />
        <ListItemIcon sx={{ minWidth: 0 }}>{isMobile ? <ChevronRightIcon /> : <ExpandMoreIcon />}</ListItemIcon>
      </ListItemButton>
      {!isMobile && (
        <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} disableScrollLock onClose={handleCloseUserMenu}>
          {settings.menuItems?.map(
            (item, i, arr) =>
              i < arr.length - 1 && (
                <MenuItem key={item.name} onClick={handleCloseUserMenu}>
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText>
                    <Link href={item.link}>{item.name}</Link>
                  </ListItemText>
                </MenuItem>
              )
          )}
          <Divider />
          <MenuItem key={settings.menuItems?.[settings.menuItems?.length - 1].link}>
            <ListItemText sx={{ color: colors.notification['error'] }}>
              <Link href={settings.menuItems?.[settings.menuItems?.length - 1].link || '#'}>
                {settings.menuItems?.[settings.menuItems?.length - 1].name}
              </Link>
            </ListItemText>
          </MenuItem>
        </Menu>
      )}
    </div>
  );
}

const pages: INavbarPill[] = [
  {
    name: 'Sự kiện',
    link: '/events',
    menuItems: [
      { name: 'Outr space 8 (OS8)', link: '/events/OS8' },
      { name: 'Workshop Des to Dev (D2D)', link: '/events/D2D', disabled: true },
      { name: 'Tất cả sự kiện', link: '/events' },
    ],
  },
  { name: 'Thành viên', link: '/members' },
  { name: 'Bài đăng', link: '/posts', disabled: true },
];

const settings: INavbarPill = {
  name: 'Xin chào, Ngân Trúc',
  menuItems: [
    { name: 'Thông tin', link: '/profile', icon: <PersonIcon /> },
    { name: 'Lịch sử thanh toán', link: '/history', icon: <AttachMoneyIcon /> },
    { name: 'Đăng xuất', link: '/logout' },
  ],
};

export interface NavbarProps {
  activeURL?: string;
}

const StyledAppBar = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'sx' && prop !== 'color' })(() => ({
  borderBottom: '1px solid #EBECED)',
  padding: 0,
  borderRadius: 0,
  color: colors.blue[900],
  backgroundColor: colors.neutral.white,
}));

function Navbar({ activeURL = '' }: NavbarProps): React.JSX.Element {
  const pathname = usePathname();

  // Responsive Drawer state manager
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  // Responsive Collapse state manager
  const [openCollapse, setOpenCollapse] = React.useState(false);
  const toggleCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledAppBar
      position='static'
      elevation={0}
      sx={{ borderBottom: '1px solid #EBECED)', padding: 0, borderRadius: 0 }}
      color='default'>
      <Container maxWidth={false} disableGutters>
        <Toolbar disableGutters>
          <Title />
          {/* Responsive -> Visible only on MD and above */}
          {!isMobile ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                {pages.map((page, index) => (
                  <NavbarPill
                    {...page}
                    key={index}
                    active={pathname?.includes(page.link || '') || activeURL?.includes(page.link || '')}
                    disabled={page.disabled}
                  />
                ))}
                <Button LinkComponent={Link} href='/events/create' sx={{ height: 'fit-content' }}>
                  <Typography variant='subtitle1' fontWeight={600}>
                    Tạo sự kiện
                  </Typography>
                </Button>
              </Box>
              <UserSettings {...settings} />
            </>
          ) : (
            /* Responsive -> Visible only on XS and SM */
            <>
              <Box sx={{ display: { md: 'none' } }}>
                <IconButton onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
              </Box>
              <Drawer anchor='right' open={openDrawer} onClose={toggleDrawer} PaperProps={{ sx: { width: '100%' } }}>
                <Box sx={{ overflow: 'auto' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1 }}>
                    <IconButton onClick={toggleDrawer}>
                      <CloseIcon />
                    </IconButton>
                    <UserSettings {...settings} />
                  </Box>
                  <Divider />
                  <List>
                    {pages.map((page, index) =>
                      !page.menuItems ? (
                        <ListItemButton
                          key={index}
                          component={Link}
                          href={page.link || ''}
                          onClick={toggleDrawer}
                          disabled={page.disabled}>
                          <ListItemText
                            primary={page.name}
                            primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }}
                          />
                        </ListItemButton>
                      ) : (
                        <React.Fragment key={index}>
                          <ListItemButton disabled={page.disabled} onClick={toggleCollapse} sx={{ padding: '0 16px' }}>
                            <ListItemText
                              primary={page.name}
                              primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }}
                            />
                            <ListItemIcon>{openCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}</ListItemIcon>
                          </ListItemButton>
                          <Collapse in={openCollapse} timeout='auto' unmountOnExit>
                            <List component='div'>
                              {page.menuItems?.map(
                                (menuItem, index, arr) =>
                                  index < arr.length - 1 && (
                                    <ListItemButton
                                      key={index}
                                      component={Link}
                                      href={menuItem.link}
                                      onClick={toggleDrawer}
                                      sx={{ pl: 4, pr: 4 }}
                                      disabled={menuItem.disabled}>
                                      <ListItemText>{menuItem.name}</ListItemText>
                                    </ListItemButton>
                                  )
                              )}
                              <Divider component='li' variant='middle' />
                              {page.menuItems && (
                                <ListItemButton
                                  key={page.menuItems[page.menuItems.length - 1].name}
                                  component={Link}
                                  href={page.menuItems[page.menuItems.length - 1].link}
                                  onClick={toggleDrawer}
                                  sx={{ px: 4 }}
                                  disabled={page.menuItems[page.menuItems.length - 1].disabled}>
                                  <ListItemText>{page.menuItems[page.menuItems.length - 1].name}</ListItemText>
                                </ListItemButton>
                              )}
                            </List>
                          </Collapse>
                        </React.Fragment>
                      )
                    )}
                    <ListItemButton component={Link} href='/events/create'>
                      <ListItemText
                        primary='Tạo sự kiện'
                        primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }}
                      />
                    </ListItemButton>
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
export default Navbar;
