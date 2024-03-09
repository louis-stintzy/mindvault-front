import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

function BottomNavigationMUI() {
  return (
    <BottomNavigation
      showLabels
      sx={{
        width: '100vw',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // ensure it's above other items
      }}
    >
      {/* il y a un handle change et une value */}
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
        component={Link}
        to="/home"
      />
      <BottomNavigationAction
        label="Multibox Test"
        value="multibox"
        icon={<SettingsIcon />}
      />
      <BottomNavigationAction
        label="Settings"
        value="settings"
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  );
}

export default BottomNavigationMUI;
