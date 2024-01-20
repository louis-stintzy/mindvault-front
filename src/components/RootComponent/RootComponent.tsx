import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { useAppSelector } from '../../hook/redux';
import theme from '../../theme';
import { router } from '../../router';

function RootComponent() {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const themeMemo = useMemo(() => theme(themeMode), [themeMode]);
  return (
    <ThemeProvider theme={themeMemo}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default RootComponent;
