import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  SvgIcon,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { resetSigninState } from '../../store/reducers/signin';
import { useAppDispatch } from '../../hook/redux';
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode';

import menuItems from '../../constants/menuConfig';
import BoxIcon from '../../icons/BoxIcon';

function Home() {
  const dispatch = useAppDispatch();

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
          padding: '20px',
          paddingBottom: '56px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Hello John
        </Typography>

        <Box>
          {menuItems.map((item) => (
            <Card
              key={item.i}
              sx={{
                marginBottom: '20px',
                backgroundColor: 'primary.light',
              }}
            >
              <CardActionArea onClick={() => handleClick(item.name)}>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box>
                    <item.icon />
                  </Box>
                  <Typography variant="h6">{item.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>

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
