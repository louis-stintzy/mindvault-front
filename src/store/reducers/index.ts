import signupReducer from './signup';
import signinReducer from './signin';
import themeReducer from './theme';
import boxOneReducer from './boxOne';
import boxMultipleReducer from './boxMultiple';

const reducer = {
  signUp: signupReducer,
  signIn: signinReducer,
  theme: themeReducer,
  boxOne: boxOneReducer,
  boxMultiple: boxMultipleReducer,
};

export default reducer;
