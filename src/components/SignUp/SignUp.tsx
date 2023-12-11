import { Box, Button, TextField } from '@mui/material';
import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { changeCredentialsField, register } from '../../store/reducers/signup';

function SignUp() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.signUp);
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
    <div>
      {/* <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Username"
            value={username}
            onChange={(e) =>
              dispatch(changeCredentialsField({ username: e.target.value }))
            }
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            value={email}
            onChange={(e) =>
              dispatch(changeCredentialsField({ email: e.target.value }))
            }
          />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(e) =>
              dispatch(changeCredentialsField({ password: e.target.value }))
            }
          />
          <TextField
            required
            id="outlined-password-input"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              dispatch(
                changeCredentialsField({ confirmPassword: e.target.value })
              )
            }
          />
        </div>
        <Button
          variant="contained"
          onClick={() => dispatch(register())}
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
        {error && <div>{error}</div>}
      </Box> */}
    </div>
  );
}

export default SignUp;
