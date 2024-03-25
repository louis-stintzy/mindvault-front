import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import AreaChart from './AreaChart';
import { CardsByCompartmentPerWeek } from '../../@types/stats';
import { getHistoricalStats } from '../../store/reducers/stats';

function BoxHistoricalStats({ boxId }: { boxId: number }) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.stats);
  const boxStats = useAppSelector((state) => state.stats.historicalStats);

  useEffect(() => {
    let counter = 0;
    counter += 1;
    console.log('counter', counter);
    dispatch(getHistoricalStats(boxId));
  }, [dispatch, boxId]);

  const weekLabels = boxStats.map(
    (week) => `${week.statsDate.weekNumber} - ${week.statsDate.year}`
  ) as string[];

  const totalCardsEndOfWeek = boxStats.map(
    (week) => week.totalCards
  ) as number[];

  const cardsByCompartmentEndOfWeek = {
    compartment1: boxStats.map((week) => week.cardsByCompartment.compartment1),
    compartment2: boxStats.map((week) => week.cardsByCompartment.compartment2),
    compartment3: boxStats.map((week) => week.cardsByCompartment.compartment3),
    compartment4: boxStats.map((week) => week.cardsByCompartment.compartment4),
    compartment5: boxStats.map((week) => week.cardsByCompartment.compartment5),
    compartment6: boxStats.map((week) => week.cardsByCompartment.compartment6),
    compartment7: boxStats.map((week) => week.cardsByCompartment.compartment7),
    compartment8: boxStats.map((week) => week.cardsByCompartment.compartment8),
  } as CardsByCompartmentPerWeek;

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
    <Box>
      <Box sx={{ height: '500px', width: '100%' }}>
        <AreaChart
          weekLabels={weekLabels}
          totalCardsEndOfWeek={totalCardsEndOfWeek}
          cardsByCompartmentEndOfWeek={cardsByCompartmentEndOfWeek}
        />
      </Box>
    </Box>
  );
}

export default BoxHistoricalStats;
