import { Box, Button, Container, Typography } from '@mui/material';
import { useAppDispatch } from '../../hook/redux';
import { resetSigninState } from '../../store/reducers/signin';

function Home() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // TODO: +recupérer le token pour le blacklister côté back
    dispatch(resetSigninState());
    // TODO: +reset d'autres choses par la suite
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
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
            type="button"
            onClick={handleLogout}
            variant="contained"
            color="primary"
          >
            LOGOUT
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
