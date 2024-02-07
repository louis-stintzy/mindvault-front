import signupReducer from './signup';
import signinReducer from './signin';
import themeReducer from './theme';

const reducer = {
  signUp: signupReducer,
  signIn: signinReducer,
  theme: themeReducer,
};

export default reducer;
