import { useEffect, useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from '../../hook/redux';
import { updatePasswordValidity } from '../../store/reducers/signup';
// import './PasswordValidator.scss';

// Les critères de validation du mot de passe sont définis
// dans le fichier signInSignUpFormValidator.js du backend

type PasswordValidatorProps = {
  username: string;
  password: string;
  confirmPassword: string;
};

function PasswordValidator({
  username,
  password,
  confirmPassword,
}: PasswordValidatorProps) {
  const theme = useTheme();
  const succesColor = theme.palette.success.main;
  const errorColor = theme.palette.error.main;
  const dispatch = useAppDispatch();
  // Tous les critères sont initialisés à false
  const [passwordCriteria, setPasswordCriteria] = useState({
    passwordDoesnotIncludeUsername: false,
    minLength: false,
    minLowercase: false,
    minUppercase: false,
    minNumbers: false,
    minSymbols: false,
    passwordsMatch: false,
  });

  useEffect(() => {
    const passwordTest = (
      usernameToTest: string,
      passwordToTest: string,
      confirmPasswordToTest: string
    ) => {
      const passwordDoesnotIncludeUsername =
        !passwordToTest.includes(usernameToTest);
      const minLength = passwordToTest.length >= 8;
      const minLowercase = /[a-z]/.test(passwordToTest);
      const minUppercase = /[A-Z]/.test(passwordToTest);
      const minNumbers = /[0-9]/.test(passwordToTest);
      const minSymbols = /[^a-zA-Z0-9]/.test(passwordToTest);
      const passwordsMatch = passwordToTest === confirmPasswordToTest;
      // Les critères sont stockés dans un objet
      const newCriteria = {
        passwordDoesnotIncludeUsername,
        minLength,
        minLowercase,
        minUppercase,
        minNumbers,
        minSymbols,
        passwordsMatch,
      };
      setPasswordCriteria(newCriteria);
      // Si tous les critères sont remplis, le mot de passe est valide
      // on utilise newCriteria car passwordCriteria n'est pas encore à jour
      const allCriteriaMet = Object.values(newCriteria).every(Boolean);
      dispatch(updatePasswordValidity(allCriteriaMet));
    };
    // Les critères sont testés à chaque changement de valeur
    passwordTest(username, password, confirmPassword);
  }, [username, password, confirmPassword, dispatch]);

  const renderCriteriaIcon = (isValid: boolean) => {
    return isValid ? (
      <ListItemIcon>
        <CheckCircleIcon sx={{ color: succesColor }} />
      </ListItemIcon>
    ) : (
      <ListItemIcon>
        <ErrorIcon sx={{ color: errorColor }} />
      </ListItemIcon>
    );
  };

  return (
    <List dense>
      <ListItem>
        {renderCriteriaIcon(passwordCriteria.passwordDoesnotIncludeUsername)}
        <ListItemText primary="Username not included in password" />
      </ListItem>
      <ListItem>
        {renderCriteriaIcon(passwordCriteria.minLength)}
        <ListItemText primary="At least 8 characters" />
      </ListItem>
      <ListItem>
        {renderCriteriaIcon(passwordCriteria.minLowercase)}
        <ListItemText primary="At least 1 lowercase" />
      </ListItem>
      <ListItem>
        {renderCriteriaIcon(passwordCriteria.minUppercase)}
        <ListItemText primary="At least 1 uppercase" />
      </ListItem>
      <ListItem>
        {renderCriteriaIcon(passwordCriteria.minNumbers)}
        <ListItemText primary="At least 1 number" />
      </ListItem>
      <ListItem>
        {renderCriteriaIcon(passwordCriteria.minSymbols)}
        <ListItemText primary="At least 1 symbol" />
      </ListItem>
      <ListItem>
        {renderCriteriaIcon(passwordCriteria.passwordsMatch)}
        <ListItemText primary="Passwords match" />
      </ListItem>
    </List>
  );
}

export default PasswordValidator;
