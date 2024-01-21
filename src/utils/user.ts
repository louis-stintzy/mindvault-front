import { LoggedInUserData } from '../@types/user';

export const getUserDataFromLocalStorage = () => {
  const userDataStr = localStorage.getItem('user');
  const userData = userDataStr
    ? (JSON.parse(userDataStr) as LoggedInUserData)
    : null;
  return userData;
};

export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem('user');
};
