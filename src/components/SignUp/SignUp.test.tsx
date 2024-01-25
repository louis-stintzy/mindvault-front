import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SignUp from './SignUp';
// import signup from '../../store/reducers/signup';
// import signupReducer, {
//   changeCredentialsField,
//   initialState,
// } from '../../store/reducers/signup';

import store from '../../store';
import signupReducer, {
  changeCredentialsField,
  initialState,
} from '../../store/reducers/signup';

// const mockStore = configureMockStore();
// let store;

describe('SignUp Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
  });

  test('renders the sign up form', async () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password')).toBeInTheDocument();
    const signUpButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toBeDisabled();
  });

  test('EMAIL : changeCredentialsField action works correctly', () => {
    const expectedAction = {
      type: 'signup/CHANGE_CREDENTIALS_FIELD',
      payload: { field: 'email', value: 'test@example.com' },
    };
    expect(
      changeCredentialsField({ field: 'email', value: 'test@example.com' })
    ).toEqual(expectedAction);
  });

  test('PW : changeCredentialsField action works correctly', () => {
    const expectedAction = {
      type: 'signup/CHANGE_CREDENTIALS_FIELD',
      payload: { field: 'password', value: 'NEWPassword123!' },
    };
    expect(
      changeCredentialsField({ field: 'password', value: 'NEWPassword123!' })
    ).toEqual(expectedAction);
  });

  test('EMAIL : signup reducer updates state correctly for changeCredentialsField', () => {
    const action = {
      type: 'signup/CHANGE_CREDENTIALS_FIELD',
      payload: { field: 'email', value: 'test@example.com' },
    };
    const updatedState = signupReducer(initialState, action);
    expect(updatedState.credentials.email).toBe('test@example.com');
  });

  test('PW : signup reducer updates state correctly for changeCredentialsField', () => {
    const action = {
      type: 'signup/CHANGE_CREDENTIALS_FIELD',
      payload: { field: 'password', value: 'REDUCERpassword' },
    };
    const updatedState = signupReducer(initialState, action);
    expect(updatedState.credentials.password).toBe('REDUCERpassword');
  });

  test('allows the user to fill in and submit the form', async () => {
    const togglePasswordVisibilityButton = screen.getByTestId(
      'toggle-password-visibility'
    );
    expect(togglePasswordVisibilityButton).toBeInTheDocument();
    fireEvent.click(togglePasswordVisibilityButton);

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(screen.getByTestId('password'), 'Password123!');
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Password$/i }),
      'Password123!'
    );
    await waitFor(() => {});
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Confirm Password$/i }),
      'Password123!'
    );

    expect(store.getState().signUp.credentials.email).toBe('test@example.com');
    expect(store.getState().signUp.credentials.password).toBe('Password123!');

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
      expect(screen.getByLabelText(/username/i)).toHaveValue('testuser');
      expect(screen.getByRole('textbox', { name: /^Password$/i })).toHaveValue(
        'Password123!'
      );
      // expect(screen.getByTestId('confirm-password')).toHaveValue(
      //   'Password123!'
      // );
    });

    const signUpButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    expect(signUpButton).not.toBeDisabled();
    userEvent.click(signUpButton);
  });
});

// // Test du reducer pour une action simple
// describe('signupReducer', () => {
//   test('should handle initial state', () => {
//     expect(signupReducer(undefined, { type: 'unknown' })).toEqual(initialState);
//   });

//   test('should handle changeCredentialsField', () => {
//     const actual = signupReducer(
//       initialState,
//       changeCredentialsField({ field: 'email', value: 'user@example.com' })
//     );
//     expect(actual.credentials.email).toEqual('user@example.com');
//   });

//   // Ajoutez d'autres tests pour les différentes actions...
// });

// await waitFor(() => {
//   expect(screen.getByTestId('password')).toHaveValue('Password123!');
// });
// expect(screen.getByTestId('confirm-password')).toHaveValue('Password123!');
// await waitFor(() => {
//   expect(
//     screen.getByRole('button', { name: /sign up/i })
//   ).not.toBeDisabled();
// });

// test('should fill password field correctly', async () => {

// const togglePasswordVisibilityButton = await screen.findByTestId(
//   'toggle-password-visibility'
// );
// expect(togglePasswordVisibilityButton).toBeInTheDocument();
// fireEvent.click(togglePasswordVisibilityButton);

// const passwordInput = (await screen.findByTestId(
//   'password'
// )) as HTMLInputElement;
// await userEvent.type(passwordInput, 'NEWPassword123!');

// const showPasswordTestDiv2 = await screen.findByTestId('showPasswordTest');
// expect(showPasswordTestDiv2).toBeInTheDocument();
// expect(showPasswordTestDiv2).toHaveTextContent('NEWPassword123!');

// const showPasswordTestDiv = await screen.findByTestId('showPasswordTest');
// expect(showPasswordTestDiv).toBeInTheDocument();
// expect(showPasswordTestDiv).toHaveTextContent('NEWPassword123!');
// console.log(screen.debug());
// await userEvent.type(screen.getByTestId('password'), 'Password123!');
// expect(screen.getByTestId('password')).toBeInTheDocument();
// expect(passwordInput.value).toBe('NEWPassword123!');
// expect(screen.getByTestId('password')).toHaveValue('Password123!');
// });

// describe('SignUp Component2', () => {
//   beforeEach(() => {
//     store = mockStore({
//       signUp: {
//         // Votre état initial mocké
//         isLoading: false,
//         error: null,
//         isRegistered: false,
//         credentials: {
//           username: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//         },
//         isPasswordValid: false,
//       },
//     });

//     render(
//       <Provider store={store}>
//         <SignUp />
//       </Provider>
//     );
//   });

//   test("Dispatch de l'action changeCredentialsField", async () => {
//     await userEvent.type(screen.getByTestId('password'), 'Password123!');

//     // Vérifiez ici que l'action changeCredentialsField a été dispatchée
//     const actions = store.getActions();
//     expect(actions).toContainEqual({
//       type: 'signup/CHANGE_CREDENTIALS_FIELD',
//       payload: { field: 'password', value: 'Password123!' },
//     });
//   });

//   test("Mise à jour de l'état du store et re-rendering", async () => {
//     await userEvent.type(screen.getByTestId('password'), 'Password123!');

//     // Vérifier que l'état du store a été mis à jour
//     expect(store.getState().signUp.credentials.password).toBe('Password123!');

//     // Si vous avez des éléments UI qui dépendent de l'état, vérifiez leur mise à jour ici
//   });
// });

// const actions = store.getActions();
// expect(actions).toContainEqual({
//   type: 'signup/CHANGE_CREDENTIALS_FIELD',
//   payload: { field: 'password', value: 'Password123!' },
// });
