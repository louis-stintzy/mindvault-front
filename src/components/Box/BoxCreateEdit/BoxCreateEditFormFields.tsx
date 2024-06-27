import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useCallback } from 'react';
import LanguageSelector from '../../TextFieldWithSTT/LanguageSelector';
import VoiceSelector from '../../TextFieldWithSTT/VoiceSelector';
import { BoxDataLight } from '../../../@types/box';
import { useAppDispatch } from '../../../hook/redux';
import { changeBoxField } from '../../../store/reducers/boxOne';
import ImageInput from '../../ImageUpload/ImageInput';
import boxDefaultPicture from '../../../assets/boxDefaultPicture2.png';

interface BoxCreateEditFormFieldsProps {
  box: BoxDataLight;
  selectedQuestionVoice: string;
  setSelectedQuestionVoice: (voiceName: string) => void;
  selectedAnswerVoice: string;
  setSelectedAnswerVoice: (voiceName: string) => void;
  setImageFile: (file: File | null) => void;
}

function BoxCreateEditFormFields({
  box,
  selectedQuestionVoice,
  setSelectedQuestionVoice,
  selectedAnswerVoice,
  setSelectedAnswerVoice,
  setImageFile,
}: BoxCreateEditFormFieldsProps) {
  const dispatch = useAppDispatch();
  const handleChangeField = useCallback(
    (
        field:
          | 'name'
          | 'description'
          | 'label'
          | 'defaultQuestionLanguage'
          | 'defaultQuestionVoice'
          | 'defaultAnswerLanguage'
          | 'defaultAnswerVoice'
      ) =>
      (value: string) => {
        // TODO: checker que les values respectent les contraintes comme name<255 caractères
        dispatch(changeBoxField({ field, value }));
      },
    [dispatch]
  );

  const handleChangeCheckbox = (field: 'learnIt') => (value: boolean) => {
    dispatch(changeBoxField({ field, value }));
  };

  return (
    <>
      <TextField
        required
        id="name"
        label="Name of the Box"
        variant="outlined"
        fullWidth
        margin="normal"
        value={box.name}
        onChange={(e) => handleChangeField('name')(e.target.value)}
      />
      <TextField
        id="label"
        label="Label of the Box"
        variant="outlined"
        fullWidth
        margin="normal"
        value={box.label}
        onChange={(e) => handleChangeField('label')(e.target.value)}
      />
      <TextField
        id="description"
        label="Description of the Box"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        margin="normal"
        value={box.description}
        onChange={(e) => handleChangeField('description')(e.target.value)}
      />

      {/* // ---------------------- LANGUAGE DEFAULT SELECTION ---------------------- */}
      {/* //todo: voir pourquoi -parfois- la voix par default pour les questions n'est pas renseignée alors qu'elle l'est bien pour les réponse
      si pas de modif de l'utilisateur : la voix pour les reponse est bien enregistrée mais pas pour les question
      rappel dans les voix sont rajoutée dans le submit et ne passe pas dans le store */}
      <LanguageSelector
        field2="defaultQuestionLanguage"
        instructions="Please select the default language for questions"
        selectedLang={box.defaultQuestionLanguage}
        onLanguageChange2={(field, lang) => handleChangeField(field)(lang)}
      />
      <VoiceSelector
        instructions="Please select the default voice for questions"
        lang={box.defaultQuestionLanguage}
        selectedVoiceName={selectedQuestionVoice}
        setSelectedVoiceName={setSelectedQuestionVoice}
      />
      <LanguageSelector
        field2="defaultAnswerLanguage"
        instructions="Please select the default language for questions"
        selectedLang={box.defaultAnswerLanguage}
        onLanguageChange2={(field, lang) => handleChangeField(field)(lang)}
      />
      <VoiceSelector
        instructions="Please select the default voice for answers"
        lang={box.defaultAnswerLanguage}
        selectedVoiceName={selectedAnswerVoice}
        setSelectedVoiceName={setSelectedAnswerVoice}
      />
      {/* // -------------------------- UPLOAD ILLUSTRATION --------------------------- */}
      <ImageInput
        setImageFile={setImageFile}
        aspectRatio={3 / 4}
        picture={box.picture?.pictureUrl || boxDefaultPicture}
      />

      {/* // ------------------------------ OPTIONS BUTTONS ------------------------------------ */}
      <Box sx={{ my: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={box.learnIt}
              onChange={() => handleChangeCheckbox('learnIt')(!box.learnIt)}
              name="learnIt"
            />
          }
          label="Learn It"
        />
        <FormControlLabel control={<Checkbox disabled />} label="Box of Box" />
      </Box>
    </>
  );
}

export default BoxCreateEditFormFields;
