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
import { Link, useNavigate } from 'react-router-dom';

import { BoxData } from '../../@types/box';

import boxDefaultPicture from '../../assets/boxDefaultPicture.png';
import { useAppDispatch } from '../../hook/redux';
import {
  initializeBoxFields,
  setCurrentBox,
  updateBoxLearnItValue,
} from '../../store/reducers/boxOne';
import { getBoxCards, getRandomCards } from '../../store/reducers/cardMultiple';

interface BoxCardProps {
  box: BoxData;
}

const apiUrl = import.meta.env.VITE_API_URL;

// (suite BoxItemsList) ...si dans BoxCard  on utilisait une interface BoxCardProps { box: BoxData; }
// et que l'on passait cette interface à la function BoxCard({ box }: BoxCardProps) {

function BoxItem({ box }: BoxCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePlay = () => {
    // dispatch(getRandomCards(box.id));
    navigate(`/box/${box.id}/play`);
  };

  const handleEdit = () => {
    dispatch(
      initializeBoxFields({
        name: box.name,
        description: box.description,
        boxPicture: box.box_picture,
        color: box.color,
        label: box.label,
        level: box.level,
        defaultQuestionLanguage: box.default_question_language,
        defaultQuestionVoice: box.default_question_voice,
        defaultAnswerLanguage: box.default_answer_language,
        defaultAnswerVoice: box.default_answer_voice,
        learnIt: box.learn_it,
        type: box.type,
      })
    );
    dispatch(setCurrentBox(box));
    navigate(`/box/${box.id}/edit`);
  };

  const handleStats = () => {
    navigate(`/box/${box.id}/stats`, { state: { boxName: box.name } });
  };

  const handleLearnIt = () => {
    dispatch(updateBoxLearnItValue({ boxId: box.id, learnIt: !box.learn_it }));
  };

  const handleBoxNameClick = () => {
    // dispatch(getBoxCards(box.id));
    navigate(`/box/${box.id}/items`, { state: { boxName: box.name } });
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
          image={
            box.box_picture
              ? `${apiUrl}/media/${box.box_picture}`
              : boxDefaultPicture
          }
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
              sx={{ textAlign: 'left', cursor: 'pointer' }}
              onClick={handleBoxNameClick}
            >
              {box.name}
              {/* <Link
                to={`/box/${box.id}/items`}
                state={{ boxName: box.name }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {box.name}
              </Link> */}
              {/* <span
                onClick={handleBoxNameClick}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                {box.name}
              </span> */}
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
            <Typography variant="body2" color="text.secondary">
              Number of cards to review: {box.cards_to_review}
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

export default BoxItem;
