'use client';

// React and Next
import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Material UI Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import AttachMoneyIcon from '@mui/icons-material/AttachMoneyRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import ExpandLessIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';
import MenuIcon from '@mui/icons-material/MenuRounded';
// Material UI Icons
import PersonIcon from '@mui/icons-material/PersonRounded';

import { colors } from '..';
import { Avatar } from './Avatar';
// Local Imports
import { Logo } from './Logo';

interface IMenuItem {
  icon?: React.ReactNode;
  name: string;
  link: string;
  disabled?: boolean;
}
interface INavbarPill {
  name: string;
  link?: string;
  disabled?: boolean;
  menuItems?: IMenuItem[];
}
interface NavbarPillProps extends INavbarPill {
  active?: boolean;
}
interface StyledNavbarPillProps extends ButtonProps {
  active?: boolean;
}

const StyledNavbarPill = styled(Button, { shouldForwardProp: (prop) => prop !== 'active' })<StyledNavbarPillProps>(
  ({ active, theme }) => ({
    color: active ? theme.palette.primary.main : colors.neutral[400],
    backgroundColor: 'transparent',
    padding: '4px 6px',
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      color: active ? theme.palette.primary.main : colors.blue[900],
      backgroundColor: active ? colors.blue[50] : colors.neutral[50],
    },
    '& .MuiButton-endIcon': {
      marginLeft: 0,
    },
  })
);

const FocusedNavbarPillStyle = {
  color: 'primary.main',
  backgroundColor: colors.blue[50],
};

function NavbarPill({ name, link, menuItems, active, disabled }: NavbarPillProps): React.JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.currentTarget.focus();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const BoxStyle = {
    display: 'flex',
    height: '64px',
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottom: active ? '4px solid ' + colors.blue[500] : 'none',
    mr: 3,
  };

  return (
    <Box sx={BoxStyle}>
      <StyledNavbarPill
        LinkComponent={Link}
        href={!Boolean(menuItems) ? link : undefined}
        onClick={Boolean(menuItems) ? handleOpen : () => {}}
        endIcon={Boolean(menuItems) && <ExpandMoreIcon />}
        sx={open ? FocusedNavbarPillStyle : undefined}
        active={active}
        disabled={disabled}>
        <Typography variant='subtitle1' fontWeight={600}>
          {name}
        </Typography>
      </StyledNavbarPill>
      {Boolean(menuItems) && menuItems !== undefined ? (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} disableScrollLock>
          {menuItems.map((menuItem, i, arr) => {
            if (i < arr.length - 1)
              return (
                <MenuItem key={menuItem.name} component={Link} href={menuItem.link}>
                  {menuItem.name}
                </MenuItem>
              );
          })}
          <Divider />
          <MenuItem
            key={menuItems[menuItems.length - 1].name}
            component={Link}
            href={menuItems[menuItems.length - 1].link}>
            {menuItems[menuItems.length - 1].name}
          </MenuItem>
        </Menu>
      ) : null}
    </Box>
  );
}

const StyledDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: theme.spacing(2),
  marginRight: theme.spacing(7),
  [theme.breakpoints.down('md')]: {
    columnGap: theme.spacing(1),
    flexGrow: 1,
    marginRight: 0,
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

function UserSettings(): React.JSX.Element {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  // later, this will be replaced by the user's name get by redux here
  const username = 'Ngân Trúc';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    !isMobile && setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok) {
        router.replace(res.url);
      }
    });
  };
  // The menu items never change through time, so we can use the same array for the whole component
  // and avoid the ? operation
  const settingItems = [
    { name: 'Thông tin', link: '/profile', icon: <PersonIcon /> },
    { name: 'Lịch sử thanh toán', link: '/history', icon: <AttachMoneyIcon /> },
  ];

  return (
    <div>
      <ListItemButton
        onClick={handleOpenUserMenu}
        component={isMobile ? Link : Button}
        sx={{ background: 'none !important', padding: 0, height: 'fit-content' }}
        href={isMobile ? '/profile' : undefined}>
        <Avatar key='avatar' name={username} />
        <ListItemIcon sx={{ minWidth: 0 }}>{isMobile ? <ChevronRightIcon /> : <ExpandMoreIcon />}</ListItemIcon>
      </ListItemButton>
      {!Boolean(isMobile) && (
        <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} disableScrollLock onClose={handleCloseUserMenu}>
          {settingItems.map((item, index) => (
            <MenuItem component={Link} href={item.link} key={index} onClick={handleCloseUserMenu}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </MenuItem>
          ))}
          <Divider />
          <MenuItem key='logout' onClick={handleLogout}>
            <ListItemText sx={{ color: 'error.main' }}>Đăng xuất</ListItemText>
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

export interface NavbarProps {
  /** The URL of the active page. Just use for storybook, in the usual case, the component will check pathname.*/
  activeURL?: string;
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.divider}`,
  padding: theme.spacing(0, 3, 0),
  color: colors.blue[900],
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 2, 0),
  },
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
    <StyledAppBar position='fixed' elevation={0}>
      <Container maxWidth={false} disableGutters>
        <Toolbar disableGutters>
          <Title />
          {/* Responsive -> Visible only on MD and above */}
          {!isMobile ? (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'baseline' }}>
                {pages.map((page, index) => (
                  <NavbarPill
                    {...page}
                    key={index}
                    active={pathname?.includes(page.link || '') || activeURL?.includes(page.link || '')}
                    disabled={page.disabled}
                  />
                ))}
                <Button LinkComponent={Link} href='/events/create'>
                  Tạo sự kiện
                </Button>
              </Box>
              <UserSettings />
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
                    <UserSettings />
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
                              {page.menuItems?.map((menuItem, index, arr) => {
                                if (index < arr.length - 1)
                                  return (
                                    <ListItemButton
                                      key={index}
                                      component={Link}
                                      href={menuItem.link}
                                      onClick={toggleDrawer}
                                      sx={{ pl: 4, pr: 4 }}
                                      disabled={menuItem.disabled}>
                                      <ListItemText>{menuItem.name}</ListItemText>
                                    </ListItemButton>
                                  );
                              })}
                              <Divider variant='middle' />
                              {Boolean(page.menuItems) && (
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
                    <Button component={Link} href='/events/create' sx={{ margin: 2 }}>
                      Tạo sự kiện
                    </Button>
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
