import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './SignUp';
import store from '../../store';
import signupReducer, {
  changeCredentialsField,
  initialState,
} from '../../store/reducers/signup';

describe('SignUp Component', () => {
  // Réinitialise le state avant chaque test et rend le composant SignUp
  beforeEach(() => {
    store.dispatch({ type: 'signup/RESET_SIGNUP_STATE' });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );
  });

  // ---------- Test de la présence des éléments du formulaire
  test('renders the sign up form', async () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password')).toBeInTheDocument();

    const togglePasswordVisibilityButton = screen.getByTestId(
      'toggle-password-visibility'
    );
    expect(togglePasswordVisibilityButton).toBeInTheDocument();

    const signUpButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toBeDisabled();
  });

  // ---------- Test de l'action "signup/CHANGE_CREDENTIALS_FIELD" pour le champ email
  test('EMAIL : changeCredentialsField action works correctly', () => {
    const expectedAction = {
      type: 'signup/CHANGE_CREDENTIALS_FIELD',
      payload: { field: 'email', value: 'test@example.com' },
    };
    expect(
      changeCredentialsField({ field: 'email', value: 'test@example.com' })
    ).toEqual(expectedAction);
  });

  // ---------- Test de l'action "signup/CHANGE_CREDENTIALS_FIELD" pour le champ password
  test('PW : changeCredentialsField action works correctly', () => {
    const expectedAction = {
      type: 'signup/CHANGE_CREDENTIALS_FIELD',
      payload: { field: 'password', value: 'NEWPassword123!' },
    };
    expect(
      changeCredentialsField({ field: 'password', value: 'NEWPassword123!' })
    ).toEqual(expectedAction);
  });

  // ---------- Test du "signupReducer" : mise à jour de l'état pour le champ email
  test('EMAIL : signup reducer updates state correctly for changeCredentialsField', () => {
    const action = {
      type: 'signup/CHANGE_CREDENTIALS_FIELD',
      payload: { field: 'email', value: 'test@example.com' },
    };
    const updatedState = signupReducer(initialState, action);
    expect(updatedState.credentials.email).toBe('test@example.com');
  });

  // ---------- Test du "signupReducer" : mise à jour de l'état pour le champ password
  test('PW : signup reducer updates state correctly for changeCredentialsField', () => {
    const action = {
      type: 'signup/CHANGE_CREDENTIALS_FIELD',
      payload: { field: 'password', value: 'REDUCERpassword' },
    };
    const updatedState = signupReducer(initialState, action);
    expect(updatedState.credentials.password).toBe('REDUCERpassword');
  });

  // ---------- Test pour simuler le remplissage et la soumission du formulaire
  test('allows the user to fill in and submit the form', async () => {
    const togglePasswordVisibilityButton = screen.getByTestId(
      'toggle-password-visibility'
    );
    expect(togglePasswordVisibilityButton).toBeInTheDocument();
    fireEvent.click(togglePasswordVisibilityButton);

    // Simuler le remplissage du formulaire
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Password$/i }),
      'Password123!'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Confirm Password$/i }),
      'Password123!'
    );

    // Vérifier que les valeurs sont bien dans le state
    expect(store.getState().signUp.credentials.email).toBe('test@example.com');
    expect(store.getState().signUp.credentials.username).toBe('testuser');
    expect(store.getState().signUp.credentials.password).toBe('Password123!');
    expect(store.getState().signUp.credentials.confirmPassword).toBe(
      'Password123!'
    );

    // Vérifier que les valeurs sont bien dans le formulaire
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
      expect(screen.getByLabelText(/username/i)).toHaveValue('testuser');
      expect(screen.getByRole('textbox', { name: /^Password$/i })).toHaveValue(
        'Password123!'
      );
      expect(
        screen.getByRole('textbox', { name: /^Confirm Password$/i })
      ).toHaveValue('Password123!');
    });

    // Vérifier que le bouton "SIGN UP" n'est plus désactivé (clickable car critères remplis)
    const signUpButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    expect(signUpButton).not.toBeDisabled();
    userEvent.click(signUpButton);
  });

  // ---------- Test pour pour vérifier les critères de validation :
  // - Le formulaire ne peut être soumis si les critères d'email ne sont pas respectés
  test('EMAIL criteria not met - does not allow the user to submit the form', async () => {
    const signUpButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    const togglePasswordVisibilityButton = screen.getByTestId(
      'toggle-password-visibility'
    );
    expect(togglePasswordVisibilityButton).toBeInTheDocument();
    fireEvent.click(togglePasswordVisibilityButton);

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example');
    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    // await userEvent.type(screen.getByTestId('password'), 'Password123!');
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Password$/i }),
      'Password123!'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Confirm Password$/i }),
      'Password123!'
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveValue('test@example');
      expect(screen.getByLabelText(/username/i)).toHaveValue('testuser');
      expect(screen.getByRole('textbox', { name: /^Password$/i })).toHaveValue(
        'Password123!'
      );
      expect(
        screen.getByRole('textbox', { name: /^Confirm Password$/i })
      ).toHaveValue('Password123!');
    });
    expect(signUpButton).toBeDisabled();
  });

  // - Le formulaire ne peut être soumis si les critères de username ne sont pas respectés
  test('USERNAME criteria not met - does not allow the user to submit the form', async () => {
    const signUpButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    const togglePasswordVisibilityButton = screen.getByTestId(
      'toggle-password-visibility'
    );
    expect(togglePasswordVisibilityButton).toBeInTheDocument();
    fireEvent.click(togglePasswordVisibilityButton);

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/username/i), 'te');
    // await userEvent.type(screen.getByTestId('password'), 'Password123!');
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Password$/i }),
      'Password123!'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Confirm Password$/i }),
      'Password123!'
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
      expect(screen.getByLabelText(/username/i)).toHaveValue('te');
      expect(screen.getByRole('textbox', { name: /^Password$/i })).toHaveValue(
        'Password123!'
      );
      expect(
        screen.getByRole('textbox', { name: /^Confirm Password$/i })
      ).toHaveValue('Password123!');
    });
    expect(signUpButton).toBeDisabled();
  });

  // - Le formulaire ne peut être soumis si les critères de mot de passe ne sont pas respectés
  test('PW - criteria not met - does not allow the user to submit the form', async () => {
    const signUpButton = screen.getByRole('button', {
      name: /sign up/i,
    });
    const togglePasswordVisibilityButton = screen.getByTestId(
      'toggle-password-visibility'
    );
    expect(togglePasswordVisibilityButton).toBeInTheDocument();
    fireEvent.click(togglePasswordVisibilityButton);

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    // < 8 caractères et pas de majuscule, ni chiffres, ni caractères spéciaux
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Password$/i }),
      'passwor'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Confirm Password$/i }),
      'passwor'
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
      expect(screen.getByLabelText(/username/i)).toHaveValue('testuser');
      expect(screen.getByRole('textbox', { name: /^Password$/i })).toHaveValue(
        'passwor'
      );
      expect(
        screen.getByRole('textbox', { name: /^Confirm Password$/i })
      ).toHaveValue('passwor');
    });
    expect(signUpButton).toBeDisabled();

    // Pas de caractères spéciaux
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Password$/i }),
      'D123'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Confirm Password$/i }),
      'D123'
    );
    expect(signUpButton).toBeDisabled();

    // Critères remplis
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Password$/i }),
      '!'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Confirm Password$/i }),
      '!'
    );
    expect(signUpButton).not.toBeDisabled();

    // Mots de passe différents
    await userEvent.type(
      screen.getByRole('textbox', { name: /^Password$/i }),
      'zzz'
    );
    expect(signUpButton).toBeDisabled();
  });
});
