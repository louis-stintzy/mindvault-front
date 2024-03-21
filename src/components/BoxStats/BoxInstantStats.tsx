import { Box, Typography } from '@mui/material';
import { StatsData } from '../../@types/stats';

interface BoxStats {
  boxStats: StatsData;
}

function BoxInstantStats({ boxStats }: BoxStats) {
  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Total cards: {boxStats.totalCards}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Compartment 1 : {boxStats.cardsByCompartment.compartment1}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Compartment 2 : {boxStats.cardsByCompartment.compartment2}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Compartment 3 : {boxStats.cardsByCompartment.compartment3}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Compartment 4 : {boxStats.cardsByCompartment.compartment4}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Compartment 5 : {boxStats.cardsByCompartment.compartment5}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Compartment 6 : {boxStats.cardsByCompartment.compartment6}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Compartment 7 : {boxStats.cardsByCompartment.compartment7}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Compartment 8 : {boxStats.cardsByCompartment.compartment8}
      </Typography>
    </Box>
  );
}

export default BoxInstantStats;
