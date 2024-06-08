import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LanguageSelector from '../../TextFieldWithSTT/LanguageSelector';
import VoiceSelector from '../../TextFieldWithSTT/VoiceSelector';
import { BoxDataLight } from '../../../@types/box';

interface BoxCreateEditFormFieldsProps {
  box: BoxDataLight;
  handleChangeField: (
    field:
      | 'name'
      | 'description'
      | 'label'
      | 'defaultQuestionLanguage'
      | 'defaultQuestionVoice'
      | 'defaultAnswerLanguage'
      | 'defaultAnswerVoice'
  ) => (value: string) => void;
  handleChangeCheckbox: (field: 'learnIt') => (value: boolean) => void;
  selectedQuestionVoice: string;
  setSelectedQuestionVoice: (voiceName: string) => void;
  selectedAnswerVoice: string;
  setSelectedAnswerVoice: (voiceName: string) => void;
}

function BoxCreateEditFormFields({
  box,
  handleChangeField,
  handleChangeCheckbox,
  selectedQuestionVoice,
  setSelectedQuestionVoice,
  selectedAnswerVoice,
  setSelectedAnswerVoice,
}: BoxCreateEditFormFieldsProps) {
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
      <Box sx={{ my: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Upload Illustration
          <input type="file" hidden />
          {/* <VisuallyHiddenInput type="file" /> */}
        </Button>
      </Box>
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
