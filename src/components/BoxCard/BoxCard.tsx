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
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import FlashOnIcon from '@mui/icons-material/FlashOn';

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
          flexDirection: 'row',
        }}
      >
        {/* --------------- Illustration ---------------- */}
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={box.box_picture}
          alt={`Image for the box : ${box.name}`}
        />
        {/* -------------- Reste de la card -------------- */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Name, Label, Level, Description */}
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: 'left' }}
            >
              {box.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'left',
                // pl: 1,
                pb: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                <LabelImportantIcon />
                {box.label}
                <FlashOnIcon />
                {box.level}
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ textAlign: 'left' }}
            >
              {box.description}
            </Typography>
          </CardContent>
          {/* Learn it, Stats, Edit, Play */}
          <CardActions
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox checked={box.learn_it} onChange={handleLearnIt} />
              <Typography variant="body2" display="block">
                Learn it
              </Typography>
            </Box>
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
        </Box>
      </Box>
    </Card>
  );
}

export default BoxCard;
