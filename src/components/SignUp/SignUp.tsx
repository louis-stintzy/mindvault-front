import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { changeCredentialsField, register } from '../../store/reducers/signup';
import PasswordValidator from '../PasswordValidator/PasswordValidator';
import './SignUp.scss';

function SignUp() {
  const dispatch = useAppDispatch();
  const { isLoading, error, isRegistered } = useAppSelector(
    (state) => state.signUp
  );
  const { username, email, password, confirmPassword } = useAppSelector(
    (state) => state.signUp.credentials
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: add validation
    dispatch(register({ username, email, password, confirmPassword }));
  };

  const handleChange =
    (field: 'username' | 'email' | 'password' | 'confirmPassword') =>
    (value: string) => {
      dispatch(changeCredentialsField({ field, value }));
    };

  return (
    <Container component="main" maxWidth="xs" className="signup-container">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Create an account
        </Typography>

        {/* Affichage des erreurs */}
        {error &&
          error.map((err) => (
            <Alert key={err.errCode} severity="error">
              {err.errMessage}
            </Alert>
          ))}

        {/* Message de succès en cas d'inscription réussie */}
        {isRegistered && (
          <Alert severity="success">
            Inscription réussie, vous pouvez vous connecter !
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            required
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => handleChange('email')(e.target.value)}
          />
          <TextField
            required
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => handleChange('username')(e.target.value)}
          />
          <TextField
            required
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            // type="password"
            value={password}
            onChange={(e) => handleChange('password')(e.target.value)}
          />
          <PasswordValidator password={password} />
          <TextField
            required
            id="confirm-password"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            // type="password"
            value={confirmPassword}
            onChange={(e) => handleChange('confirmPassword')(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'Loading...' : 'Sign Up'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default SignUp;
