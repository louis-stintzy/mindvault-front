import SettingsBrightnessSharpIcon from '@mui/icons-material/SettingsBrightnessSharp';
import SettingsBrightnessRoundedIcon from '@mui/icons-material/SettingsBrightnessRounded';
import { Box, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { toggleTheme } from '../../store/reducers/theme';

function ToggleColorMode() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  const handleToggleColorMode = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    dispatch(toggleTheme(newMode));
  };

  return (
    <Box>
      <IconButton onClick={handleToggleColorMode}>
        {themeMode === 'light' ? (
          <SettingsBrightnessRoundedIcon />
        ) : (
          <SettingsBrightnessSharpIcon />
        )}
      </IconButton>
    </Box>
  );
}

export default ToggleColorMode;
