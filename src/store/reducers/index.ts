import signupReducer from './signup';
import signinReducer from './signin';
import themeReducer from './theme';
import boxOneReducer from './boxOne';

const reducer = {
  signUp: signupReducer,
  signIn: signinReducer,
  theme: themeReducer,
  boxOne: boxOneReducer,
};

export default reducer;
