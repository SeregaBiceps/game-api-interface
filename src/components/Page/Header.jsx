import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';	
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from "react-router-dom";

const Header = () => {

  const history = useHistory();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const pages = [
	{ display: 'Main', route: 'main' }, 
	{ display: 'Mining field', route: 'mining_field' }, 
	{ display: 'Resource', route: 'resource' },
	{ display: 'Warehouse', route: 'warehouse' },
  { display: 'Land', route: 'land' },
  { display: 'Balance', route: 'balance' },
  { display: 'Building', route: 'building' },
  { display: 'User', route: 'user' },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const routeTo = (route) => {
	handleCloseNavMenu();
	history.push(route);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ display, route }) => (
                <MenuItem key={route} onClick={() => routeTo(route)}>
                  <Typography variant="nav-link" textAlign="center">{display}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ display, route }) => (
              <Button
                key={route}
                onClick={() => routeTo(route)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {display}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;