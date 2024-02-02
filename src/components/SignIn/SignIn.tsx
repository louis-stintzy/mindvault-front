import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { FormEvent, useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { changeCredentialsField, login } from '../../store/reducers/signin';

function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isLoggedIn } = useAppSelector(
    (state) => state.signIn
  );
  const { email, password } = useAppSelector(
    (state) => state.signIn.credentials
  );

  const [showPassword, setShowPassword] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);
  const validateEmail = (emailToTest: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToTest);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const isEmailValid = validateEmail(email);
    setIsFormValid(isEmailValid && password.length > 0);
  }, [email, password]);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleChange = (field: 'email' | 'password') => (value: string) => {
    dispatch(changeCredentialsField({ field, value }));
  };
  return (
    <Container component="main" maxWidth="xs" className="signin-container">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        {error &&
          error.map((err) => (
            <Alert key={err.errCode} severity="error">
              {err.errMessage}
            </Alert>
          ))}

        <form onSubmit={handleSubmit}>
          <TextField
            required
            id="email"
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => handleChange('email')(e.target.value)}
          />
          <TextField
            required
            id="password"
            label="Password"
            data-testid="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    data-testid="toggle-password-visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => handleChange('password')(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading || !isFormValid}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default SignIn;
