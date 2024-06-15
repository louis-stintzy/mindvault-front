import {
  Box,
  Card,
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
import { useNavigate } from 'react-router-dom';

import { BoxData } from '../../../@types/box';

import boxDefaultPicture from '../../../assets/boxDefaultPicture2.png';
import { useAppDispatch } from '../../../hook/redux';
import {
  initializeBoxFields,
  setCurrentBox,
  updateBoxLearnItValue,
} from '../../../store/reducers/boxOne';

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
        height: 200,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        {/* --------------- Illustration ---------------- */}
        <CardMedia
          component="img"
          sx={{ width: 150, height: 200, objectFit: 'cover' }}
          image={box.box_picture ? box.box_picture : boxDefaultPicture}
          alt={`Image for the box : ${box.name}`}
        />
        {/* -------------- Reste de la card -------------- */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Name, Label, Level, Description */}
          <CardContent
            sx={{
              flex: '1 0 auto',
              padding: '8px',
              '&:last-child': {
                paddingBottom: '8px',
              },
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: 'left', cursor: 'pointer' }}
              onClick={handleBoxNameClick}
            >
              {box.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'left',
                pb: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                // sx={{ fontSize: '0.8rem' }}
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
              sx={{ textAlign: 'left', fontSize: '0.8rem' }}
            >
              {box.description.length > 20
                ? `${box.description.slice(0, 30)}...`
                : box.description}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.8rem' }}
            >
              Number of cards to review: {box.cards_to_review}
            </Typography>
          </CardContent>
          {/* Learn it, Stats, Edit, Play */}
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox checked={box.learn_it} onChange={handleLearnIt} />
              <Typography
                variant="body2"
                display="block"
                sx={{ fontSize: '0.8rem' }}
              >
                Learn it
              </Typography>
            </Box>
            <Box>
              <IconButton aria-label="stats" onClick={handleStats} size="small">
                <BarChartIcon />
              </IconButton>
              <IconButton aria-label="edit" onClick={handleEdit} size="small">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="play" onClick={handlePlay} size="small">
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