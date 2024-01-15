import { useEffect, useState } from 'react';

type PasswordValidatorProps = {
  password: string;
};

function PasswordValidator({ password }: PasswordValidatorProps) {
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    minLowercase: false,
    minUppercase: false,
    minNumbers: false,
    minSymbols: false,
  });

  const passwordTest = (passwordToTest: string) => {
    const minLength = passwordToTest.length >= 8;
    const minLowercase = /[a-z]/.test(passwordToTest);
    const minUppercase = /[A-Z]/.test(passwordToTest);
    const minNumbers = /[0-9]/.test(passwordToTest);
    const minSymbols = /[^a-zA-Z0-9]/.test(passwordToTest);
    setPasswordCriteria({
      minLength,
      minLowercase,
      minUppercase,
      minNumbers,
      minSymbols,
    });
  };

  useEffect(() => {
    passwordTest(password);
  }, [password]);

  return (
    <div>
      <ul>
        <li>
          Minimum 8 caractères : {passwordCriteria.minLength ? 'OK' : 'KO'}
        </li>
        <li>
          Minimum 1 minuscule : {passwordCriteria.minLowercase ? 'OK' : 'KO'}
        </li>
        <li>
          Minimum 1 majuscule : {passwordCriteria.minUppercase ? 'OK' : 'KO'}
        </li>
        <li>Minimum 1 chiffre : {passwordCriteria.minNumbers ? 'OK' : 'KO'}</li>
        <li>Minimum 1 symbole : {passwordCriteria.minSymbols ? 'OK' : 'KO'}</li>
      </ul>
    </div>
  );
}

export default PasswordValidator;
