import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Checkbox,
  IconButton,
} from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import BarChartIcon from '@mui/icons-material/BarChart';

import { BoxData } from '../../@types/box';

interface BoxCardProps {
  box: BoxData;
}

// (suite Boxes) ...si dans BoxCard  on utilisait une interface BoxCardProps { box: BoxData; }
// et que l'on passait cette interface à la function BoxCard({ box }: BoxCardProps) {

function BoxCard({ box }: BoxCardProps) {
  const handlePlay = () => {
    console.log('play');
  };

  const handleEdit = () => {
    console.log('edit');
  };

  const handleStats = () => {
    console.log('stats');
  };

  const handleLearnIt = () => {
    console.log('learn it');
  };

  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: 2,
        backgroundColor: box.color || 'default',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography gutterBottom variant="h5" component="div">
            {box.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {box.label}. Level {box.level}
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="text.secondary">
            {box.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', paddingLeft: 1 }}>
          <Checkbox checked={box.learn_it} onChange={handleLearnIt} />
          <Typography variant="body2" display="block" gutterBottom>
            Learn it
          </Typography>
          <Box>
            <IconButton aria-label="stats" onClick={handleStats}>
              <BarChartIcon />
            </IconButton>
            <IconButton aria-label="edit" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="play" onClick={handlePlay}>
              <PlayArrowIcon />
            </IconButton>
          </Box>
        </CardActions>

        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={box.box_picture}
          alt={`Image for the box : ${box.name}`}
        />
      </Box>
    </Card>
  );
}

export default BoxCard;
