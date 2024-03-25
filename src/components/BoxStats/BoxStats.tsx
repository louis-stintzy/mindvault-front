import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { getInstantStats } from '../../store/reducers/stats';
import BoxInstantStats from './BoxInstantStats';
import BoxHistoricalStats from './BoxHistoricalStats';

function BoxStats() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { isLoading, instantStats } = useAppSelector((state) => state.stats);

  const [showHistoricalStats, setShowHistoricalStats] = useState(false);

  useEffect(() => {
    if (id) {
      const boxId = parseInt(id, 10);
      if (Number.isNaN(boxId)) {
        navigate(`/boxes`);
      }
      dispatch(getInstantStats(boxId));
    } else {
      navigate(`/boxes`);
    }
  }, [dispatch, id, navigate]);

  const boxNameFromBoxItemsList = location.state?.boxName;

  const boxId = id ? parseInt(id, 10) : null;
  if (boxId === null || Number.isNaN(boxId)) {
    navigate(`/boxes`);
    return null;
  }

  // TODO: si on switch entre stat instantanée et historique, pas besoin d'un nouvel appel API, stats déjà présent dans le store, si on revient à la liste des box, BoxItemsList reset le state des stats (déjà fait)

  // ----------------------- IS LOADING -----------------------
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          padding: { xs: '20px', md: '40px' },
          paddingBottom: { xs: '20px', md: '40px' },
        }}
      >
        {/* ---------------------- Title  ---------------------- */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ marginBottom: { xs: '20px', md: '40px' } }}
        >
          Stats for the box : {boxNameFromBoxItemsList || 'Loading...'}
        </Typography>
        {/* ---------------------- Buttons ----------------------------- */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() =>
              navigate(`/boxes`, { state: { navigateFromBoxStats: true } })
            }
          >
            Back to Boxes
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => setShowHistoricalStats(!showHistoricalStats)}
          >
            {showHistoricalStats ? 'Instant Stats' : 'Historical Stats'}
          </Button>
        </Box>
        {/* ---------------------- Chart  ---------------------- */}
        {showHistoricalStats ? (
          <BoxHistoricalStats boxId={boxId} />
        ) : (
          <BoxInstantStats boxStats={instantStats} />
        )}
      </Box>

      {/* --------------------- Bottom Navigation --------------------- */}
      <BottomNavigationMUI />
    </Container>
  );
}

export default BoxStats;
