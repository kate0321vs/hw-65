import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Box sx={{mb: 5}}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color='inherit'
            component={NavLink}
            to='/'
            sx={{ flexGrow: 1, textDecoration: 'none' }}
          >
            Quotes Central
          </Typography>
          <Button color='inherit' component={NavLink} to='/pages/home'>Home</Button>
          <Button color='inherit' component={NavLink} to='/pages/about'>About</Button>
          <Button color='inherit' component={NavLink} to='/pages/contacts'>Contacts</Button>
          <Button color='inherit' component={NavLink} to='/pages/services'>Services</Button>
          <Button color='inherit' component={NavLink} to='/pages/admin'>Admin</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;