import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hook/redux';

interface BoxCreateEditActionButtonsProps {
  // isLoading: boolean;
  isFormValid: boolean;
  mode: 'create' | 'edit';
  handleDelete: () => void;
  // buttonText: string;
}

function BoxCreateEditActionButtons({
  // isLoading,
  isFormValid,
  mode,
  handleDelete,
}: // buttonText,
BoxCreateEditActionButtonsProps) {
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.boxOne);

  let buttonText;
  if (isLoading) {
    buttonText = 'Loading...';
  } else {
    buttonText = mode === 'create' ? 'Create' : 'Edit';
  }

  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      <Button
        variant="contained"
        type="submit"
        disabled={isLoading || !isFormValid}
        sx={{ mt: 3, mb: 2 }}
        aria-label={buttonText}
      >
        {buttonText}
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        // TODO : pas besoin de recharger les boxes dans la page /boxes puisqu'on annule
        onClick={() => navigate(`/boxes`)}
      >
        Cancel
      </Button>

      {mode === 'edit' && (
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleDelete}
        >
          Delete the box
        </Button>
      )}
    </Box>
  );
}

export default BoxCreateEditActionButtons;
