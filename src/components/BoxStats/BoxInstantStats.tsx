import { Box, Typography } from '@mui/material';
import { InstantStatsData } from '../../@types/stats';
import BarChart from './BarChart';

interface BoxStats {
  boxStats: InstantStatsData;
}

function BoxInstantStats({ boxStats }: BoxStats) {
  return (
    <Box>
      <Box sx={{ height: '500px', width: '100%' }}>
        <BarChart cardsByCompartment={boxStats.cardsByCompartment} />
      </Box>
      <Box>
        <Typography variant="h6" component="h2" gutterBottom>
          Total cards: {boxStats.totalCards}
        </Typography>
      </Box>
    </Box>
  );
}

export default BoxInstantStats;
