import { Box, Button, Container, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hook/redux';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';

function BoxStats() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const boxId = parseInt(id, 10);
      if (Number.isNaN(boxId)) {
        navigate(`/boxes`);
      }
    } else {
      navigate(`/boxes`);
    }
  }, [id, navigate]);

  const boxNameFromBoxItemsList = location.state?.boxName;

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
      </Box>
      {/* --------------------- Bottom Navigation --------------------- */}
      <BottomNavigationMUI />
    </Container>
  );
}

export default BoxStats;
