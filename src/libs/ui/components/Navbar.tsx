'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Logo } from './Logo';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { colors } from '../';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/Close';

export interface NavBarItem {
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

type NavBarItemProps = NavBarItem & { index: number; active?: boolean };

const NavbarItem = ({ name, link, menuItems, index, active }: NavBarItemProps): React.JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ButtonStyle = {
    color: colors.neutral[400],
    backgroundColor: 'transparent',
    padding: '4px 6px',
    fontSize: '16px',
    '&:hover': {
      color: colors.blue[900],
      backgroundColor: colors.neutral[50],
    },
  };

  const ButtonActiveStyle = {
    color: colors.blue[500],
    backgroundColor: 'transparent',
    padding: '4px 6px',
    fontSize: '16px',
    '&:hover': {
      color: colors.blue[900],
      backgroundColor: colors.blue[50],
    },
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
      <Button
        id={'navbar-item-button-' + index}
        aria-controls={open ? 'navbar-item-menu-' + index : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        LinkComponent={link ? Link : undefined}
        href={link}
        sx={active ? ButtonActiveStyle : ButtonStyle}
        onClick={menuItems && handleOpen}
        endIcon={menuItems && (open ? <ExpandMoreIcon /> : <ExpandLessIcon />)}>
        {name}
      </Button>
      {menuItems && (
        <Menu
          id={'navbar-item-menu-' + index}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock={true}
          slotProps={{ paper: { sx: { padding: '0', borderRadius: '4px' } } }}
          MenuListProps={{
            'aria-labelledby': 'navbar-item-button-' + name,
          }}>
          {menuItems?.map(
            (menuItem, i, arr) =>
              i < arr.length - 1 && (
                <MenuItem key={menuItem.name}>
                  <Link href={menuItem.link}>{menuItem.name}</Link>
                </MenuItem>
              )
          )}
          <Divider />
          {menuItems && (
            <MenuItem key={menuItems[menuItems.length - 1].name}>
              <Link href={menuItems[menuItems.length - 1].link}>{menuItems[menuItems.length - 1].name}</Link>
            </MenuItem>
          )}
        </Menu>
      )}
    </Box>
  );
};

const defaultPages = [
  {
    name: 'Sự kiện',
    // disabled: true,
    menuItems: [
      { name: 'Outr space 8 (OS8)', link: '/events/OS8' },
      { name: 'Workshop Des to Dev (D2D)', link: '/events/D2D', disabled: true },
      { name: 'Tất cả sự kiện', link: '/events', disabled: false },
    ],
  },
  { name: 'Thành viên', link: '/members' },
  { name: 'Bài đăng', link: '/posts', disabled: true },
] as NavBarItem[];

const defaultSettings = {
  name: 'Xin chào, Ngân Trúc',
  menuItems: [
    { name: 'Thông tin', link: '/profile', icon: <PersonIcon /> },
    { name: 'Lịch sử thanh toán', link: '/history', icon: <AttachMoneyIcon /> },
    { name: 'Đăng xuất', link: '/logout' },
  ],
} as NavBarItem;

function ResponsiveAppBar({
  pages,
  settings,
  activeURL,
}: {
  pages?: NavBarItem[];
  settings?: NavBarItem;
  activeURL?: string;
}) {
  if (!pages) pages = defaultPages;
  if (!settings) settings = defaultSettings;
  if (!activeURL) activeURL = '';
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const pathname = usePathname();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

  // Responsive User Menu state manager
  const [anchorElUserRes, setAnchorElUserRes] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenuResponsive = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUserRes(event.currentTarget);
  };
  const handleCloseUserMenuResponsive = () => {
    setAnchorElUserRes(null);
  };

  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{ borderBottom: '1px solid #EBECED)', padding: 0, borderRadius: 0 }}
      color='default'>
      <Container maxWidth={false} disableGutters>
        <Toolbar disableGutters>
          {/* Responsive -> Visible only on MD and above */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 3, mr: 1 }}>
            <Logo size='small' />
          </Box>
          <Typography
            variant='h6'
            noWrap
            component={Link}
            href='/'
            sx={{
              mr: 10,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 600,
              letterSpacing: '0.15px',
              fontSize: '20px',
              lineHeight: '1.5',
            }}>
            Administrator Portal
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {pages.map((page, index) => (
              <NavbarItem
                index={index}
                {...page}
                key={index}
                active={
                  pathname?.includes(page.link || page.menuItems?.[0].link || '') ||
                  activeURL?.includes(page.link || page.menuItems?.[0].link || '')
                }
              />
            ))}
            <Box>
              <Button LinkComponent={Link} href='/createEvent' sx={{ fontSize: '16px' }}>
                Tạo sự kiện
              </Button>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'block' } }}>
            <Button
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenUserMenu}
              endIcon={Boolean(anchorElUser) ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              sx={{
                color: colors.neutral[400],
                backgroundColor: 'transparent',
                '&:hover': { color: colors.blue[900], backgroundColor: colors.blue[50] },
              }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  letterSpacing: '0.15px',
                  lineHeight: '1.75',
                  fontSize: '16px',
                }}>
                {settings.name}
              </Typography>
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              disableScrollLock
              slotProps={{ paper: { sx: { padding: '0', borderRadius: '4px' } } }}
              onClose={handleCloseUserMenu}>
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
          </Box>

          {/* Responsive -> Visible only on XS and SM */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 2, mr: 1 }}>
            <Logo size='small' />
          </Box>
          <Typography
            variant='h6'
            noWrap
            component={Link}
            href='/'
            sx={{
              display: { md: 'none' },
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: '0.15px',
              fontSize: '20px',
              lineHeight: '1.5',
            }}>
            Administration Portal
          </Typography>
          <Box sx={{ display: { md: 'none' } }}>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer
            variant='temporary'
            anchor='right'
            open={openDrawer}
            onClose={toggleDrawer}
            keepMounted
            sx={{ width: '100%' }}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{ sx: { padding: 0, borderRadius: 0, width: '100%' } }}>
            <Box sx={{ overflow: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1 }}>
                <IconButton onClick={toggleDrawer}>
                  <CloseIcon />
                </IconButton>
                <Button
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenUserMenuResponsive}
                  endIcon={Boolean(anchorElUserRes) ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  sx={{
                    color: colors.neutral[400],
                    backgroundColor: 'transparent',
                    '&:hover': { color: colors.blue[900], backgroundColor: colors.blue[50] },
                  }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      letterSpacing: '0.15px',
                      lineHeight: '1.75',
                      fontSize: '16px',
                    }}>
                    {settings.name}
                  </Typography>
                </Button>
                <Menu
                  sx={{ mt: '45px' }}
                  anchorEl={anchorElUserRes}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUserRes)}
                  disableScrollLock
                  slotProps={{ paper: { sx: { padding: '0', borderRadius: '4px' } } }}
                  onClose={handleCloseUserMenuResponsive}>
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
              </Box>
              <Divider />
              <List>
                {pages.map((page, index) =>
                  page.link ? (
                    <ListItemButton
                      key={index}
                      component={Link}
                      href={page.link}
                      onClick={toggleDrawer}
                      selected={pathname?.includes(page.link) || activeURL?.includes(page.link)}
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
                                  selected={pathname?.includes(menuItem.link) || activeURL?.includes(menuItem.link)}
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
                              sx={{ pl: 4, pr: 4 }}
                              disabled={page.menuItems[page.menuItems.length - 1].disabled}
                              selected={
                                pathname?.includes(page.menuItems[page.menuItems.length - 1].link) ||
                                activeURL?.includes(page.menuItems[page.menuItems.length - 1].link)
                              }>
                              <ListItemText>{page.menuItems[page.menuItems.length - 1].name}</ListItemText>
                            </ListItemButton>
                          )}
                        </List>
                      </Collapse>
                    </React.Fragment>
                  )
                )}
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
