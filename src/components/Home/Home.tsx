import { NavLink } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode';

function Home() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          // marginTop: 8,
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center',

          my: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          Home
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Button
            component={NavLink}
            to="/signup"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Button
            component={NavLink}
            to="/signin"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Button
            component={NavLink}
            to="/about"
            variant="contained"
            color="primary"
          >
            About
          </Button>
        </Box>
        <ToggleColorMode />
      </Box>
    </Container>
  );
}

export default Home;
