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

  // Récupération du thème
  const themeMode = useAppSelector((state) => state.theme.mode);
  // Mise en mémoire du thème
  // Utilisation de useMemo pour recalculer le thème uniquement si le mode du thème change
  const themeMemo = useMemo(() => theme(themeMode), [themeMode]);

  // Vérification du token au montage du composant
  useEffect(() => {
    // Vérification de la présence du token dans le local storage
    const token = localStorage.getItem('user')?.includes('token');
    // Si le token est présent, vérification de sa validité
    if (token) {
      // validateToken permet de mettre à jour isLoggedIn dans le store
      dispatch(validateToken());
    }
  }, [dispatch]);

  return (
    // Application du thème à l'ensemble de l'application
    <ThemeProvider theme={themeMemo}>
      <CssBaseline />
      {isLoading ? (
        // Affichage d'un loader pendant la validation du token
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
      ) : (
        // Une fois terminé, affichage du routeur de l'application
        <RouterProvider router={router} />
      )}
    </ThemeProvider>
  );
}

export default RootComponent;
