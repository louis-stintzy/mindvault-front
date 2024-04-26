import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Typography,
} from '@mui/material';

import CampaignIcon from '@mui/icons-material/Campaign';
import TextFieldWithSTT from '../TextFieldWithSTT/TextFieldWithSTT';
import { CardData } from '../../@types/card';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { changeAutoRead } from '../../store/reducers/cardMultiple';
import { Language } from '../../@types/lang';

interface CardQuestionSideProps {
  card: CardData;
  answerLanguage: Language;
  userAnswer: string;
  setUserAnswer: (value: string) => void;
  speakText: (text: string, lang: string) => void;
  handleChangeLang: (
    field: 'questionLanguage' | 'answerLanguage'
  ) => (value: Language) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function CardQuestionSide({
  card,
  answerLanguage,
  userAnswer,
  setUserAnswer,
  speakText,
  handleChangeLang,
  handleSubmit,
}: CardQuestionSideProps) {
  const dispatch = useAppDispatch();
  const { autoRead } = useAppSelector((state) => state.cardMultiple);

  const handleChangeAutoRead =
    (field: 'question' | 'answer') => (value: boolean) => {
      dispatch(changeAutoRead({ field, value }));
    };
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
          {card.question ? card.question : 'Card without question...'}
          {/* // todo : ajouter une lecture "ralentie"/plus lente */}
          <IconButton
            onClick={() => speakText(card.question, card.questionLanguage)}
            aria-label="speak question"
          >
            <CampaignIcon />
          </IconButton>
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
            height: 'auto',
            maxHeight: '150px', // todo : utiliser useTheme useMediaQuery (isXs ?)
            objectFit: 'cover',
          }}
        />

        <form onSubmit={handleSubmit}>
          <TextFieldWithSTT // todo : ajouter aria-label en props, du coup : à rajouter dans tous les composants qui utilisent TextFieldWithSTT
            field="answer"
            id="answer"
            name="answer"
            label="Your answer"
            lang={answerLanguage}
            onSelectLang={(field, value) => {
              handleChangeLang(field)(value);
            }}
            multiline
            rows={2}
            value={userAnswer}
            onChangeValue={(field, userAnswerUpdated) => {
              setUserAnswer(userAnswerUpdated);
            }}
          />

          <CardActions>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <Stack spacing={0}>
                {/* // todo : prévoir de gérer l'autoRead dans les options */}

                <FormControlLabel
                  label="Auto-read question"
                  control={
                    <Switch
                      checked={autoRead.question}
                      onChange={(event) =>
                        handleChangeAutoRead('question')(event.target.checked)
                      }
                    />
                  }
                />
                <FormControlLabel
                  label="Auto-read answer"
                  control={
                    <Switch
                      checked={autoRead.answer}
                      onChange={(event) =>
                        handleChangeAutoRead('answer')(event.target.checked)
                      }
                    />
                  }
                />
              </Stack>
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 3, mb: 2, alignSelf: 'center' }}
              >
                Submit
              </Button>
            </Box>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}

export default CardQuestionSide;
