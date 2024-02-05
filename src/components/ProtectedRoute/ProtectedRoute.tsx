import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { validateToken } from '../../store/reducers/signin';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const dispatch = useAppDispatch();
  const { isLoggedIn, isLoading } = useAppSelector((state) => state.signIn);

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);

  if (isLoading) {
    return (
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
    );
  }

  return isLoggedIn ? children : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;
