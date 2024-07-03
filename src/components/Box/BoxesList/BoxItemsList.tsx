import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import BottomNavigationMUI from '../../BottomNavigationMUI/BottomNavigationMUI';
import BoxItem from './BoxItem';
import { useAppDispatch, useAppSelector } from '../../../hook/redux';
import { getUserBoxes } from '../../../store/reducers/boxMultiple';
import { resetBoxOneState } from '../../../store/reducers/boxOne';
import { resetStatsState } from '../../../store/reducers/stats';
import { resetUnsplashState } from '../../../store/reducers/unsplash';

function BoxItemsList() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const navigateFromBoxStats = location.state?.navigateFromBoxStats || false;
  const userBoxesList = useAppSelector((state) => state.boxMultiple.boxes);
  const isLoading = useAppSelector((state) => state.boxMultiple.isLoading);

  useEffect(() => {
    // si l'utilisateur revient de BoxStats, on ne recharge pas la liste des boxes
    // rien a changé, sinon on charge bien la liste des box
    if (!navigateFromBoxStats) {
      dispatch(getUserBoxes());
    }
    // a voir si on utilise BoxOne sinon on peu le mettre au dessus avec getUserBoxes
    dispatch(resetBoxOneState());
    dispatch(resetStatsState());
    dispatch(resetUnsplashState());
  }, [dispatch, navigateFromBoxStats]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ pb: 8 }}>
      <Box>
        <Typography variant="h4" component="h1">
          Boxes
        </Typography>
        <Link
          to="/box/create"
          style={{
            textDecoration: 'none',
            position: 'relative',
            right: -150,
            top: -40,
          }}
        >
          <Button variant="contained">
            <AddIcon />
          </Button>
        </Link>
      </Box>
      {userBoxesList.map((box) => (
        // on aurait pu utiliser <BoxCard key={box.id} box={box} /> si... (voir BoxItem.tsx)
        <BoxItem key={box.id} box={box} />
      ))}
      <BottomNavigationMUI />
    </Container>
  );
}

export default BoxItemsList;
