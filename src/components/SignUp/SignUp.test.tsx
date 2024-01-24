import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import SignUp from './SignUp';
import store from '../../store';

describe('SignUp Component', () => {
  test('renders the sign up form', () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i })
    ).toBeInTheDocument();
  });

  test('allows the user to fill in and submit the form', () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );

    userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/password/i), 'Password123!');
    userEvent.type(screen.getByLabelText(/confirm password/i), 'Password123!');
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // Ici, vous pouvez ajouter des assertions pour vérifier que les actions Redux ont été dispatchées.
    // Ceci est un exemple et peut nécessiter des mocks ou des ajustements supplémentaires.
    // expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
