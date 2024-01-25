import { render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import PasswordValidator from './PasswordValidator';

import store from '../../store';

describe('PasswordValidator Component', () => {
  test('validates password criteria correctly', () => {
    const username = 'testuser';
    const password = 'Password123!';
    const confirmPassword = 'Password123!';

    render(
      <Provider store={store}>
        <PasswordValidator
          username={username}
          password={password}
          confirmPassword={confirmPassword}
        />
      </Provider>
    );
    // Vérifiez que tous les critères sont validés
    expect(
      screen.getByText('Username not included in password')
    ).toBeInTheDocument();
    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('At least 1 lowercase')).toBeInTheDocument();
    expect(screen.getByText('At least 1 uppercase')).toBeInTheDocument();
    expect(screen.getByText('At least 1 number')).toBeInTheDocument();
    expect(screen.getByText('At least 1 symbol')).toBeInTheDocument();
    expect(screen.getByText('Passwords match')).toBeInTheDocument();

    // Vérifiez les icônes de succès
    const successIcons = screen.getAllByTestId('check-circle-icon');
    expect(successIcons.length).toBe(7); // Assurez-vous qu'il y a 7 icônes de succès
  });
});
