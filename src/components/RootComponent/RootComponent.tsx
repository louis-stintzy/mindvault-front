import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { useEffect, useMemo } from 'react';
import { CircularProgress, CssBaseline } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import theme from '../../theme';
import { router } from '../../router';
import { validateToken } from '../../store/reducers/signin';

function RootComponent() {
  const { isLoading } = useAppSelector((state) => state.signIn);
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const themeMemo = useMemo(() => theme(themeMode), [themeMode]);

  useEffect(() => {
    const token = localStorage.getItem('user')?.includes('token');
    if (token) {
      dispatch(validateToken());
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={themeMemo}>
      <CssBaseline />
      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </div>
      )}
      {!isLoading && <RouterProvider router={router} />}
    </ThemeProvider>
  );
}

export default RootComponent;
