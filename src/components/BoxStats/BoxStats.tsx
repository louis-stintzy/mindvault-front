import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { getInstantStats } from '../../store/reducers/stats';
import BoxInstantStats from './BoxInstantStats';

function BoxStats() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { isLoading, boxStats } = useAppSelector((state) => state.stats);

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
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() =>
            navigate(`/boxes`, { state: { navigateFromBoxStats: true } })
          }
        >
          Back to Boxes
        </Button>
        {/* ---------------------- Box Instant Stats  ---------------------- */}
        <BoxInstantStats boxStats={boxStats} />
      </Box>

      {/* --------------------- Bottom Navigation --------------------- */}
      <BottomNavigationMUI />
    </Container>
  );
}

export default BoxStats;
