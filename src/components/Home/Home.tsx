import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
  darken,
  lighten,
  useTheme,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

import { resetSigninState } from '../../store/reducers/signin';
import { useAppDispatch } from '../../hook/redux';
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode';
import menuItems from '../../constants/menuConfig';

function Home() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleClick = (name: string) => {
    console.log(name);
  };

  const handleLogout = () => {
    // TODO: +recupérer le token pour le blacklister côté back
    dispatch(resetSigninState());
    // TODO: +reset d'autres choses par la suite
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          padding: { xs: '20px', md: '40px' },
          paddingBottom: { xs: '20px', md: '40px' },
        }}
      >
        {/* ------------------------- Title ------------------------- */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ marginBottom: { xs: '20px', md: '40px' } }}
        >
          Hello John
        </Typography>

        {/* ----------------------- Menu Items ----------------------- */}
        <Box>
          {menuItems.map((item) => (
            <Card
              key={item.i}
              sx={{
                marginBottom: '20px',

                backgroundImage: `linear-gradient(135deg,
                  ${isDarkMode ? item.colorDark : item.colorLight} 0%,
                  ${
                    theme.palette.mode === 'dark'
                      ? lighten(item.colorDark, 0.2)
                      : lighten(item.colorLight, 0.2)
                  } 75%)`,
              }}
            >
              <CardActionArea onClick={() => handleClick(item.name)}>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box>
                    <item.icon />
                  </Box>
                  <Typography variant="h6" color="text.primary">
                    {item.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>

      {/* ----------------------- Logout et Toggle----------------------- */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Button
            type="button"
            onClick={handleLogout}
            variant="contained"
            color="primary"
          >
            LOGOUT
          </Button>
          <ToggleColorMode />
        </Box>
      </Box>

      {/* ----------------------- Bottom Navigation ----------------------- */}
      <BottomNavigation
        showLabels
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000, // ensure it's above other items
        }}
      >
        {/* il y a un handle change et une value */}
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
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
    </Container>
  );
}

export default Home;
