import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';

import CampaignIcon from '@mui/icons-material/Campaign';
import { CardData } from '../../@types/card';

interface CardAnswerSideProps {
  card: CardData;
  isCorrect: boolean;
  speakText: (text: string, lang: string) => void;
  handleNextButton: () => void;
  handlePassInForce: () => void;
}

function CardAnswerSide({
  card,
  isCorrect,
  speakText,
  handleNextButton,
  handlePassInForce,
}: CardAnswerSideProps) {
  return (
    <Card
      elevation={3}
      sx={{
        width: '100%',
        maxWidth: {
          xs: '100%',
        },
        padding: 2,
        margin: 'auto',
      }}
    >
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {isCorrect ? 'Correct !' : 'Wrong...'}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          {card.question ? card.question : 'Card without question...'}
        </Typography>
        <img
          src={
            card.attachment
              ? card.attachment
              : 'https://source.unsplash.com/random'
          }
          alt="media"
          style={{
            width: '100%',
            maxHeight: '200px',
            objectFit: 'cover',
          }}
        />
        <Typography variant="h6" component="h2" gutterBottom>
          {card.answer ? card.answer : 'Card without answer...'}
          {/* // todo : ajouter une lecture "ralentie"/plus lente */}
          <IconButton
            onClick={() => speakText(card.answer, card.answerLanguage)}
            aria-label="speak answer"
          >
            <CampaignIcon />
          </IconButton>
        </Typography>
        <CardActions>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <Button
              variant="contained"
              onClick={handleNextButton}
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </Button>
            {!isCorrect && (
              <Button
                variant="contained"
                onClick={handlePassInForce}
                sx={{ mt: 3, mb: 2 }}
              >
                I was right
              </Button>
            )}
          </Box>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default CardAnswerSide;
