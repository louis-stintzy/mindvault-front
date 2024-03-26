import { Box } from '@mui/material';
import AreaChart from './AreaChart';
import {
  CardsByCompartmentPerWeek,
  HistoricalStatsData,
} from '../../@types/stats';

interface BoxStats {
  boxStats: HistoricalStatsData;
}

function BoxHistoricalStats({ boxStats }: BoxStats) {
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
